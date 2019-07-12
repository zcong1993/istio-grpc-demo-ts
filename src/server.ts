import * as grpc from 'grpc'
import axios from 'axios'
import { grpc2http } from '@zcong/istio-helpers'
import { Request, Response } from './generated/pb_pb'
import { IUuidServiceServer, UuidServiceService } from './generated/pb_grpc_pb'

class UuidService implements IUuidServiceServer {
  private upstream: string
  private appName: string
  constructor(
    upstream: string = 'https://httpbin.org/uuid',
    appName: string = 'grpc-server-node'
  ) {
    this.upstream = upstream
    this.appName = appName
  }
  uuid(
    call: grpc.ServerUnaryCall<Request>,
    callback: grpc.sendUnaryData<Response>
  ) {
    console.log(call.request.toObject())
    console.log('incoming tracing: ', call.metadata)
    const headers = grpc2http(call.metadata)
    console.log('outgoing tracing: ', headers)
    axios
      .get(this.upstream, {
        headers
      })
      .then(({ data }) => {
        const resp = new Response()
        resp.setUuid(data.uuid)
        resp.setTracing(this.appName)
        callback(null, resp)
      })
      .catch(err => {
        console.log('call upstream error: ', err)
        callback(err, null)
      })
  }
}

const startServer = () => {
  const server = new grpc.Server()
  server.addService(
    UuidServiceService,
    new UuidService(process.env.UPSTREAM, process.env.APP_NAME)
  )
  server.bind('0.0.0.0:1234', grpc.ServerCredentials.createInsecure())
  server.start()

  console.log('Server started, listening: 0.0.0.0:1234')
}

startServer()
