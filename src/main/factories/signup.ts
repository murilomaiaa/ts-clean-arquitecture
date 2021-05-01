import { DbAddAccount } from '../../data/usecases/addAccount/DbAddAccount'
import { BcryptAdapter } from '../../infra/criptography/BcryptAdapter'
import { AccountMongoRepository } from '../../infra/db/mongo-db/account-repository.ts/account'
import { SignUpController } from '../../presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from '../../utils/EmailValidatorAdapter'

export const makeSignUpController = (): SignUpController => {
  const emailValidator = new EmailValidatorAdapter()
  const encrypter = new BcryptAdapter(12)
  const addAccountRepository = new AccountMongoRepository()
  const addAccount = new DbAddAccount(encrypter, addAccountRepository)
  return new SignUpController(emailValidator, addAccount)
}
