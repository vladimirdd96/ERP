import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { MDUser } from 'src/users/users.entity';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): MDUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
