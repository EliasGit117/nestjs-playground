import { Module } from '@nestjs/common';
import { PrismaService } from "./services/prisma.service";

const servicesToExport = [
  PrismaService
];

@Module({
  providers: [...servicesToExport],
  exports: [...servicesToExport]
})
export class SharedModule {}
