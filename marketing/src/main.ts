import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { options } from '@erp_project/config-library';
import { registerGatewayEntries } from '@erp_project/autoregister';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice(options);
  app.startAllMicroservicesAsync();
  app.enableCors();
  await app.listen(process.env.PORT);

  console.log('MD microservice running on ' + process.env.PORT);

  registerGatewayEntries(app);
}
bootstrap();
