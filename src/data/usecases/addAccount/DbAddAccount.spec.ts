import { Encrypter } from './DbAddAccountProtocols'
import { DbAddAccount } from './DbAddAccount'

const makeEncrypterStub = (): Encrypter => {
  class EncrypterStub implements Encrypter {
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
  it('should throw if Encrypter throws', async () => {
    const { encrypterStub, sut } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(async () => {
      throw new Error()
    })
    const accountData = {
      name: 'validName',
      email: 'validEmail',
      password: 'validPassword'
    }
    const promise = sut.execute(accountData)
    await expect(promise).rejects.toThrow()
  })
})
