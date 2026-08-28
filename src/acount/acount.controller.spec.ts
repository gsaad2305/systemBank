import { Test, TestingModule } from '@nestjs/testing';
import { AcountController } from './acount.controller.js';
import { AcountService } from './acount.service.js';

describe('AcountController', () => {
  let controller: AcountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AcountController],
      providers: [AcountService],
    }).compile();

    controller = module.get<AcountController>(AcountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
