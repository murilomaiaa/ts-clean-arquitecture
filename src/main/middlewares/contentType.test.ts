import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { makeApp } from '../config/app.module'

describe('ContentType Middleware', () => {
  let sut: INestApplication

  beforeAll(async () => {
    sut = await makeApp()
    await sut.init()
  })

  afterAll(async() => {
    await sut.close()
  })

  it('should return a response in json', async () => {
    return await request(sut.getHttpServer())
      .get('/inexistent-route')
      .expect('content-type', /json/)
  })
})
