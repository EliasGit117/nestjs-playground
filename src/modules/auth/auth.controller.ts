import { Controller, Get } from "@nestjs/common";
import { PrismaService } from "../shared/services/prisma.service";

@Controller("auth")
export class AuthController {

  constructor(private prisma: PrismaService) {
  }

  @Get("sign-in")
  signIn() {
    return { message: "Signed In" };
  }

  @Get("sign-up")
  signUp() {
    return { message: "Signed Up" };
  }

  @Get("test-prisma")
  async testPrisma() {
    return this.prisma.user.create({
      data: {
        email: "test",
        name: "test",
        password: "test"
      }
    });
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
