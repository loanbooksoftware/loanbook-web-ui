import React, { cloneElement, useCallback } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import {
  linkToRecord,
  useListContext,
  TopToolbar,
  CreateButton,
  ExportButton,
  sanitizeListRestProps,
  ListButton,
  ShowButton,
  EditButton,
  Button,
} from "react-admin";
import { useForm } from "react-final-form";
import IconClear from "@material-ui/icons/Clear";

import { Link } from "react-router-dom";
import get from "lodash/get";
import ChevronLeft from "@material-ui/core/Icon";
import { Resources } from "../constants/resources";

const useStyles = makeStyles(
  (theme) => ({
    button: {
      marginLeft: "10px",
      position: "relative",
    },
    leftIcon: {
      marginRight: theme.spacing(1),
    },
    icon: {
      fontSize: 18,
    },
  }),
  { name: "ClearButton" }
);

const sanitizeRestProps = ({
  basePath,
  invalid,
  pristine,
  //reset,
  saving,
  submitOnEnter,
  handleSubmit,
  handleSubmitWithRedirect,
  undoable,
  onSave,
  ...rest
}) => rest;

const ClearButton = ({ className, icon, ...rest }) => {
  const classes = useStyles();
  const form = useForm();

  const handleClick = useCallback(() => {
    form.setConfig("keepDirtyOnReinitialize", false);
    form.reset();
    form.setConfig("keepDirtyOnReinitialize", true);
  }, [form]);

  return (
    <Button
      className={clsx(classes.button, className)}
      onClick={handleClick}
      {...sanitizeRestProps(rest)}
    >
      {icon
        ? React.cloneElement(icon, {
            className: clsx(classes.leftIcon, classes.icon),
          })
        : null}
    </Button>
  );
};

ClearButton.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  icon: PropTypes.element,
};

ClearButton.defaultProps = {
  icon: <IconClear />,
  label: "Clear",
};

export default ClearButton;

export function StopEventPropagation(props) {
  const noPropagation = (e) => e.stopPropagation();

  return <span onClick={noPropagation}>{props.children}</span>;
}

export const ListActions = (props) => {
  const {
    className,
    exporter,
    filters,
    maxResults,
    children,
    disableCreate,
    ...rest
  } = props;
  const {
    currentSort,
    resource,
    displayedFilters,
    filterValues,
    basePath,
    showFilter,
    total,
  } = useListContext();
  return (
    <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
      {filters &&
        cloneElement(filters, {
          resource,
          showFilter,
          displayedFilters,
          filterValues,
          context: "button",
        })}
      {children}
      {!disableCreate && <CreateButton basePath={basePath} />}
      <ExportButton
        disabled={total === 0}
        resource={resource}
        sort={currentSort}
        filterValues={filterValues}
        maxResults={maxResults}
      />
    </TopToolbar>
  );
};

export const listExtraProps = {
  perPage: 50,
  bulkActionButtons: false,
  sort: { field: "id", order: "DESC" },
  component: "div",
};

export const EditActions = ({ basePath, data }) => (
  <TopToolbar>
    <ListButton basePath={basePath} label="Back" icon={<ChevronLeft />} />
    <ShowButton basePath={basePath} record={data} />
  </TopToolbar>
);

export const CustomerShortDetailsRenderer = ({ record, path, variant }) => {
  const linkToCustomer = linkToRecord(
    `/${Resources.customers}`,
    get(record, `${path}.id`),
    "show"
  );

  const name = `${get(record, `${path}.first_name`, "")} ${get(
    record,
    `${path}.last_name`,
    ""
  )}`.trim();

  return (
    <StopEventPropagation>
      <Typography component="span" variant={variant || "body2"}>
        {name && <Link to={linkToCustomer}>{name}</Link>}
        {!name && "-"}
      </Typography>
    </StopEventPropagation>
  );
};

export const ShowActions = ({ basePath, data, resource, children }) => (
  <TopToolbar>
    {children}
    <EditButton basePath={basePath} record={data} />
  </TopToolbar>
);

export const CustomerReadOnly = (props) => {
  const { record } = props;
  return (
    <Box mb={1}>
      <Box mb={0.5}>
        <InputLabel>Customer name</InputLabel>
      </Box>
      <CustomerShortDetailsRenderer record={record} path="customer" />
    </Box>
  );
};

const useStylesLabel = makeStyles(
  (theme) => ({
    labelText: {
      fontSize: "0.7rem",
      lineHeight: 1,
      fontWeight: 500,
      color: "#718473",
    },
  }),
  { name: "Label" }
);

export function Label({ label, children, ...rest }) {
  const classes = useStylesLabel();
  return (
    <Box>
      <Box className={classes.labelText}>{label}</Box>
      {React.cloneElement(children, { ...rest })}
    </Box>
  );
}

export { default as CardList } from "./CardList";
export { default as ArrayField } from "./ArrayField/index.tsx";
