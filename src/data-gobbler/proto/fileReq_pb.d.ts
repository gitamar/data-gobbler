// package:
// file: src/data-gobbler/proto/fileReq.proto

import * as jspb from 'google-protobuf';

export class FileProcessRequest extends jspb.Message {
  getFiletype(): string;
  setFiletype(value: string): void;

  getData(): string;
  setData(value: string): void;

  getFilename(): string;
  setFilename(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FileProcessRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: FileProcessRequest,
  ): FileProcessRequest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: FileProcessRequest,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): FileProcessRequest;
  static deserializeBinaryFromReader(
    message: FileProcessRequest,
    reader: jspb.BinaryReader,
  ): FileProcessRequest;
}

export namespace FileProcessRequest {
  export type AsObject = {
    filetype: string;
    data: string;
    filename: string;
  };
}
