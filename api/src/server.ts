import { GraphQLServer } from 'graphql-yoga';
import schema from './schema';
import { createContext } from './context';

import Client from './client';

const client = new Client({
  clientID: 'PAR_hiddentity_98f0adbb456b852c9ccb043469beca5edcdd1d8ec33774df6a4a58570d01466b',
  clientSecret: 'fe58b88b53daf29a6ac47daef0aa0bcec0f80ebc11ca4cf321a0111f2651df6b',
  scopes: [
    'application_PAR_hiddentity_98f0adbb456b852c9ccb043469beca5edcdd1d8ec33774df6a4a58570d01466b',
    'api_offresdemploiv2',
    'o2dsoffre',
  ],
});

async function main() {
  const { data } = await client.auth.connect('/partenaire');
  console.log('TOKEN:', data.access_token);
}

main();

/*
  new GraphQLServer({ schema, context: createContext }).start(() => console.log(
    '🚀 Server ready at: http://localhost:4000\n⭐️ See sample queries: http://pris.ly/e/ts/graphql#5-using-the-graphql-api',
  ));
*/
