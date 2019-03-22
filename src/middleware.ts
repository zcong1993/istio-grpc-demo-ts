import * as grpc from 'grpc'
import { grpc2grpc } from '@zcong/istio-helpers'
import { Request, Response } from './generated/pb_pb'
import {
  IUuidServiceServer,
  UuidServiceService,
  IUuidServiceClient,
  UuidServiceClient
} from './generated/pb_grpc_pb'

class UuidService implements IUuidServiceServer {
  private client: IUuidServiceClient
  private appName: string
  constructor(
    client: IUuidServiceClient,
    appName: string = 'grpc-server-node'
  ) {
    this.client = client
    this.appName = appName
  }
  uuid(
    call: grpc.ServerUnaryCall<Request>,
    callback: grpc.sendUnaryData<Response>
  ) {
    console.log(call.request.toObject())
    const metadata = grpc2grpc(call.metadata, false)
    this.client.uuid(call.request, metadata, (err, resp) => {
      if (err) {
        console.log('grpc middleware node call grpc error: ', err)
        return callback(err, null)
      }
      resp.setTracing(`${resp.getTracing()} -> ${this.appName}`)
      callback(null, resp)
    })
  }
}

const UPSTREAM = process.env.UPSTREAM
const PORT = process.env.PORT || '1235'

const startServer = () => {
  const client = new UuidServiceClient(
    UPSTREAM,
    grpc.credentials.createInsecure()
  )

  const server = new grpc.Server()
  server.addService(
    UuidServiceService,
    new UuidService(client, process.env.APP_NAME)
  )
  server.bind(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure())
  server.start()

  console.log(`Server started, listening: 0.0.0.0:${PORT}`)
}

startServer()
