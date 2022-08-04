import { makeSchema } from 'nexus';
import { join } from 'path';
import * as types from '../graphql';
/**
 * What's happening here
 * - Types which will be passed as an array
 * - outputs - only meant to generate the ff:
 * - schema - join() - meant to create a schema on the cwd
 * - typegen - creates a typegen instance
 */
export const schema = makeSchema({
  types,
  outputs: {
    schema: join(process.cwd(), 'schema.graphql'),
    typegen: join(process.cwd(), 'nexus-typegen.ts'),
  },
});
