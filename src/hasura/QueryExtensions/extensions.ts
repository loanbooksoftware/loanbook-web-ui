import { Resources } from "../../constants/resources";
import gql from "graphql-tag";

const FETCH_TYPES = {
  GET_ONE: "GET_ONE",
  GET_LIST: "GET_LIST",
  GET_MANY: "GET_MANY",
  GET_MANY_REFERENCE: "GET_MANY_REFERENCE",
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  UPDATE_MANY: "UPDATE_MANY",
  DELETE: "DELETE",
  DELETE_MANY: "DELETE_MANY",
};

const extensions = [
  {
    resourceName: Resources.customers,
    fetchType: FETCH_TYPES.GET_LIST,
    query: gql`
      {
        referer_details {
          id
          first_name
          last_name
        }
      }
    `,
  },
];

export default extensions;
