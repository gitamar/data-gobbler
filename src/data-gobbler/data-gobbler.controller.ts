import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Version,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { DataGobblerService } from './data-gobbler.service';
import { CreateDataGobblerDto } from './dto/create-data-gobbler.dto';
import { UpdateDataGobblerDto } from './dto/update-data-gobbler.dto';
import { IPaginationInput } from './interface';

@ApiTags('File Upload')
@Controller('data-gobbler')
export class DataGobblerController {
  constructor(private readonly dataGobblerService: DataGobblerService) {}

  @Version('1')
  @Post()
  create(@Body() createDataGobblerDto: CreateDataGobblerDto) {
    return this.dataGobblerService.create(createDataGobblerDto);
  }

  @ApiQuery({ name: 'take' })
  @ApiQuery({ name: 'skip' })
  @Version('1')
  @Get()
  findAll(@Query() query: IPaginationInput) {
    return this.dataGobblerService.findAll(query);
  }

  @Version('1')
  @Get('/:fileName')
  findOne(@Param('fileName') fileName: string) {
    return this.dataGobblerService.findOne(fileName);
  }

  @Version('1')
  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() updateDataGobblerDto: UpdateDataGobblerDto,
  ) {
    return this.dataGobblerService.update(id, updateDataGobblerDto);
  }
}
