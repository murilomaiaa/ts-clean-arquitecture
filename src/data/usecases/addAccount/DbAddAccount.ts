import { AccountModel, AddAccount, AddAccountModel, Encrypter, AddAccountRepository } from './DbAddAccountProtocols'

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly addAccount: AddAccountRepository
  ) { }

  async execute(accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    const account = await this.addAccount.add({
      ...accountData,
      password: hashedPassword
    })
    return account
  }
}
