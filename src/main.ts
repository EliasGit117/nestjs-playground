import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { BadRequestException, ValidationPipe } from "@nestjs/common";
import IValidationError from "./modules/shared/interfaces/validation-error";
import values from "lodash/values";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //_Pipes______________________________________________________________________________________________________________
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors) => new BadRequestException(
      errors.map((error): IValidationError => ({
        property: error.property,
        messages: values(error.constraints)
      }))
    ),
  }));

  //_Swagger____________________________________________________________________________________________________________
  const documentConfig = new DocumentBuilder()
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup("swagger", app, document);

  //____________________________________________________________________________________________________________________

  await app.listen(3000);
}

bootstrap().then();
