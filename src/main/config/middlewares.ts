import { INestApplication } from '@nestjs/common'
import { contentType, cors } from '../middlewares'

export default (app: INestApplication) => {
  app.use(contentType)
  app.use(cors)
  return app
}
