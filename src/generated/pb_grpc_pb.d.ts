// package: pb
// file: pb.proto

/* tslint:disable */

import * as grpc from "grpc";
import * as pb_pb from "./pb_pb";

interface IUuidServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    uuid: IUuidServiceService_IUuid;
}

interface IUuidServiceService_IUuid extends grpc.MethodDefinition<pb_pb.Request, pb_pb.Response> {
    path: string; // "/pb.UuidService/Uuid"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<pb_pb.Request>;
    requestDeserialize: grpc.deserialize<pb_pb.Request>;
    responseSerialize: grpc.serialize<pb_pb.Response>;
    responseDeserialize: grpc.deserialize<pb_pb.Response>;
}

export const UuidServiceService: IUuidServiceService;

export interface IUuidServiceServer {
    uuid: grpc.handleUnaryCall<pb_pb.Request, pb_pb.Response>;
}

export interface IUuidServiceClient {
    uuid(request: pb_pb.Request, callback: (error: grpc.ServiceError | null, response: pb_pb.Response) => void): grpc.ClientUnaryCall;
    uuid(request: pb_pb.Request, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: pb_pb.Response) => void): grpc.ClientUnaryCall;
    uuid(request: pb_pb.Request, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: pb_pb.Response) => void): grpc.ClientUnaryCall;
}

export class UuidServiceClient extends grpc.Client implements IUuidServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public uuid(request: pb_pb.Request, callback: (error: grpc.ServiceError | null, response: pb_pb.Response) => void): grpc.ClientUnaryCall;
    public uuid(request: pb_pb.Request, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: pb_pb.Response) => void): grpc.ClientUnaryCall;
    public uuid(request: pb_pb.Request, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: pb_pb.Response) => void): grpc.ClientUnaryCall;
}
