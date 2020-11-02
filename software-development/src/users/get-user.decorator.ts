import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SDUser } from './users.entity';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): SDUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
