import { AccountModel, AddAccount, AddAccountModel, Encrypter } from './DbAddAccountProtocols'

export class DbAddAccount implements AddAccount {
  constructor(private readonly encrypter: Encrypter) { }

  async execute(account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password)
    return null
  }
}
