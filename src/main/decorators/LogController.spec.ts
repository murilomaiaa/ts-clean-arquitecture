import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './LogController'

describe('LogController', () => {
  it('Should call controller handle', async () => {
    class ControllerStub implements Controller {
      async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        return {
          statusCode: 200,
          body: {}
        }
      }
    }
    const controllerStub = new ControllerStub()
    const sut = new LogControllerDecorator(controllerStub)
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
