import { HttpRequest, HttpResponse, Controller, AddAccount, EmailValidator } from './signupProtocols'
import { MissingParamError, InvalidParamError } from '../../errors'
import { badRequest, created, serverError } from '../../helpers/httpHelper'

export class SignUpController implements Controller {
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount
  ) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { email, password, passwordConfirmation, name } = httpRequest.body

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isEmailValid = this.emailValidator.isValid(email)

      if (!isEmailValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const account = await this.addAccount.execute({
        email,
        name,
        password
      })

      return created(account)
    } catch (e) {
      return serverError(e)
    }
  }
}
