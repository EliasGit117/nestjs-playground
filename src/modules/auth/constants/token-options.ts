import { JwtSignOptions } from "@nestjs/jwt";

export const refreshTokenOptions = { expiresIn: '365d' } satisfies JwtSignOptions;
export const accessTokenOptions = { expiresIn: '1h' } satisfies JwtSignOptions;
