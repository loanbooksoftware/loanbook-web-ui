import React, { cloneElement } from "react";
import {
  linkToRecord,
  useRecordContext,
  List,
  Datagrid,
  TextField,
  useListContext,
  TopToolbar,
  CreateButton,
  ExportButton,
  // Button,
  sanitizeListRestProps,
  Filter,
  SearchInput,
  ListButton,
  ShowButton,
  Create,
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
} from "react-admin";
import Typography from "@material-ui/core/Typography";
import ChevronLeft from "@material-ui/core/Icon";
import { Link } from "react-router-dom";
import { Resources } from "../../constants/resources";

const RefererDetail = (props) => {
  const customer = useRecordContext(props);
  const linkToCustomer = linkToRecord(
    `${Resources.customer}`,
    customer.referer_details?.id,
    "show"
  );

  return (
    <Link to={linkToCustomer}>
      {customer?.referer_details?.first_name}{" "}
      {customer?.referer_details?.last_name}
    </Link>
  );
};

const ListActions = (props) => {
  const { className, exporter, filters, maxResults, ...rest } = props;
  const {
    currentSort,
    resource,
    displayedFilters,
    filterValues,
    // hasCreate,
    basePath,
    // selectedIds,
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
      <CreateButton basePath={basePath} />
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

const CustomerFilter = (props) => (
  <Filter {...props}>
    <SearchInput source="first_name" alwaysOn />
  </Filter>
);

export const CustomerList = (props) => (
  <List
    {...props}
    actions={<ListActions />}
    filters={<CustomerFilter />}
    perPage={50}
  >
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="first_name" />
      <TextField source="last_name" />
      <TextField source="occupation" />
      <RefererDetail />
    </Datagrid>
  </List>
);

const CustomerEditActions = ({ basePath, data }) => (
  <TopToolbar>
    <ListButton basePath={basePath} label="Back" icon={<ChevronLeft />} />
    <ShowButton basePath={basePath} record={data} />
  </TopToolbar>
);

export const CustomerEdit = (props) => (
  <Edit {...props} actions={<CustomerEditActions />}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="first_name" />
      <TextInput source="occupation" />
    </SimpleForm>
  </Edit>
);

export const CustomerCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="first_name" />
      <TextInput source="occupation" />
    </SimpleForm>
  </Create>
);
