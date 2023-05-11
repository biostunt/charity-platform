import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const connectSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Charity Platform')
    .setDescription('Swagger description of API routes')
    .setVersion('1.0')
    .addTag('charity')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  return app;
};
