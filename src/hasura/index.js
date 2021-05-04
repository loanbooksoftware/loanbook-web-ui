import buildHasuraProvider from "ra-data-hasura";
import { customBuildFields } from "./QueryExtensions";

const options = {
  clientOptions: { uri: "http://localhost:8080/v1/graphql" },
};

const provider = async () => {
  return await buildHasuraProvider(options, {
    buildFields: customBuildFields,
  });
};

export default provider;
