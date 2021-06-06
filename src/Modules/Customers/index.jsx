import React from "react";
import {
  linkToRecord,
  // useRecordContext,
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
  FunctionField,
  TopToolbar,
  EditButton,
} from "react-admin";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import { ShowSplitter, GridShowLayout, RaGrid, RaBox } from "ra-compact-ui";
import get from "lodash/get";
import { Link, useHistory } from "react-router-dom";
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

// const ShortTermLoanLink = (props) => {
//   const loan = useRecordContext(props);
//   const linkToLoan = linkToRecord(
//     `/${Resources.shortTermLoans}`,
//     loan?.id,
//     "show"
//   );

//   return <Link to={linkToLoan}>{loan.id}</Link>;
// };

// const LongTermLoanLink = (props) => {
//   const loan = useRecordContext(props);
//   const linkToLoan = linkToRecord(
//     `/${Resources.longTermLoans}`,
//     loan?.id,
//     "show"
//   );

//   return <Link to={linkToLoan}>{loan.id}</Link>;
// };

export const ShowActions = ({ basePath, data, resource, children }) => (
  <TopToolbar>
    <Button
      component={Link}
      to={{
        pathname: `/${Resources.shortTermLoans}/create`,
        search: `?source=${JSON.stringify({
          customer_id: data?.id,
        })}`,
      }}
      size="small"
      color="primary"
    >
      <AddIcon />
      New short term loan
    </Button>
    <Button
      component={Link}
      to={{
        pathname: `/${Resources.longTermLoans}/create`,
        search: `?source=${JSON.stringify({
          customer_id: data?.id,
        })}`,
      }}
      size="small"
      color="primary"
    >
      <AddIcon />
      New long term loan
    </Button>
    <EditButton basePath={basePath} record={data} />
  </TopToolbar>
);

export const CustomerShow = (props) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const history = useHistory();

  const shortTermLoans = (
    <ArrayField
      source="short_term_loans"
      label={isMobile ? "" : "Short term loans"}
    >
      <Datagrid
        rowClick={(id, path, record) => {
          const linkToLoan = linkToRecord(
            `/${Resources.shortTermLoans}`,
            record?.id,
            "show"
          );
          history.push(linkToLoan);
        }}
      >
        <DateField source="date" />
        <TextField source="principal_amount" />
        <TextField source="total" />
        <TextField source="si_frequency.frequency" label="Frequency" />
        <TextField source="duration" />
        <TextField source="installment_amount" />
        <TextField source="view_status.recievable_amount" label="Balance" />
        <FunctionField
          label="Balance (till date)"
          render={(record) =>
            get(record, "view_status.expected_repayment_amount") -
            get(record, "view_status.total_repayed_amount")
          }
        />
        <TextField source="status" />
      </Datagrid>
    </ArrayField>
  );

  const longTermLoans = (
    <ArrayField
      label={isMobile ? "" : "Long term loans"}
      source="long_term_loans"
    >
      <Datagrid
        rowClick={(id, path, record) => {
          const linkToLoan = linkToRecord(
            `/${Resources.longTermLoans}`,
            record?.id,
            "show"
          );
          history.push(linkToLoan);
        }}
      >
        <DateField source="date" />
        <NumberField source="principal_amount" label="Principal" />
        <TextField source="si_frequency.si" label="Si" />
        <NumberField
          source="view_status.principal_amount_left"
          label="Principal (till date)"
        />
        <TextField source="si_frequency.frequency" label="Frequency" />
        <NumberField source="view_status.new_amount" label="Amount" />
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
          <NumberField
            source="credit_line.open_loan_amount_principal"
            label="Principal"
          />
        </RaGrid>
        <RaGrid item xs={4} sm={4}>
          <NumberField source="credit_line.open_loan_amount" label="Total" />
        </RaGrid>
        <RaGrid item xs={4} sm={4}>
          <NumberField
            source="credit_line.expected_repayment_amount"
            label="Expected repayment (till date)"
          />
        </RaGrid>
        <RaGrid item xs={4} sm={4}>
          <NumberField
            source="credit_line.total_repayed_amount"
            label="Repayment (till date)"
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
          <NumberField
            source="credit_line.long_term_amount"
            label="Long term amount"
          />
        </RaGrid>
        <RaGrid item xs={4} sm={4}>
          <FunctionField
            label="Balance (till date)"
            render={(record) =>
              get(record, "credit_line.expected_repayment_amount") -
              get(record, "credit_line.total_repayed_amount")
            }
          />
        </RaGrid>
        <RaGrid item xs={4} sm={4}>
          <FunctionField
            label="Balance (all time)"
            render={(record) =>
              get(record, "credit_line.open_loan_amount") -
              get(record, "credit_line.total_repayed_amount")
            }
          />
        </RaGrid>

        {/* <RaGrid item xs={4} sm={4}>
          <NumberField source="credit_line.exposure" label="Exposure" />
        </RaGrid> */}
        {/* <RaGrid item xs={4} sm={4}>
          <NumberField
            source="credit_line.short_term_repayment_shortfall"
            label="Shortfall short term (%)"
          />
        </RaGrid> */}
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
          <RaBox mb={4}>
            <Typography variant="h6">Short term loans</Typography>
            {shortTermLoans}
          </RaBox>
          <RaBox>
            <Typography variant="h6">Long term loans</Typography>
            {longTermLoans}
          </RaBox>
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
    <Show {...props} component="div" actions={<ShowActions />}>
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
