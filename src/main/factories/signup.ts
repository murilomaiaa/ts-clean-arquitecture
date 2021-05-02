import { DbAddAccount } from '../../data/usecases/addAccount/DbAddAccount'
import { BcryptAdapter } from '../../infra/criptography/BcryptAdapter'
import { AccountMongoRepository } from '../../infra/db/mongo-db/account-repository/account'
import { SignUpController } from '../../presentation/controllers/signup/signup'
import { Controller } from '../../presentation/protocols'
import { EmailValidatorAdapter } from '../../utils/EmailValidatorAdapter'
import { LogControllerDecorator } from '../decorators/LogController'

export const makeSignUpController = (): Controller => {
  const emailValidator = new EmailValidatorAdapter()
  const encrypter = new BcryptAdapter(12)
  const addAccountRepository = new AccountMongoRepository()
  const addAccount = new DbAddAccount(encrypter, addAccountRepository)
  const signUpController = new SignUpController(emailValidator, addAccount)
  return new LogControllerDecorator(signUpController)
}
