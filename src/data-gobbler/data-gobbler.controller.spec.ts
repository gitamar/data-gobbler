import { Test, TestingModule } from '@nestjs/testing';
import { DataGobblerController } from './data-gobbler.controller';
import { DataGobblerService } from './data-gobbler.service';

describe('DataGobblerController', () => {
  let controller: DataGobblerController;
  const dto = { fileType: 'XML', payload: { HELLO: 'WORLD' } };
  const response = {
    message: 'Your Data has been stored',
    data: {
      fileUri:
        'http://localhost:3000/api/v1/data-gobbler/eb11c4f9-1b2d-4873-90e8-86388b0b9816',
      fileType: 'CSV',
      fileName: 'eb11c4f9-1b2d-4873-90e8-86388b0b9816',
    },
  };

  const listResponse = {
    data: [
      {
        id: 1,
        fileType: 'XML',
        fileId: '7d283308-d820-445f-83df-7b2adcd10465',
        isActive: true,
        isDeleted: false,
        createdAt: '2021-09-19T14:01:21.573Z',
        updatedAt: '2021-09-19T14:01:21.573Z',
        fileName: '7d283308-d820-445f-83df-7b2adcd10465.XML',
      },
      {
        id: 2,
        fileType: 'CSV',
        fileId: '369fab34-bd0c-42ca-8e22-a14fd1d1832a',
        isActive: true,
        isDeleted: false,
        createdAt: '2021-09-19T14:10:08.375Z',
        updatedAt: '2021-09-19T14:10:08.375Z',
        fileName: '369fab34-bd0c-42ca-8e22-a14fd1d1832a.CSV',
      },
    ],
    count: 2,
  };

  const updateResponse = {
    message: 'File contents are updated!',
    data: {
      payload: {
        YESSS: 'Nooooo',
      },
      fileType: 'CSV',
      fileId: 'ed0c5be8-c0aa-462b-b56b-888363106fee',
    },
  };

  const paginationInput = { take: '10', skip: '0' };

  const mockService = {
    create: jest.fn((dto) => {
      response.data.fileType = dto.fileType;
      return response;
    }),
    findAll: jest.fn((paginationInput) => {
      return listResponse;
    }),
    findOne: jest.fn((fileName) => {
      return '<HELLOOO>WORLLLDDDDDDDDDDDDDDDDDDDDDDDDDDDd</HELLOOO>';
    }),

    update: jest.fn((fileName, dto) => {
      return updateResponse;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataGobblerController],
      providers: [DataGobblerService],
    })
      .overrideProvider(DataGobblerService)
      .useValue(mockService)
      .compile();

    controller = module.get<DataGobblerController>(DataGobblerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new file', () => {
    expect(controller.create(dto)).toEqual(response);
  });

  it('should get a list of file details', () => {
    expect(controller.findAll({ take: '10', skip: '0' })).toEqual(listResponse);
  });

  it('should get a one file content', () => {
    expect(
      controller.findOne('b47a7b31-79ba-4ffa-8f64-870121240c5f.XML'),
    ).toEqual('<HELLOOO>WORLLLDDDDDDDDDDDDDDDDDDDDDDDDDDDd</HELLOOO>');
  });

  it('should update a file content', () => {
    expect(
      controller.update('b47a7b31-79ba-4ffa-8f64-870121240c5f.XML', dto),
    ).toEqual(updateResponse);
  });
});
