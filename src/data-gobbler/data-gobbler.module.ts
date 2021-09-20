import { Module } from '@nestjs/common';
import { DataGobblerService } from './data-gobbler.service';
import { DataGobblerController } from './data-gobbler.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Crypto } from '../utils/crypto';
import { FileProcessRequest } from './proto/fileReq_pb';
import { ConfigService } from '@nestjs/config';
import { DataGobbler } from './entities/data-gobbler.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'FILE_PROCESSOR_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:8000'],
          queue: 'file_processor',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    TypeOrmModule.forFeature([DataGobbler]),
    HttpModule,
  ],
  controllers: [DataGobblerController],
  providers: [DataGobblerService, Crypto, FileProcessRequest, ConfigService],
})
export class DataGobblerModule {}
