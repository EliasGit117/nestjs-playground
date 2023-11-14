import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from "./modules/auth/auth.module";
import { SharedModule } from "./modules/shared/shared.module";

@Module({
  imports: [
    AuthModule,
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule {}
