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
  NumberInput,
  NumberField,
  DateField,
  ArrayField,
  TabbedShowLayout,
  Tab,
} from "react-admin";
import { ShowSplitter, GridShowLayout, RaGrid } from "ra-compact-ui";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { Resources } from "../../constants/resources";
import { useMediaQuery } from "@material-ui/core";

import { CustomerReferenceInput, CustomerShortDetail } from "./components";
import { ListActions, listExtraProps, EditActions } from "../../Commons";

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
  <Edit {...props} actions={<EditActions />} mutationMode="pessimistic">
    <SimpleForm redirect="show">
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
  <Create {...props} mutationMode="pessimistic">
    <SimpleForm redirect="show">
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

const LongTermLoanLink = (props) => {
  const loan = useRecordContext(props);
  const linkToLoan = linkToRecord(
    `/${Resources.longTermLoans}`,
    loan?.id,
    "show"
  );

  return <Link to={linkToLoan}>{loan.id}</Link>;
};

export const CustomerShow = (props) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  console.log(isMobile);

  const shortTermLoans = (
    <ArrayField source="short_term_loans">
      <Datagrid>
        <DateField source="date" />
        <TextField source="principal_amount" />
        <TextField source="total" />
        <TextField source="duration" />
        <TextField source="installment_amount" />
        <TextField source="status" />
        <TextField source="si_frequency.frequency" />
        <TextField source="si_frequency.si" />
        <ShortTermLoanLink />
      </Datagrid>
    </ArrayField>
  );

  const longTermLoans = (
    <ArrayField source="long_term_loans">
      <Datagrid>
        <DateField source="date" />
        <NumberField source="principal_amount" />
        <NumberField source="period_interest_amount" />
        <TextField source="si_frequency.frequency" />
        <TextField source="si_frequency.si" />
        {/* <TextField source="status" /> */}
        <LongTermLoanLink />
      </Datagrid>
    </ArrayField>
  );

  const creditLineInfo = (
    <GridShowLayout>
      <RaGrid container spacing={1}>
        <RaGrid item xs={4} sm={4}>
          <TextField
            source="credit_line.number_of_open_loans"
            label="Nu of open loans"
          />
        </RaGrid>
        <RaGrid item xs={4} sm={4}>
          <TextField
            source="credit_line.number_of_closed_loans"
            label="Nu of closed loans"
          />
        </RaGrid>
        <RaGrid item xs={4} sm={4}>
          <TextField
            source="credit_line.number_of_error_loans"
            label="Nu of error loans"
          />
        </RaGrid>
        <RaGrid item xs={4} sm={4}>
          <NumberField
            source="credit_line.open_loan_amount_principal"
            label="Open principal"
          />
        </RaGrid>
        <RaGrid item xs={4} sm={4}>
          <NumberField
            source="credit_line.open_loan_amount"
            label="Open total amount"
          />
        </RaGrid>
        <RaGrid item xs={4} sm={4}>
          <NumberField
            source="credit_line.expected_repayment_amount"
            label="Expected repayment amount"
          />
        </RaGrid>
        <RaGrid item xs={4} sm={4}>
          <NumberField
            source="credit_line.total_repayed_amount"
            label="Repayment amount"
          />
        </RaGrid>
        <RaGrid item xs={4} sm={4}>
          <NumberField
            source="credit_line.long_term_amount"
            label="Long term amount"
          />
        </RaGrid>
        <RaGrid item xs={4} sm={4}>
          <DateField
            source="credit_line.last_repayment_date"
            options={{
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            }}
            label="Last repayment date"
          />
        </RaGrid>
        <RaGrid item xs={4} sm={4}>
          <NumberField source="credit_line.exposure" label="Exposure" />
        </RaGrid>
        <RaGrid item xs={4} sm={4}>
          <NumberField
            source="credit_line.short_term_repayment_shortfall"
            label="Shortfall short term (%)"
          />
        </RaGrid>
      </RaGrid>
    </GridShowLayout>
  );

  let rightSide;
  if (isMobile) {
    rightSide = (
      <>
        <GridShowLayout>
          <Typography variant="h6">Credit Line</Typography>
          {creditLineInfo}
        </GridShowLayout>
        <GridShowLayout>
          <Typography variant="h6">Credit Line</Typography>
          {shortTermLoans}
          <Typography variant="h6">Credit Line</Typography>
          {longTermLoans}
        </GridShowLayout>
      </>
    );
  } else {
    rightSide = (
      <TabbedShowLayout>
        <Tab label="Credit Line">{creditLineInfo}</Tab>
        <Tab label="Short Term Loans" path="short_term_loans">
          {shortTermLoans}
        </Tab>
        <Tab label="Long term loans" path="long_term_loans">
          {longTermLoans}
        </Tab>
      </TabbedShowLayout>
    );
  }

  return (
    <Show {...props} component="div">
      <ShowSplitter
        leftSide={
          <GridShowLayout>
            <Typography variant="h6">Basic details</Typography>
            <RaGrid container spacing={1}>
              <RaGrid item xs={12}>
                <TextField source="id" />
              </RaGrid>
              <RaGrid item xs={6}>
                <TextField source="first_name" />
              </RaGrid>
              <RaGrid item xs={6}>
                <TextField source="last_name" />
              </RaGrid>
              <RaGrid item xs={6}>
                <TextField source="occupation" />
              </RaGrid>
              <RaGrid item xs={6}>
                <NumberField source="monthly_income" />
              </RaGrid>
              <RaGrid item xs={12}>
                <DateField
                  source="date_of_birth"
                  options={{
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }}
                />
              </RaGrid>
              <RaGrid item xs={6}>
                <CustomerShortDetail path="referrer_details" />
              </RaGrid>
            </RaGrid>
          </GridShowLayout>
        }
        rightSide={rightSide}
      />
    </Show>
  );
};
