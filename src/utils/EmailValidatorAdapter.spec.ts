import { EmailValidatorAdapter } from './EmailValidatorAdapter'

describe('EmailValidator Adapter', () => {
  it('Should return false if email validator return false', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('invalidEmail')
    expect(isValid).toBe(false)
  })
})
