import { PartialType } from '@nestjs/swagger';
import { CreateDataGobblerDto } from './create-data-gobbler.dto';

export class UpdateDataGobblerDto extends PartialType(CreateDataGobblerDto) {}
