import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { makeApp } from '../config/app.module'

describe('CORS Middleware', () => {
  let sut: INestApplication

  beforeAll(async() => {
    sut = await makeApp()
    await sut.init()
  })

  afterAll(async () => {
    await sut.close()
  })

  it('should enable CORS', async () => {
    return await request(sut.getHttpServer())
      .get('/inexistent-route')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-headers', '*')
      .expect('access-control-allow-methods', '*')
  })
})
