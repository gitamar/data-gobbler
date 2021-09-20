import { Controller, Get, Version } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthCheckData, InternelServerError } from './global-dto/app.dto';
import { AppService } from './app.service';

@ApiTags('Miscellaneous')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiResponse({
    status: 200,
    type: HealthCheckData,
    description: 'Healthcheck API',
  })
  @ApiResponse({ status: 500, type: InternelServerError })
  @Version('1')
  @Get('/healthcheck')
  healthCheck(): HealthCheckData {
    return this.appService.healthCheck();
  }
}
