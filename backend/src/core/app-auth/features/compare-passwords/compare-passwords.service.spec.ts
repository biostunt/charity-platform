import { ComparePasswordsService } from './compare-passwords.service';
import { Test } from '@nestjs/testing';
import { hash } from 'bcrypt';

describe('ComparePasswordsService', () => {
  let service: ComparePasswordsService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [ComparePasswordsService],
    }).compile();
    service = moduleRef.get(ComparePasswordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#handle()', () => {
    it('should return true if passwords are equal', async () => {
      const decoded = 'test';
      const encoded = await hash(decoded, 5);
      const result = await service.handle(decoded, encoded);
      expect(result).toBe(true);
    });
    it('should return false if passwords are not equal', async () => {
      const decoded = 'test';
      const encoded = 'another-test';
      const result = await service.handle(decoded, encoded);
      expect(result).toBe(false);
    });
  });
});
