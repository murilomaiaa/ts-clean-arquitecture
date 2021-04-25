import { INestApplication } from '@nestjs/common'
import { contentType } from '../middlewares/contentType'
import { cors } from '../middlewares/cors'

export default (app: INestApplication) => {
  app.use(contentType)
  app.use(cors)
  return app
}
