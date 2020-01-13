import { nexusPrismaPlugin } from 'nexus-prisma';
import { makeSchema, objectType } from 'nexus';

const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.email();
  },
});

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.crud.user({
      alias: 'user',
    });
  },
});

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.crud.createOneUser({ alias: 'signupUser' });
  },
});

const schema = makeSchema({
  types: [Query, Mutation, User],
  plugins: [nexusPrismaPlugin()],
  outputs: {
    schema: `${__dirname}/generated/schema.graphql`,
    typegen: `${__dirname}/generated/nexus.ts`,
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/photon',
        alias: 'photon',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
  },
});

export default schema;
