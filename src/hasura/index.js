
import { InMemoryCache, ApolloClient } from '@apollo/client';

import buildHasuraProvider from "ra-data-hasura";
import { customBuildFields } from "./QueryExtensions";


const myClient = new ApolloClient({
  uri: "https://present-garfish-33.hasura.app/v1/graphql",
    headers: {
      "x-hasura-admin-secret": "v0aRxnfUCMeumeQZSnaYJZI83KmLkwUyuWVNCnn8AKFOboVJSfaA7EHRw9S74Tzu",
    },
    cache: new InMemoryCache()
});

const provider = async () => {
  return await buildHasuraProvider({ client: myClient }, {
    buildFields: customBuildFields,
  });
};

export default provider;
