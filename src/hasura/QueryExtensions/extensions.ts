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

const customersExtensions = [
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
  {
    resourceName: Resources.customers,
    fetchType: FETCH_TYPES.GET_ONE,
    query: gql`
      {
        referer_details {
          id
          first_name
          last_name
        }
        short_term_loans(order_by: { date: asc }) {
          date
          duration
          installment_amount
          principal_amount
          status
          total
          id
        }
      }
    `,
  },
];

const shortTermLoansExtensions = [
  {
    resourceName: Resources.shortTermLoans,
    fetchType: FETCH_TYPES.GET_LIST,
    query: gql`
      {
        customer {
          first_name
          id
          last_name
          date_of_birth
          occupation
          monthly_income
        }
        si_frequency {
          si
          frequency
          id
        }
      }
    `,
  },
];

const extensions = [...customersExtensions, ...shortTermLoansExtensions];

export default extensions;
