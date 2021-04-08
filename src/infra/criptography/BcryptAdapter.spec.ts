import bcrypt from 'bcrypt'
import { BcryptAdapter } from './BcryptAdapter'

jest.mock('bcrypt', () => ({
  hash: async () => 'hash'
}))

const salt = 12
const makeSut = (): BcryptAdapter => new BcryptAdapter(salt)

describe('Bcrypt Adapter', () => {
  it('should call bcrypt with correct values', async () => {
    const sut = makeSut()

    const hashSpy = jest.spyOn(bcrypt, 'hash')

    await sut.encrypt('any value')
    expect(hashSpy).toHaveBeenCalledWith('any value', salt)
  })

  it('should return a hash on success', async () => {
    const sut = makeSut()

    const hash = await sut.encrypt('any value')
    expect(hash).toBe('hash')
  })

  it('should throw if bcrypt throws', async () => {
    const sut = makeSut()

    jest.spyOn(bcrypt, 'hash')
      .mockImplementationOnce(async () => { throw new Error('hash error') })

    const promise = sut.encrypt('any value')
    await expect(promise).rejects.toEqual(new Error('hash error'))
  })
})
