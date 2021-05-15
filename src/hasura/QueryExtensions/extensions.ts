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
  {
    resourceName: Resources.shortTermLoans,
    fetchType: FETCH_TYPES.GET_ONE,
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
        short_term_repayments_aggregate {
          aggregate {
            count
            sum {
              amount
            }
            max {
              date
            }
          }
        }
        short_term_repayments {
          id
          amount
          date
          created_at
          installment_date
        }
      }
    `,
  },
  {
    resourceName: Resources.shortTermLoans,
    fetchType: FETCH_TYPES.GET_MANY,
    query: gql`
      {
        customer {
          id
          first_name
          last_name
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

const shortTermRepaymentsExtensions = [
  {
    resourceName: Resources.shortTermRepayments,
    fetchType: FETCH_TYPES.GET_LIST,
    query: gql`
      {
        short_term_loan {
          id
          customer {
            id
            last_name
            first_name
          }
          date
          total
          si_frequency {
            id
            frequency
          }
        }
      }
    `,
  },
  {
    resourceName: Resources.shortTermRepayments,
    fetchType: FETCH_TYPES.GET_ONE,
    query: gql`
      {
        short_term_loan {
          id
          customer {
            id
            last_name
            first_name
          }
          date
          total
          si_frequency {
            id
            frequency
          }
        }
      }
    `,
  },
  {
    resourceName: Resources.shortTermRepayments,
    fetchType: FETCH_TYPES.GET_MANY,
    query: gql`
      {
        short_term_loan {
          id
          customer {
            id
            last_name
            first_name
          }
          date
          total
          si_frequency {
            id
            frequency
          }
        }
      }
    `,
  },
];

const viewShortTermStatusExtensions = [
  {
    resourceName: Resources.viewShortTermStatus,
    fetchType: FETCH_TYPES.GET_LIST,
    query: gql`
      {
        short_term_loan {
          id
          customer {
            id
            last_name
            first_name
          }
          date
          total
          si_frequency {
            id
            frequency
          }
        }
      }
    `,
  },
];

const longTermLoansExtensions = [
  {
    resourceName: Resources.longTermLoans,
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
  {
    resourceName: Resources.longTermLoans,
    fetchType: FETCH_TYPES.GET_ONE,
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
        view_status {
          long_term_repayments_interest
          long_term_repayments_principal
          new_amount
          principal_amount_left
        }
        long_term_repayments {
          date
          amount
          type
          id
        }
      }
    `,
  },
  {
    resourceName: Resources.longTermLoans,
    fetchType: FETCH_TYPES.GET_MANY,
    query: gql`
      {
        customer {
          id
          first_name
          last_name
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

const extensions = [
  ...customersExtensions,
  ...shortTermLoansExtensions,
  ...shortTermRepaymentsExtensions,
  ...viewShortTermStatusExtensions,
  ...longTermLoansExtensions,
];

export default extensions;
