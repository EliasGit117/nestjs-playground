import { createParamDecorator } from '@nestjs/common';

export const TokenData = createParamDecorator((data, req) => {
  return req.accessTokenData;
});
