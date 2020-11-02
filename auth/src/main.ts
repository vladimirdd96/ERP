import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { registerGatewayEntries } from '@erp_project/autoregister';
import { options } from '@erp_project/config-library';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice(options);
  app.startAllMicroservicesAsync();
  app.enableShutdownHooks();
  app.enableCors();
  await app.listen(process.env.PORT);

  console.log('Auth microservice running on ' + process.env.PORT);

  registerGatewayEntries(app);
}

bootstrap();
