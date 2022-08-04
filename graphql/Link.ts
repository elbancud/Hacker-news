import { objectType } from 'nexus';

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
