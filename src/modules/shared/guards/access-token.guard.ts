import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role, ROLES_KEY } from "../decorators/role.decorator";
import { JwtService } from "@nestjs/jwt";

interface IAccessTokenData {
  sub?: string,
  role?: Role
}

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService
  ) {
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers["authorization"];

    if (!authHeader)
      throw new UnauthorizedException("Authorization header is missing");

    if (authHeader.split(" ").length !== 2)
      throw new UnauthorizedException("Authorization header is in wrong format");

    let tokenData: IAccessTokenData | any;

    try {
      const token = authHeader.split(" ")[1];
      tokenData = this.jwtService.verify(token);
      request.accessTokenData = tokenData;

    } catch (e) {
      console.error(e);
      throw new UnauthorizedException(e.message);
    }

    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());

    if (!roles || !roles.length)
      return true;

    if (!tokenData.role || !roles.includes(tokenData.role))
      throw new ForbiddenException("Role is missing or resource is not available for this role");

    return true;
  }
}
