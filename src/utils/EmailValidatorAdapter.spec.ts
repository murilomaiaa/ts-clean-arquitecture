import validator from 'validator'

import { EmailValidatorAdapter } from './EmailValidatorAdapter'

jest.mock('validator', () => ({
  isEmail(): boolean {
    return true
  }
}))

const makeSut = (): EmailValidatorAdapter => new EmailValidatorAdapter()

describe('EmailValidator Adapter', () => {
  it('Should return false if email validator return false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalidEmail')
    expect(isValid).toBe(false)
  })

  it('Should return true if email validator return true', () => {
    const sut = makeSut()
    const isValid = sut.isValid('valid_email@example.com')
    expect(isValid).toBe(true)
  })

  it('should call validator with the correct email', () => {
    const sut = makeSut()
    const isEmail = jest.spyOn(validator, 'isEmail')
    sut.isValid('email')
    expect(isEmail).toHaveBeenCalledWith('email')
  })
})
