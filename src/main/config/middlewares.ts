import { INestApplication } from '@nestjs/common'
import { contentType } from '../middlewares/contentType'

export default (app: INestApplication) => {
  app.use(contentType)
  return app
}
