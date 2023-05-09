import { Test } from '@nestjs/testing';
import { GenerateTokenService } from './generate-token.service';
import { JwtService } from '@nestjs/jwt';

const mockJwtService = {
  signAsync: jest.fn(),
};

describe('GenerateTokenService', () => {
  let service: GenerateTokenService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [GenerateTokenService, { provide: JwtService, useValue: mockJwtService }],
    }).compile();
    service = moduleRef.get(GenerateTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#handle()', () => {
    it('should call jwtService to sign payload', async () => {
      const payload = { id: 'test' };
      jest.spyOn(mockJwtService, 'signAsync').mockResolvedValue('test');
      const result = await service.handle(payload);
      expect(result).toBe('test');
      expect(mockJwtService.signAsync).toBeCalledWith(payload);
    });
  });
});
