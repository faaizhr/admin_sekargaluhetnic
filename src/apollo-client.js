import { ApolloClient, InMemoryCache } from '@apollo/client';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

const httpLink = new HttpLink({
  uri: 'https://awaited-jawfish-77.hasura.app/v1/graphql',
  headers: {
      'x-hasura-admin-secret':
        '5Ane291GXzoO9deJ4RtRdJRXi0UnveXFJtHOnX9HN1qpdtnkEITIh5k2H9ejM7HD',
    }
});

const wsLink = new GraphQLWsLink(createClient({
  url: 'wss://awaited-jawfish-77.hasura.app/v1/graphql',
  connectionParams: {
      headers: {
          'x-hasura-admin-secret':
            '5Ane291GXzoO9deJ4RtRdJRXi0UnveXFJtHOnX9HN1qpdtnkEITIh5k2H9ejM7HD',
        }
  }
}));

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
({ query }) => {
  const definition = getMainDefinition(query);
  return (
    definition.kind === 'OperationDefinition' &&
    definition.operation === 'subscription'
  );
},
wsLink,
httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;







// const client = new ApolloClient({
//     uri: 'https://meet-civet-86.hasura.app/v1/graphql',
//     headers: {
//       'x-hasura-admin-secret':
//         'vkaCj1ratEb6S2in90rmULVVwAS9Q165MobK9qQiHBShrZxsAPUH3VcwDQ3PW18Q',
//     },
//     cache: new InMemoryCache(),
// });

// export default client;