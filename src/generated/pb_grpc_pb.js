// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var pb_pb = require('./pb_pb.js');

function serialize_pb_Request(arg) {
  if (!(arg instanceof pb_pb.Request)) {
    throw new Error('Expected argument of type pb.Request');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_Request(buffer_arg) {
  return pb_pb.Request.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_Response(arg) {
  if (!(arg instanceof pb_pb.Response)) {
    throw new Error('Expected argument of type pb.Response');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_Response(buffer_arg) {
  return pb_pb.Response.deserializeBinary(new Uint8Array(buffer_arg));
}


var UuidServiceService = exports.UuidServiceService = {
  uuid: {
    path: '/pb.UuidService/Uuid',
    requestStream: false,
    responseStream: false,
    requestType: pb_pb.Request,
    responseType: pb_pb.Response,
    requestSerialize: serialize_pb_Request,
    requestDeserialize: deserialize_pb_Request,
    responseSerialize: serialize_pb_Response,
    responseDeserialize: deserialize_pb_Response,
  },
};

exports.UuidServiceClient = grpc.makeGenericClientConstructor(UuidServiceService);
