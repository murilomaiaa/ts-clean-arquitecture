import { AccountModel } from '../models/Account'

export interface AddAccountModel {
  name: string
  password: string
  email: string
}

export interface AddAccount {
  execute: (account: AddAccountModel) => Promise<AccountModel>
}
