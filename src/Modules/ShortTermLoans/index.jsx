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
  ReferenceInput,
  AutocompleteInput,
  Show,
  SimpleShowLayout,
  NumberInput,
  NumberField,
  DateField,
  ArrayField,
} from "react-admin";
import Box from "@material-ui/core/Box";
import ChevronLeft from "@material-ui/core/Icon";
import { Link } from "react-router-dom";
import { Resources } from "../../constants/resources";

const CustomerLink = (props) => {
  const record = useRecordContext(props);
  const linkToCustomer = linkToRecord(
    `/${Resources.customers}`,
    record.customer?.id,
    "show"
  );

  return (
    <Link to={linkToCustomer}>
      {record?.customer?.first_name} {record?.customer?.last_name}
    </Link>
  );
};

CustomerLink.defaultProps = { label: "Customer", addLabel: true };

const ShortTermLoanListFilter = (props) => (
  <Filter {...props}>
    <NumberInput source="customer_id" label="Customer id" alwaysOn />
  </Filter>
);

export const ShortTermLoansList = (props) => (
  <List {...props} filters={<ShortTermLoanListFilter />} perPage={50}>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <CustomerLink />
      <DateField source="date" />
      <NumberField source="principal_amount" />
      <NumberField source="installment_amount" />
      <NumberField source="duration" />
      <TextField label="frequency" source="si_frequency.frequency" />
      <TextField label="SI" source="si_frequency.si" />
      <TextField source="status" />
      <NumberField source="total" />
    </Datagrid>
  </List>
);
