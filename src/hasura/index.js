import { InMemoryCache, ApolloClient } from "@apollo/client";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { onError } from "apollo-link-error";

import buildHasuraProvider from "ra-data-hasura";
import { customBuildFields } from "./QueryExtensions";

const HTTPS_URL = "https://present-garfish-33.hasura.app/v1/graphql";
const WSS_URL = "wss://present-garfish-33.hasura.app/v1/graphql";

const provider = async () => {
  let provider;

  try {
    const httpsLink = new HttpLink({
      uri: HTTPS_URL,
      headers: {
        "x-hasura-admin-secret": localStorage.getItem("token"),
      },
    });

    const wssLink = new WebSocketLink({
      uri: WSS_URL,
      options: {
        reconnect: true,
        connectionParams: {
          headers: {
            "x-hasura-admin-secret": localStorage.getItem("token"),
          },
        },
      },
    });

    const errorLink = onError(
      ({ graphQLErrors, networkError, forward, operation, response }) => {
        if (graphQLErrors) {
          graphQLErrors.forEach(({ message, extensions }) => {
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${extensions.code}`
            );
          });
        }
        if (graphQLErrors) {
          for (let err of graphQLErrors) {
            console.log("error", err);
            switch (err.extensions.code) {
              case "access-denied":
                response.errors = null;
                window.location.href = "/#login";
                break;
              default:
            }
          }
        }
        if (networkError) {
          console.log(`[Network error]: ${networkError}`);
          window.location.href = "/login";
        }
      }
    );

    const myClient = new ApolloClient({
      link: errorLink.concat(httpsLink).concat(wssLink),
      cache: new InMemoryCache(),
    });
    provider = await buildHasuraProvider(
      { client: myClient },
      {
        buildFields: customBuildFields,
      }
    );
  } catch (e) {
    console.log("err", e);
  }
  return provider;
};

export default provider;
