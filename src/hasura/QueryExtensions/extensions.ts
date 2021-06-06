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
          id
          date
          duration
          installment_amount
          principal_amount
          status
          total
          id
          si_frequency {
            id
            frequency
            si
          }
          short_term_repayments_aggregate {
            aggregate {
              sum {
                amount
              }
            }
          }
          view_status {
            repayment_amount
            total_repayed_amount
            expected_repayment_amount
            last_repayment_date
            total
            recievable_amount
          }
        }
        long_term_loans(order_by: { date: asc }) {
          id
          date
          id
          period_interest_amount
          principal_amount
          si_frequency {
            id
            frequency
            si
          }
        }
        credit_line {
          expected_repayment_amount
          exposure
          id
          last_repayment_date
          long_term_amount
          number_of_closed_loans
          number_of_error_loans
          number_of_open_loans
          open_loan_amount
          open_loan_amount_principal
          short_term_repayment_shortfall
          total_number_of_loans
          total_repayed_amount
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

const longTermRepaymentsExtensions = [
  {
    resourceName: Resources.longTermRepayments,
    fetchType: FETCH_TYPES.GET_LIST,
    query: gql`
      {
        long_term_loan {
          customer {
            id
            last_name
            first_name
          }
          id
          date
          principal_amount
          period_interest_amount
          si_frequency {
            id
            frequency
          }
        }
      }
    `,
  },
  {
    resourceName: Resources.longTermRepayments,
    fetchType: FETCH_TYPES.GET_ONE,
    query: gql`
      {
        long_term_loan {
          customer {
            id
            last_name
            first_name
          }
          id
          date
          principal_amount
          period_interest_amount
          si_frequency {
            id
            frequency
          }
        }
      }
    `,
  },
  {
    resourceName: Resources.longTermRepayments,
    fetchType: FETCH_TYPES.GET_MANY,
    query: gql`
      {
        long_term_loan {
          customer {
            id
            last_name
            first_name
          }
          id
          date
          principal_amount
          period_interest_amount
          si_frequency {
            id
            frequency
          }
        }
      }
    `,
  },
];

const viewLongTermStatusExtensions = [
  {
    resourceName: Resources.viewLongTermStatus,
    fetchType: FETCH_TYPES.GET_LIST,
    query: gql`
      {
        long_term_loan {
          customer {
            id
            last_name
            first_name
          }
          id
          date
          principal_amount
          period_interest_amount
          si_frequency {
            id
            frequency
          }
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
  ...longTermRepaymentsExtensions,
  ...viewLongTermStatusExtensions,
];

export default extensions;
