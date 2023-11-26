import { Module } from '@nestjs/common';
import { CqrsModule } from "@nestjs/cqrs";
import { Session, SessionSchema } from "./models/session.model";
import { MongooseModule } from "@nestjs/mongoose";
import { CreateSessionCommandHandler } from "./commands/create-session.command";
import { GetSessionByIdQueryHandler } from "./queries/get-session-by-id.query";

const injectablesToExport = [];
const queryHandlers = [GetSessionByIdQueryHandler];
const commandHandlers = [CreateSessionCommandHandler];
const toProvideAndExport = [
  ...injectablesToExport,
  ...commandHandlers,
  ...queryHandlers
];

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]),
  ],
  controllers: [],
  providers: [...toProvideAndExport],
  exports: [...toProvideAndExport]
})
export class SessionModule {}
