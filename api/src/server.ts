import 'dotenv/config';
import { GraphQLServer } from 'graphql-yoga';
import schema from './schema';
import { createContext } from './context';

import Client from './client';

const client = new Client({
  clientID: process.env.EMPLOI_STORE_CLIENT_ID || '',
  clientSecret: process.env.EMPLOI_STORE_SECRET || '',
  scopes: [
    `application_${process.env.EMPLOI_STORE_CLIENT_ID}`,
    'api_offresdemploiv2',
    'o2dsoffre',
  ],
});

async function searchTest() {
  const communes = await client.referentiel.communes();

  console.log('COMMUNE:', communes[0]);

  const offres = await client.offres.search({
    commune: communes[0].code,
  });

  console.log('FIRST COMPANY FOUND:', offres.resultats[0].entreprise);
}

searchTest();


new GraphQLServer({ schema, context: createContext }).start(() => console.log(
  '🚀 Server ready at: http://localhost:4000\n⭐️ See sample queries: http://pris.ly/e/ts/graphql#5-using-the-graphql-api',
));
