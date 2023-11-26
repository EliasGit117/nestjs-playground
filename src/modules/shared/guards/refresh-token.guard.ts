import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Role } from "../decorators/role.decorator";
import { JwtService } from "@nestjs/jwt";

interface IAccessTokenData {
  sub?: string,
  role?: Role
}

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const header = request.headers["refresh"];

    if (!header)
      throw new UnauthorizedException("Refresh header is missing");

    let tokenData: IAccessTokenData | any;

    try {
      tokenData = this.jwtService.verify(header);
      request.refreshTokenData = tokenData;
    } catch (e) {
      console.error(e);
      throw new UnauthorizedException(e.message);
    }

    return true;
  }
}
