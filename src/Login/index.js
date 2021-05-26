import React, { useRef, useEffect, useMemo } from "react";
import { Card, Avatar } from "@material-ui/core";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import LockIcon from "@material-ui/icons/Lock";
import { useHistory } from "react-router-dom";

import defaultTheme from "./defaultTheme";
import DefaultLoginForm from "./LoginForm";
import authProvider from "../auth/provider";

const useStyles = makeStyles(
  (theme) => ({
    main: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      height: "1px",
      alignItems: "center",
      justifyContent: "flex-start",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundImage:
        "radial-gradient(circle at 50% 14em, #313264 0%, #00023b 60%, #00023b 100%)",
    },
    card: {
      minWidth: 300,
      marginTop: "6em",
    },
    avatar: {
      margin: "1em",
      display: "flex",
      justifyContent: "center",
    },
    icon: {
      backgroundColor: theme.palette.secondary[500],
    },
  }),
  { name: "RaLogin" }
);

const Login = (props) => {
  const {
    title,
    classes: classesOverride,
    className,
    children = <DefaultLoginForm />,
    staticContext,
    backgroundImage,
    ...rest
  } = props;

  const containerRef = useRef();
  const classes = useStyles(props);
  const muiTheme = useMemo(() => createMuiTheme(defaultTheme), []);
  let backgroundImageLoaded = false;
  const history = useHistory();

  useEffect(() => {
    authProvider
      .checkAuth()
      .then(() => {
        // already authenticated, redirect to the home page
        history.push("/");
      })
      .catch(() => {
        // not authenticated, stay on the login page
      });
  }, [history]);

  const updateBackgroundImage = () => {
    if (!backgroundImageLoaded && containerRef.current) {
      containerRef.current.style.backgroundImage = `url(${backgroundImage})`;
      backgroundImageLoaded = true;
    }
  };

  // Load background image asynchronously to speed up time to interactive
  const lazyLoadBackgroundImage = () => {
    if (backgroundImage) {
      const img = new Image();
      img.onload = updateBackgroundImage;
      img.src = backgroundImage;
    }
  };

  useEffect(() => {
    if (!backgroundImageLoaded) {
      lazyLoadBackgroundImage();
    }
  });

  return (
    <ThemeProvider theme={muiTheme}>
      <div
        className={`${classes.main} ${className}`}
        {...rest}
        ref={containerRef}
      >
        <Card className={classes.card}>
          <div className={classes.avatar}>
            <Avatar className={classes.icon}>
              <LockIcon />
            </Avatar>
          </div>
          {children}
        </Card>
      </div>
    </ThemeProvider>
  );
};

export default Login;
