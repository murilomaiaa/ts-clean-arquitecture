import { AddAccountModel } from '../../domain/usecases/AddAccount'
import { AccountModel } from '../../domain/models/Account'

export interface AddAccountRepository {
  add: (data: AddAccountModel) => Promise<AccountModel>
}
