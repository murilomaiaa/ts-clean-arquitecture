import { makeApp } from './main/config/app.module'

async function bootstrap(): Promise<void> {
  const app = await makeApp()
  await app.listen(3000)
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap()
