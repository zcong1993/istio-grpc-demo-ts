import * as grpc from 'grpc'
import { UuidServiceClient } from './generated/pb_grpc_pb'
import { Request, Response } from './generated/pb_pb'

const client = new UuidServiceClient(
  '0.0.0.0:1234',
  grpc.credentials.createInsecure()
)

const req = new Request()

client.uuid(req, (err, res) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(res.toObject())
})
