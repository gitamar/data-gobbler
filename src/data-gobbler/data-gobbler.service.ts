import { Inject, Injectable } from '@nestjs/common';
import { CreateDataGobblerDto } from './dto/create-data-gobbler.dto';
import { UpdateDataGobblerDto } from './dto/update-data-gobbler.dto';
import { FileProcessRequest } from './proto/fileReq_pb';
import { Crypto } from '../utils/crypto';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { randomUUID } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataGobbler } from './entities/data-gobbler.entity';
import { DataGobblerRepository } from './repository/data-gobbler.repository';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class DataGobblerService {
  constructor(
    @InjectRepository(DataGobbler)
    private dataGobblerRepository: DataGobblerRepository,
    private crypto?: Crypto,
    private fileProcessRequest?: FileProcessRequest,
    private configService?: ConfigService,
    @Inject('FILE_PROCESSOR_SERVICE') private readonly client?: ClientProxy,
    private httpService?: HttpService,
  ) {}

  async create(createDataGobblerDto: CreateDataGobblerDto) {
    const { fileType, payload } = createDataGobblerDto;
    const key = this.configService.get('secretKey');

    const fileName = randomUUID();

    this.fileProcessRequest.setFiletype(fileType);
    this.fileProcessRequest.setData(JSON.stringify(payload));
    this.fileProcessRequest.setFilename(fileName);

    const serializeBinaryFileProcessRequest =
      this.fileProcessRequest.serializeBinary();

    const encryptedSerialzieBinary = await this.crypto.encrypt(
      serializeBinaryFileProcessRequest,
      key,
    );

    this.client.emit('create-file', encryptedSerialzieBinary);

    await this.dataGobblerRepository.save({
      fileId: fileName,
      fileType: fileType,
    });

    return {
      message: 'Your Data has been stored',
      data: {
        fileUri: `http://localhost:3000/api/v1/data-gobbler/${fileName}`,
        fileType,
        fileName,
      },
    };
  }

  async findAll(query) {
    const take = query?.take || 10;
    const skip = query?.skip || 0;

    const [res, total] = await this.dataGobblerRepository.findAndCount({
      take: take,
      skip: skip,
    });

    const result = res.map((x) => {
      return {
        ...x,
        fileName: `${x.fileId}.${x.fileType}`,
      };
    });

    return {
      message: 'List All files and details.',
      data: result,
      count: total,
    };
  }

  async findOne(fileName: string) {
    const response = this.httpService.get(
      `${this.configService.get('fileProcessService')}${fileName}`,
    );

    const result = await lastValueFrom(response);

    console.log(result.data);

    return {
      message: 'File contents!',
      data: result.data,
    };
  }

  async update(fileId: string, updateDataGobblerDto: UpdateDataGobblerDto) {
    const { payload, fileType } = updateDataGobblerDto;
    const key = this.configService.get('secretKey');

    this.fileProcessRequest.setData(JSON.stringify(payload));
    this.fileProcessRequest.setFilename(fileId);
    this.fileProcessRequest.setFiletype(fileType);

    const serializeBinaryFileProcessRequest =
      this.fileProcessRequest.serializeBinary();

    const encryptedSerialzieBinary = await this.crypto.encrypt(
      serializeBinaryFileProcessRequest,
      key,
    );

    this.client.emit('update-file', encryptedSerialzieBinary);

    return {
      message: 'File contents are updated!',
      data: { payload, fileType, fileId },
    };
  }
}
