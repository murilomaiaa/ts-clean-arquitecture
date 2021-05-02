import { InvalidParamError, MissingParamError, ServerError } from '../../errors'
import { HttpRequest } from '../../protocols'
import { SignUpController } from './signup'
import { AddAccount, EmailValidator, AccountModel, AddAccountModel } from './signupProtocols'
import { badRequest, created, serverError } from '../../helpers/httpHelper'

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async execute(_: AddAccountModel): Promise<AccountModel> {
      return makeFakeAccount()
    }
  }
  return new AddAccountStub()
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    email: 'anyemail@example.com',
    name: 'Any Name',
    password: 'password',
    passwordConfirmation: 'password'
  }
})

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  email: 'anyemail@example.com',
  name: 'Any Name',
  password: 'password'
})

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
  addAccountStub: AddAccount
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const addAccount = makeAddAccount()
  const sut = new SignUpController(emailValidatorStub, addAccount)

  return {
    sut,
    emailValidatorStub,
    addAccountStub: addAccount
  }
}

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'anyemail@example.com',
        password: 'password',
        passwordConfirmation: 'password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })

  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'Any Name ',
        password: 'password',
        passwordConfirmation: 'password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'anyemail@example.com',
        name: 'Any Name ',
        passwordConfirmation: 'password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })

  test('Should return 400 if no confirmationPassword is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'anyemail@example.com',
        name: 'Any Name ',
        password: 'password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('passwordConfirmation')))
  })

  it('Should return 400 if confirmationPassword is not equal password', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'anyemail@example.com',
        name: 'Any Name ',
        password: 'password',
        passwordConfirmation: 'invalidConfirmation'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('passwordConfirmation')))
  })

  test('Should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
  })

  it('Should call EmailValidator with the  provided email', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValid = jest.spyOn(emailValidatorStub, 'isValid')
    await sut.handle(makeFakeRequest())
    expect(isValid).toHaveBeenCalledWith('anyemail@example.com')
  })

  it('Should return 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })

  it('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'execute').mockImplementationOnce(async () => { throw new Error() })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })

  it('Should call AddAccount with the correct values', async () => {
    const { sut, addAccountStub } = makeSut()
    const addAccount = jest.spyOn(addAccountStub, 'execute')
    await sut.handle(makeFakeRequest())
    expect(addAccount).toHaveBeenCalledWith({
      email: 'anyemail@example.com',
      name: 'Any Name',
      password: 'password'
    })
  })

  it('Should return 201 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(created(makeFakeAccount()))
  })
})
