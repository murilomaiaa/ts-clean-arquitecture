import validator from 'validator'

import { EmailValidatorAdapter } from './EmailValidatorAdapter'

jest.mock('validator', () => ({
  isEmail(): boolean {
    return true
  }
}))

describe('EmailValidator Adapter', () => {
  it('Should return false if email validator return false', () => {
    const sut = new EmailValidatorAdapter()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalidEmail')
    expect(isValid).toBe(false)
  })

  it('Should return true if email validator return true', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('valid_email@example.com')
    expect(isValid).toBe(true)
  })

  it('should call validator with the correct email', () => {
    const sut = new EmailValidatorAdapter()
    const isEmail = jest.spyOn(validator, 'isEmail')
    sut.isValid('email')
    expect(isEmail).toHaveBeenCalledWith('email')
  })
})
