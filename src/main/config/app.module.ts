import { Module } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import setupMiddlewares from './middlewares'

@Module({})
export class AppModule {}

export const makeApp = async () => {
  const app = await NestFactory.create(AppModule)
  setupMiddlewares(app)
  return app
}
