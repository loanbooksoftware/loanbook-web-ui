const prod = {
  HTTPS_URL: "https://present-garfish-33.hasura.app/v1/graphql",
  WSS_URL: "wss://present-garfish-33.hasura.app/v1/graphql",
  token: "v0aRxnfUCMeumeQZSnaYJZI83KmLkwUyuWVNCnn8AKFOboVJSfaA7EHRw9S74Tzu",
};

const dev = {
  HTTPS_URL: "http://localhost:8080/v1/graphql",
  WSS_URL: "ws://localhost:3000/v1/graphql",
  token: "testAdminSecret",
};

const config = process.env.REACT_APP_STAGE === "production" ? prod : dev;

const finalConfig = {
  // Add common config values here
  ...config,
};

export default finalConfig;
