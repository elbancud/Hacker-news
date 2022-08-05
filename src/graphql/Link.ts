import { extendType, nonNull, objectType, stringArg } from 'nexus';
import { NexusGenObjects } from '../../nexus-typegen';

// TODO: Define a link type with fields
export const Link = objectType({
  name: 'Link',
  definition(t) {
    t.nonNull.int('id'),
      t.nonNull.string('description'),
      t.nonNull.string('url');
    t.field('postedBy', {
      type: 'User',
      resolve(parent, args, context, info) {
        return context.prisma.link
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .postedBy();
      },
    });
  },
});
/**
 * Structure of defining a type
 * import {objectType}
 * export const <label> = objectType({
 * name: ''
 * definition(t){
 * t.<attributes>.dataType()
 * }
 * })
 */
// TODO: Define a static field of links
// link: NexusGenObjects[<Object>][]  = [{fields}]
let links: NexusGenObjects['Link'][] = [
  // Fret not, this is just the type of being inferred from typegen.ts
  // this will be use to store the links at runtime
  {
    id: 1,
    url: 'https://unboxing.com',
    description: 'mani suntokan',
  },
  {
    id: 2,
    url: 'facebook.com',
    description: 'bold na may onting social media',
  },
];
// TODO: Feeder
// The very essence of Graph QL
// Being able to return the specific data for this field
export const linkQuery = extendType({
  // Extends the type
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('feed', {
      type: 'Link',
      resolve(parent, args, context, info) {
        // This will be the implementation of the type
        return context.prisma.link.findMany();
      },
    });
  },
});

// TODO: Mutation
export const LinkMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('post', {
      type: 'Link',
      args: {
        description: nonNull(stringArg()),
        url: nonNull(stringArg()),
      },
      resolve(parent, args, context) {
        const { description, url } = args;
        const { userId } = context;
        if (!userId) {
          throw new Error('Cannot post with logging in');
        }

        const link = context.prisma.link.create({
          data: {
            description,
            url,
            postedBy: {
              connect: {
                id: userId,
              },
            },
          },
        });
        return link;
      },
    });
    // t.nonNull.field('update', {
    //   type: 'Link',
    //   args: {
    //     description: nonNull(stringArg()),
    //     url: nullable(stringArg()),
    //     id: nullable(intArg()),
    //   },
    //   resolve(parent, args, context) {
    //     const { description, url, id } = args;
    //   },
    // });
  },
});
