import { extendType, objectType } from 'nexus';
import { NexusGenObjects } from '../nexus-typegen';

// TODO: Define a link type with fields
export const Link = objectType({
  name: 'Link',
  definition(t) {
    t.nonNull.int('id'),
      t.nonNull.string('description'),
      t.nonNull.string('url');
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
const links: NexusGenObjects['Link'][] = [
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

export const LinkQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('feed', {
      type: 'Link',
      resolve(parent, args, context, info) {
        return links;
      },
    });
  },
});
