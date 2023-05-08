import { AppConfigService } from './app-config.service';
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

const mockConfigService = {
  get: jest.fn(),
};

describe('AppConfigService', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('Environment Variables Exists', () => {
    let service: AppConfigService;

    beforeAll(async () => {
      jest.spyOn(mockConfigService, 'get').mockReturnValue('test');
      const moduleRef = await Test.createTestingModule({
        providers: [{ provide: ConfigService, useValue: mockConfigService }, AppConfigService],
      }).compile();
      service = moduleRef.get(AppConfigService);
    });

    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('environment variables should be set', () => {
      expect(service.NODE_ENV).toBe('test');
      expect(service.JWT_SECRET).toBe('test');
      expect(service.JWT_EXPIRES_IN).toBe('test');
    });
  });

  describe('Environment Variables not exists', () => {
    let service: AppConfigService;

    beforeAll(async () => {
      jest.spyOn(mockConfigService, 'get').mockReturnValue(undefined);
      const moduleRef = await Test.createTestingModule({
        providers: [AppConfigService, { provide: ConfigService, useValue: mockConfigService }],
      }).compile();
      service = moduleRef.get(AppConfigService);
    });

    it('values shouldn`t be empty', () => {
      expect(service.NODE_ENV).toBeDefined();
      expect(service.JWT_SECRET).toBeDefined();
      expect(service.JWT_EXPIRES_IN).toBeDefined();
    });
  });
});
