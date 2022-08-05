import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { extendType, nonNull, objectType, stringArg } from 'nexus';
import { APP_SECRET_KEY } from '../utils';
export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.nonNull.string('token'),
      t.nonNull.field('user', {
        type: 'User',
      });
  },
});

export const AuthMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('signup', {
      type: 'AuthPayload',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
        name: nonNull(stringArg()),
      },
      async resolve(parent, args, context, info) {
        const { email, name } = args;
        const password = await bcrypt.hash(args.password, 10);
        const user = await context.prisma.user.create({
          data: {
            name,
            password,
            email,
          },
        });
        const token = jwt.sign({ userId: user.id }, APP_SECRET_KEY);
        return {
          token,
          user,
        };
      },
    });
  },
});
