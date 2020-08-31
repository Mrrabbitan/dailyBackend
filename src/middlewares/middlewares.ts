import * as Koa from 'koa'
import * as cors from '@koa/cors'
import * as bodyParser from 'koa-body-parser'
import * as json from 'koa-json'
import * as Router from 'koa-router'

export interface AppConfig {
  hostAddr: string
  hostPort: string
}

export class Application {
  private address: string
  private appConfig: AppConfig
  private app: Koa

  constructor(appConfig: AppConfig) {
    this.appConfig = appConfig
    this.address = `${this.appConfig.hostAddr}:${this.appConfig.hostPort}`

    this.app = new Koa()
    this.app.use(cors())
    this.app.use(bodyParser())
    this.app.use(json())

    this.app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
      ctx.version = ctx.headers['version']
      await next()
    })

    this.app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
      ctx.collectType = ctx.headers['x-collect-type'] || ctx.headers['collect-type']
      await next()
    })
  }

  addHandler = (h: Controller) => {
    this.app.use(h.router().routes())
    this.app.use(h.router().allowedMethods())
  }

  start = () => {
    this.app.use(async (ctx) => {
      ctx.body = 'test success'
    })
    this.app.listen(this.appConfig.hostPort)
  }
}

export abstract class Controller {
  protected _router: Router

  router = (): Router => {
    return this._router
  }

  constructor() {
    this._router = new Router()
  }
}
