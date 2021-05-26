import * as React from "react";
import PropTypes from "prop-types";
import { Field, Form } from "react-final-form";
import {
  Button,
  CardActions,
  CircularProgress,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslate, useSafeSetState } from "ra-core";
import { useHistory } from "react-router-dom";

import authProvider from "../auth/provider";

const useStyles = makeStyles(
  (theme) => ({
    form: {
      padding: "0 1em 1em 1em",
    },
    input: {
      marginTop: "1em",
    },
    button: {
      width: "100%",
    },
    icon: {
      marginRight: theme.spacing(1),
    },
  }),
  { name: "RaLoginForm" }
);

const Input = ({
  meta: { touched, error }, // eslint-disable-line react/prop-types
  input: inputProps, // eslint-disable-line react/prop-types
  ...props
}) => (
  <TextField
    error={!!(touched && error)}
    helperText={touched && error}
    {...inputProps}
    {...props}
    fullWidth
  />
);

const LoginForm = (props) => {
  const { redirectTo } = props;
  const [loading, setLoading] = useSafeSetState(false);
  const translate = useTranslate();
  const classes = useStyles(props);
  const history = useHistory();

  const validate = (values) => {
    const errors = { username: undefined, password: undefined };

    if (!values.username) {
      errors.username = translate("ra.validation.required");
    }
    if (!values.password) {
      errors.password = translate("ra.validation.required");
    }
    return errors;
  };

  const submit = (values) => {
    setLoading(true);
    authProvider
      .login(values)
      .then(() => {
        setLoading(false);
        history.push(redirectTo);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  return (
    <Form
      onSubmit={submit}
      validate={validate}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} noValidate>
          <div className={classes.form}>
            <div className={classes.input}>
              <Field
                autoFocus
                id="username"
                name="username"
                component={Input}
                label={"Username"}
                disabled={loading}
              />
            </div>
            <div className={classes.input}>
              <Field
                id="password"
                name="password"
                component={Input}
                label={"password"}
                type="password"
                disabled={loading}
                autoComplete="current-password"
              />
            </div>
          </div>
          <CardActions>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              disabled={loading}
              className={classes.button}
            >
              {loading && (
                <CircularProgress
                  className={classes.icon}
                  size={18}
                  thickness={2}
                />
              )}
              Login
            </Button>
          </CardActions>
        </form>
      )}
    />
  );
};

LoginForm.propTypes = {
  redirectTo: PropTypes.string,
};

export default LoginForm;
