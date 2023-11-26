import { Module } from "@nestjs/common";
import { AuthController } from "./controllers/auth.controller";
import { CqrsModule } from "@nestjs/cqrs";
import { UserModule } from "../user/user.module";
import { SignInCommandHandler } from "./commands/sign-in.command";
import { JwtModule } from "@nestjs/jwt";
import { SignUpCommandHandler } from "./commands/sign-up.command";
import { GetTokenPairCommandHandler } from "./commands/get-token-pair.command";
import { ConfigService } from "@nestjs/config";
import { SessionModule } from "../sessions/session.module";
import { GetNewAccessTokenCommandHandler } from "./commands/refresh-access-token.command";

const injectablesToExport = [];
const queryHandlers = [];
const commandHandlers = [
  SignInCommandHandler,
  SignUpCommandHandler,
  GetTokenPairCommandHandler,
  GetNewAccessTokenCommandHandler
];
const toProvideAndExport = [
  ...injectablesToExport,
  ...commandHandlers,
  ...queryHandlers
];

@Module({
  imports: [
    CqrsModule,
    UserModule,
    SessionModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        global: true, secret: config.get<string>('JWT_SECRET')
      })
    })
  ],
  controllers: [AuthController],
  providers: [...toProvideAndExport],
  exports: [...toProvideAndExport]
})
export class AuthModule {
}
