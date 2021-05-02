import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongo-db/helpers/mongo-helper'
import { makeApp } from '../config/app.module'

describe('SignUp routes', () => {
  let sut: INestApplication

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    sut = await makeApp()
    await sut.init()
  })

  afterAll(async () => {
    await sut.close()
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  it('should return an account on success', async () => {
    return await request(sut.getHttpServer())
      .post('/signup')
      .send({
        name: 'Murilo Maia',
        email: 'murilomaia.bb@gmail.com',
        password: '123456',
        passwordConfirmation: '123456'
      })
      .expect(201)
  })
})
