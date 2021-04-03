import { AccountModel, AddAccount, AddAccountModel, Encrypter, AddAccountRepository } from './DbAddAccountProtocols'

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly addAccount: AddAccountRepository
  ) { }

  async execute(account: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(account.password)
    await this.addAccount.add({
      ...account,
      password: hashedPassword
    })
    return null
  }
}
