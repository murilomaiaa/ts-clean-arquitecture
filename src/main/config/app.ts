import { Module } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

@Module({})
export class AppModule {}

export const makeApp = async () => await NestFactory.create(AppModule)
