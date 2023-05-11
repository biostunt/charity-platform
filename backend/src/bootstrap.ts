import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connectSwagger } from 'src/connect-swagger';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  connectSwagger(app);
  await app.listen(3000, () => console.log('server started'));
}
