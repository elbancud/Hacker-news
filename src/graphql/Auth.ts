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
    t.nonNull.field('login', {
      type: 'AuthPayload',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(parent, args, context, info) {
        const { email } = args;
        const user = await context.prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!user) {
          throw new Error('No such user found');
        }
        const valid = await bcrypt.compare(args.password, user.password);
        if (!valid) {
          throw new Error('Invalid credentials');
        }
        const token = await jwt.sign({ userId: user.id }, APP_SECRET_KEY);
        return {
          user,
          token,
        };
      },
    });
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
