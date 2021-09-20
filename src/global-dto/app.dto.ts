import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class HealthCheckData implements IHealthCheckData {
  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsString()
  version: string;

  @ApiProperty()
  @IsString()
  releaseId: string;

  @ApiProperty()
  @IsString()
  notes: Array<string>;

  @ApiProperty()
  @IsString()
  serviceId: string;

  @ApiProperty()
  @IsString()
  description: string;
}

export interface IHealthCheckData {
  status: string;
  version: string;
  releaseId: string;
  notes: Array<string>;
  serviceId: string;
  description: string;
}

export class InternelServerError {
  @ApiProperty()
  @IsNumber()
  status: number;

  @ApiProperty()
  @IsString()
  message: string;
}
