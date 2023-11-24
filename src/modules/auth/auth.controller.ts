import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CommandBus } from "@nestjs/cqrs";
import { CreateNewProfileDto } from "./dtos/create-new-profile.dto";
import { CreateNewProfileCommand } from "./commands/create-new-profile.command";

@ApiTags('auth')
@Controller("auth")
export class AuthController {

  constructor(
    private readonly commandBus: CommandBus
  ) {}

  @Get("sign-in")
  signIn() {
    return { message: "Signed In" };
  }

  @Post("sign-up")
  signUp(@Body() profile: CreateNewProfileDto) {
    return this.commandBus.execute(new CreateNewProfileCommand(profile));
  }

  @Get("test-prisma")
  async testPrisma() {

  }

  @Get("role")
  getRole() {
    return {
      role: {
        username: "some username", role: "some role"
      }
    };
  }

}
