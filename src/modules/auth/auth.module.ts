import { Module } from "@nestjs/common";
import { AuthController } from "./controllers/auth.controller";
import { CqrsModule } from "@nestjs/cqrs";
import { UserModule } from "../user/user.module";


@Module({
  imports: [
    CqrsModule,
    UserModule
  ],
  controllers: [AuthController],
  providers: []
})
export class AuthModule {
}
