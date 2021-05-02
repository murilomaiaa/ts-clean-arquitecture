import { LogErrorRepository } from '../../data/protocols/LogErrorRepository'
import { AccountModel } from '../../domain/models/Account'
import { created, serverError } from '../../presentation/helpers/httpHelper'
import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './LogController'

const makeController = () => {
  class ControllerStub implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      return created(makeFakeAccount())
    }
  }
  return new ControllerStub()
}

const makeLogError = () => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async logError(stack: string): Promise<void> { }
  }
  return new LogErrorRepositoryStub()
}

const makeServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  email: 'anyemail@example.com',
  name: 'Any Name',
  password: 'password'
})

const makeFakeRequest = (): HttpRequest => ({
  body: {
    email: 'anyemail@example.com',
    name: 'Any Name',
    password: 'password',
    passwordConfirmation: 'password'
  }
})

const makeSut = () => {
  const controllerStub = makeController()
  const logErrorRepositoryStub = makeLogError()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)

  return { sut, controllerStub, logErrorRepositoryStub }
}

describe('LogController', () => {
  it('Should call controller handle', async () => {
    const { controllerStub, sut } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    await sut.handle(makeFakeRequest())
    expect(handleSpy).toHaveBeenCalledWith(makeFakeRequest())
  })

  it('Should return the same result of the controller', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(created(makeFakeAccount()))
  })

  it('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()

    jest.spyOn(controllerStub, 'handle')
      .mockResolvedValueOnce(makeServerError())

    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError')

    await sut.handle(makeFakeRequest())
    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
