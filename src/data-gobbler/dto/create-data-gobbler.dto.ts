import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
} from 'class-validator';
import { FileType } from '../enum/data-gobbler.enum';

export class CreateDataGobblerDto {
  @ApiProperty()
  @IsEnum(FileType)
  @IsDefined()
  @IsNotEmpty()
  fileType: string;

  @ApiProperty()
  @IsObject()
  @IsNotEmptyObject()
  payload: Record<string, any>;
}
