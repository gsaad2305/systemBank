import { Test, TestingModule } from '@nestjs/testing';
import { AcountService } from './acount.service.js';

describe('AcountService', () => {
  let service: AcountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AcountService],
    }).compile();

    service = module.get<AcountService>(AcountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
