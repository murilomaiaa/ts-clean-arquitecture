import { LogErrorRepository } from '../../data/protocols/LogErrorRepository'
import { serverError } from '../../presentation/helpers/httpHelper'
import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './LogController'

const makeController = () => {
  class ControllerStub implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      return {
        statusCode: 200,
        body: {}
      }
    }
  }
  return new ControllerStub()
}

const makeLogError = () => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async log(stack: string): Promise<void> {

    }
  }
  return new LogErrorRepositoryStub()
}

const makeSut = () => {
  const controllerStub = makeController()
  const logErrorRepositoryStub = makeLogError()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)

  return { sut, controllerStub, logErrorRepositoryStub }
}

describe('LogController', () => {
  it('Should call controller handle', async () => {
    const { controllerStub, sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any@mail.com',
        name: 'Name',
        password: '123456',
        passwordConfirmation: '123456'
      }
    }

    const handleSpy = jest.spyOn(controllerStub, 'handle')
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })

  it('Should return the same result of the controller', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any@mail.com',
        name: 'Name',
        password: '123456',
        passwordConfirmation: '123456'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: {}
    })
  })

  it('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()

    const fakeError = new Error()
    fakeError.stack = 'any_stack'
    const error = serverError(fakeError)
    jest.spyOn(controllerStub, 'handle')
      .mockResolvedValueOnce(error)

    const logSpy = jest.spyOn(logErrorRepositoryStub, 'log')

    const httpRequest = {
      body: {
        email: 'any@mail.com',
        name: 'Name',
        password: '123456',
        passwordConfirmation: '123456'
      }
    }

    await sut.handle(httpRequest)
    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
