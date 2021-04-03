import { AccountModel } from '../../../domain/models/Account'
import { AddAccount, AddAccountModel } from '../../../domain/usecases/AddAccount'
import { Encrypter } from '../../protocols/encrypter'

export class DbAddAccount implements AddAccount {
  constructor(private readonly encrypter: Encrypter) { }

  async execute(account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password)
    return null
  }
}
