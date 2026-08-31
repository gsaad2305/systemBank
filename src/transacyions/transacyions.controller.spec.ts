import { Test, TestingModule } from '@nestjs/testing';
import { TransacyionsController } from './transacyions.controller.js';
import { TransacyionsService } from './transacyions.service.js';

describe('TransacyionsController', () => {
  let controller: TransacyionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransacyionsController],
      providers: [TransacyionsService],
    }).compile();

    controller = module.get<TransacyionsController>(TransacyionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
