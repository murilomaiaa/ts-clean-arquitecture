import validattor from 'validator'

import { EmailValidatorAdapter } from './EmailValidatorAdapter'

jest.mock('validator', () => ({
  isEmail(): boolean {
    return true
  }
}))

describe('EmailValidator Adapter', () => {
  it('Should return false if email validator return false', () => {
    const sut = new EmailValidatorAdapter()
    jest.spyOn(validattor, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalidEmail')
    expect(isValid).toBe(false)
  })

  it('Should return true if email validator return true', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('valid_email@example.com')
    expect(isValid).toBe(true)
  })
})
