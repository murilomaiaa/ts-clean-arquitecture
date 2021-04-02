import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/MissingParamError'
import { badRequest } from '../helpers/httpHelper'
import { Controller } from '../protocols/controler'
import { EmailValidator } from '../protocols/email-validator'
import { InvalidParamError } from '../errors/InvalidParamError'

export class SignUpController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) { }

  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    const isEmailValid = this.emailValidator.isValid(httpRequest.body.email)
    if (!isEmailValid) {
      return badRequest(new InvalidParamError('email'))
    }
  }
}
