import { Controller } from '../middlewares/middlewares'
import * as mongodb from 'mongodb'

export interface MongoDBConfig {
  host: string
  database: string
  collection: string
}

const option = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  autoReconnect: true,
  poolSize: 10,
}

export class MongoDBController extends Controller {
  private legacyCol: mongodb.Collection

  constructor(legacyMongodb: MongoDBConfig) {
    super()
    mongodb.MongoClient.connect(legacyMongodb.host, option, (err, client) => {
      if (err != null) {
        console.log(err)
        return
      }
      this.legacyCol = client.db(legacyMongodb.database).collection(legacyMongodb.collection)
      console.log('[CONNECT] legacy mongodb')
    })
  }
}
