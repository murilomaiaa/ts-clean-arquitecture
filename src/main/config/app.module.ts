import { Module } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { SignUpRoute } from '../routes/signUp'
import setupMiddlewares from './middlewares'

@Module({
  controllers: [SignUpRoute]
})
export class AppModule {}

export const makeApp = async () => {
  const app = await NestFactory.create(AppModule)
  setupMiddlewares(app)
  return app
}
