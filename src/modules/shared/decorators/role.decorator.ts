import { SetMetadata } from "@nestjs/common";

export enum Role {
  UncompletedAccount = "UNCOMPLETED_ACCOUNT",
  User = "USER",
  Admin = "ADMIN",
}

export const ROLES_KEY = "roles";

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
