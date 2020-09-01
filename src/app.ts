import * as dotenv from 'dotenv'
import { AppConfig, Application } from './middlewares/middlewares'
import { MongoDBController, MongoDBConfig } from './controllers/mongodb'

const main = () => {
  dotenv.config()

  const tenant = process.env.TENANT

  const appConfig: AppConfig = {
    hostAddr: process.env.APP_HOST_ADDR || '0.0.0.0',
    hostPort: process.env.APP_HOST_PORT || '8000',
  }

  const legacyMongodb: MongoDBConfig = {
    host: process.env.LEGACY_MONGODB_HOST,
    database: process.env.LEGACY_MONGODB_DATABASE,
    collection: process.env.LEGACY_MONGODB_COLLECTION,
  }

  let app = new Application(appConfig)
  app.addHandler(new MongoDBController(legacyMongodb))
  app.start()
}
main()
