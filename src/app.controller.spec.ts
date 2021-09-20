import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, ConfigService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('Health check', () => {
    it('should return "pass"', () => {
      const data = appController.healthCheck();
      expect(data.status).toBe('pass');
    });

    it('should return the health check object', () => {
      const expectedHealthCheckData = {
        version: 'v0.0.1',
        status: 'pass',
        serviceId: '1',
        notes: [
          'Loosly coupled with service 2 for file proccessing.',
          'This service manages file upload!',
        ],
        releaseId: '12ad32fa',
        description: 'A client facing service that handles file uploads.',
      };

      const data = appController.healthCheck();

      expect(data.serviceId).toStrictEqual(expectedHealthCheckData.serviceId);
    });
  });
});
