import { promisify } from 'util'
import * as Koa from 'koa'
import * as grpc from 'grpc'
import { http2grpc } from '@zcong/istio-helpers'
import { UuidServiceClient } from './generated/pb_grpc_pb'
import { Request } from './generated/pb_pb'
import { tracingKeys } from './common'

const app = new Koa()

const UPSTREAM = process.env.UPSTREAM
const APP_NAME = process.env.APP_NAME
const PORT = process.env.PORT || 8080

const client = new UuidServiceClient(
  UPSTREAM,
  grpc.credentials.createInsecure()
)

const uuilp = promisify(client.uuid.bind(client))

app.use(async ctx => {
  const req = new Request()
  console.log('incoming tracing: ', ctx.request.headers)
  const metadata = http2grpc(ctx.request.headers, tracingKeys)
  console.log('outgoing tracing: ', metadata)
  try {
    const resp = await uuilp(req, metadata)
    ctx.body = {
      uuid: resp.getUuid(),
      tracing: `${resp.getTracing()} -> ${APP_NAME}`
    }
  } catch (err) {
    ctx.status = 500
    ctx.body = err
  }
})

app.listen(PORT)
