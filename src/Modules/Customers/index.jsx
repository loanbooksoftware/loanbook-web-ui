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
  Show,
  SimpleShowLayout,
  NumberInput,
  NumberField,
  DateField,
  ArrayField,
} from "react-admin";
import ChevronLeft from "@material-ui/core/Icon";
import { Link } from "react-router-dom";
import { Resources } from "../../constants/resources";

import { CustomerReferenceInput, RefererDetail } from "./components";

const CustomerListActions = (props) => {
  const { className, exporter, filters, maxResults, ...rest } = props;
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

const CustomerListFilter = (props) => (
  <Filter {...props}>
    <SearchInput source="first_name" alwaysOn />
  </Filter>
);

export const CustomerList = (props) => (
  <List
    {...props}
    actions={<CustomerListActions />}
    filters={<CustomerListFilter />}
    perPage={50}
  >
    <Datagrid rowClick="show">
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
      <TextInput source="last_name" />
      <TextInput source="occupation" />
      <NumberInput source="monthly_income" />
      <DateInput source="date_of_birth" />
      {/* <ReferenceInput
        label="Reference"
        source="reference"
        reference="customers"
        filterToQuery={(searchText) => ({ first_name: searchText })}
      >
        <AutocompleteInput
          optionText={<CustomerSelectRenderer />}
          inputText={(record) =>
            `${record.first_name} ${record.last_name ?? ""}`
          }
          matchSuggestion={(filterValue, record) => true}
        />
      </ReferenceInput> */}
      <CustomerReferenceInput />
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
      <CustomerReferenceInput />
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
      <RefererDetail />
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
