import React from "react";
import {
  linkToRecord,
  List,
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
  FunctionField,
  TopToolbar,
  EditButton,
} from "react-admin";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import { Box, Paper } from "@material-ui/core";
import { ShowSplitter, GridShowLayout, RaGrid, RaBox } from "ra-compact-ui";
import get from "lodash/get";
import { Link, useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Resources } from "../../constants/resources";
import { CustomerReferenceInput, CustomerShortDetail } from "./components";
import {
  ListActions,
  listExtraProps,
  EditActions,
  CardList,
  Label,
} from "../../Commons";

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
    <Box px={2}>
      <CardList
        linkType="show"
        title={
          <FunctionField
            render={(record) => {
              return `${get(record, "first_name")} ${get(
                record,
                "last_name",
                ""
              )}`;
            }}
            variant="h6"
          />
        }
        subHeader={<TextField source="occupation" />}
      >
        <RaGrid container spacing={1}>
          <RaGrid item xs={6} sm={6}>
            <Label label="id">
              <TextField source="id" />
            </Label>
          </RaGrid>
          <RaGrid item xs={6} sm={6}>
            <Label label="Referrer">
              <CustomerShortDetail path="referer_details" />
            </Label>
          </RaGrid>
        </RaGrid>
      </CardList>
    </Box>
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

const useStyles = makeStyles((theme) => ({
  toolbar: {
    alignItems: "center",
  },
}));

export const ShowActions = ({ basePath, data, resource, children }) => {
  const classes = useStyles();
  return (
    <TopToolbar className={classes.toolbar}>
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
};

export const CustomerShow = (props) => {
  const history = useHistory();

  const shortTermLoans = (
    <ArrayField source="short_term_loans" label={""}>
      <CardList
        rowClick={(id, path, record) => {
          const linkToLoan = linkToRecord(
            `/${Resources.shortTermLoans}`,
            record?.id,
            "show"
          );
          history.push(linkToLoan);
        }}
        title={
          <RaBox display="inline-flex">
            <DateField source="date" variant="h6" />
            <Divider orientation="vertical" flexItem variant="middle" />
            <TextField source="principal_amount" variant="h6" />
          </RaBox>
        }
        subHeader={
          <RaBox display="inline-flex" ml={1}>
            <TextField source="duration" />
            <TextField source="si_frequency.frequency" label="Frequency" />
          </RaBox>
        }
      >
        <RaGrid container spacing={1}>
          <RaGrid item xs={6} sm={6}>
            <Label label="Total">
              <TextField source="total" />
            </Label>
          </RaGrid>
          <RaGrid item xs={6} sm={6}>
            <Label label="Installment">
              <TextField source="installment_amount" />
            </Label>
          </RaGrid>
          <RaGrid item xs={6} sm={6}>
            <Label label="Balance">
              <TextField
                source="view_status.recievable_amount"
                label="Balance"
              />
            </Label>
          </RaGrid>
          <RaGrid item xs={6} sm={6}>
            <Label label="Balance (till date)">
              <FunctionField
                render={(record) =>
                  get(record, "view_status.expected_repayment_amount") -
                  get(record, "view_status.total_repayed_amount")
                }
              />
            </Label>
          </RaGrid>
        </RaGrid>
      </CardList>
    </ArrayField>
  );

  const longTermLoans = (
    <ArrayField label={""} source="long_term_loans">
      <CardList
        rowClick={(id, path, record) => {
          const linkToLoan = linkToRecord(
            `/${Resources.longTermLoans}`,
            record?.id,
            "show"
          );
          history.push(linkToLoan);
        }}
        title={
          <RaBox display="inline-flex">
            <DateField source="date" variant="h6" />
            <Divider orientation="vertical" flexItem variant="middle" />
            <NumberField source="principal_amount" variant="h6" />
          </RaBox>
        }
      >
        <RaGrid container spacing={1}>
          <RaGrid item xs={6} sm={6}>
            <Label label="SI">
              <TextField source="si_frequency.si" />
            </Label>
          </RaGrid>
          <RaGrid item xs={6} sm={6}>
            <Label label="Frequency">
              <TextField source="si_frequency.frequency" />
            </Label>
          </RaGrid>
          <RaGrid item xs={6} sm={6}>
            <Label label="Principal (till date)">
              <NumberField source="view_status.principal_amount_left" />
            </Label>
          </RaGrid>
          <RaGrid item xs={6} sm={6}>
            <Label label="Amount">
              <NumberField source="view_status.new_amount" />
            </Label>
          </RaGrid>
        </RaGrid>
      </CardList>
    </ArrayField>
  );

  const creditLineInfo = (
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
    </RaGrid>
  );

  return (
    <Show {...props} component="div" actions={<ShowActions />}>
      <Box p={2}>
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
          rightSide={
            <>
              <RaBox mb={4}>
                <Paper>
                  <GridShowLayout>
                    <Typography variant="h6">Credit Line</Typography>
                    {creditLineInfo}
                  </GridShowLayout>
                </Paper>
              </RaBox>
              <RaBox mb={4}>
                <Typography variant="h6">Short term loans</Typography>
                {shortTermLoans}
              </RaBox>
              <RaBox pb={4}>
                <Typography variant="h6">Long term loans</Typography>
                {longTermLoans}
              </RaBox>
            </>
          }
          rightSideProps={{
            md: 8,
            xs: 12,
            component: "div",
          }}
          leftSideProps={{
            md: 4,
            xs: 12,
          }}
        />
      </Box>
    </Show>
  );
};
