import React from "react";
import {
  linkToRecord,
  useRecordContext,
  List,
  Datagrid,
  TextField,
  Filter,
  SearchInput,
  Create,
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  Show,
  SimpleShowLayout,
  NumberInput,
  NumberField,
  DateField,
  ArrayField,
} from "react-admin";
import { Link } from "react-router-dom";
import { Resources } from "../../constants/resources";

import { CustomerReferenceInput, CustomerShortDetail } from "./components";
import { ListActions, listExtraProps, EditActions } from "../Commons";

const CustomerListFilter = (props) => (
  <Filter {...props}>
    <SearchInput source="first_name" alwaysOn />
  </Filter>
);

export const CustomerList = (props) => (
  <List
    {...props}
    {...listExtraProps}
    actions={<ListActions />}
    filters={<CustomerListFilter />}
  >
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="first_name" />
      <TextField source="last_name" />
      <TextField source="occupation" />
      <CustomerShortDetail path="referrer_details" />
    </Datagrid>
  </List>
);

export const CustomerEdit = (props) => (
  <Edit {...props} actions={<EditActions />}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="first_name" />
      <TextInput source="last_name" />
      <TextInput source="occupation" />
      <NumberInput source="monthly_income" />
      <DateInput source="date_of_birth" />
      <CustomerReferenceInput label="Reference" source="reference" />
    </SimpleForm>
  </Edit>
);

export const CustomerCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="first_name" />
      <TextInput source="last_name" />
      <TextInput source="occupation" />
      <NumberInput source="monthly_income" />
      <DateInput source="date_of_birth" />
      <CustomerReferenceInput label="Reference" source="reference" />
    </SimpleForm>
  </Create>
);

const ShortTermLoanLink = (props) => {
  const loan = useRecordContext(props);
  const linkToLoan = linkToRecord(
    `/${Resources.shortTermLoans}`,
    loan?.id,
    "show"
  );

  return <Link to={linkToLoan}>{loan.id}</Link>;
};

export const CustomerShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="first_name" />
      <TextField source="last_name" />
      <TextField source="occupation" />
      <NumberField source="monthly_income" />
      <DateField
        source="date_of_birth"
        options={{
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }}
      />
      <CustomerShortDetail path="referrer_details" />
      <ArrayField source="short_term_loans">
        <Datagrid>
          <DateField source="date" />
          <TextField source="principal_amount" />
          <TextField source="total" />
          <TextField source="installment_amount" />
          <TextField source="status" />
          <ShortTermLoanLink />
        </Datagrid>
      </ArrayField>
    </SimpleShowLayout>
  </Show>
);
