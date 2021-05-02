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

const makeSut = () => {
  const controllerStub = makeController()
  const sut = new LogControllerDecorator(controllerStub)

  return { sut, controllerStub }
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
})
