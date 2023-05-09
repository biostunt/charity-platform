import { EncryptPasswordService } from './encrypt-password.service';
import { Test } from '@nestjs/testing';
import { compare } from 'bcrypt';
describe('EncryptPasswordService', () => {
  let service: EncryptPasswordService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [EncryptPasswordService],
    }).compile();
    service = moduleRef.get(EncryptPasswordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#handle()', () => {
    it('should return correct value', async () => {
      const password = 'test';
      const result = await service.handle(password);
      expect(await compare(password, result)).toBe(true);
    });
  });
});
