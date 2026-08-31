import { Test, TestingModule } from '@nestjs/testing';
import { TransacyionsService } from './transacyions.service.js';

describe('TransacyionsService', () => {
  let service: TransacyionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransacyionsService],
    }).compile();

    service = module.get<TransacyionsService>(TransacyionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
