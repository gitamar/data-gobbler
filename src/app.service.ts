import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HealthCheckData } from './global-dto/app.dto';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  healthCheck(): HealthCheckData {
    return {
      version: this.configService.get<string>('version'),
      status: 'pass',
      serviceId: '1',
      notes: [
        'Loosly coupled with service 2 for file proccessing.',
        'This service manages file upload!',
      ],
      releaseId: this.configService.get<string>('releaseId'),
      description: 'A client facing service that handles file uploads.',
    };
  }
}
