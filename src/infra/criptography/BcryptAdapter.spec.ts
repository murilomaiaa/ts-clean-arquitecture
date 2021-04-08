import bcrypt from 'bcrypt'
import { BcryptAdapter } from './BcryptAdapter'

describe('Bcrypt Adapter', () => {
  it('should call bcrypt with correct values', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)

    const hashSpy = jest.spyOn(bcrypt, 'hash')

    await sut.encrypt('any value')
    expect(hashSpy).toHaveBeenCalledWith('any value', salt)
  })
})
