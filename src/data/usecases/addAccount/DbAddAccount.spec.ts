import { Encrypter } from '../../protocols/encrypter'
import { DbAddAccount } from './DbAddAccount'

const makeEncrypterStub = (): Encrypter => {
  class EncrypterStub {
    async encrypt(value: string): Promise<string> {
      return 'hashed_value'
    }
  }

  return new EncrypterStub()
}

interface SutTypes {
  sut: DbAddAccount
  encrypterStub: Encrypter
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypterStub()
  const sut = new DbAddAccount(encrypterStub)

  return {
    sut,
    encrypterStub
  }
}
describe('DbAddAccount usecase', () => {
  it('should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'validName',
      email: 'validEmail',
      password: 'validPassword'
    }
    await sut.execute(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('validPassword')
  })
})
