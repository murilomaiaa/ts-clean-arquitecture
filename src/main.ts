import { MongoHelper } from './infra/db/mongo-db/helpers/mongo-helper'
import { makeApp } from './main/config/app.module'
import env from './main/config/env'

async function bootstrap(): Promise<void> {
  const app = await makeApp()
  MongoHelper.connect(env.mongoUrl)
    .then(async () => await app.listen(env.port))
    .then(() => console.log(`server started at http://localhost:${env.port}`))
    .catch(console.log)
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap()
