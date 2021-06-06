import React from "react";
import {
  List,
  Datagrid,
  TextField,
  TopToolbar,
  CreateButton,
  Filter,
  Create,
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  ReferenceInput,
  Show,
  NumberInput,
  NumberField,
  DateField,
  ArrayField,
  SelectInput,
  EditButton,
  Link,
  FunctionField,
} from "react-admin";
import get from "lodash/get";
import { ShowSplitter, GridShowLayout, RaGrid } from "ra-compact-ui";
import Typography from "@material-ui/core/Typography";

import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import { Resources } from "../../constants/resources";
import {
  CustomerShortDetail,
  CustomerReferenceInput,
} from "../Customers/components";

import {
  ListActions,
  listExtraProps,
  EditActions,
  CustomerReadOnly,
} from "../../Commons";
import { DetailsCalculated } from "./components";

const ShortTermLoanListFilter = (props) => (
  <Filter {...props}>
    <NumberInput source="customer_id" label="Customer id" alwaysOn />
  </Filter>
);

export const ShortTermLoanList = (props) => (
  <List
    {...props}
    {...listExtraProps}
    filters={<ShortTermLoanListFilter />}
    actions={
      <ListActions>
        <CreateButton
          basePath={`/${Resources.shortTermRepayments}`}
          label="Repayment"
        />
      </ListActions>
    }
  >
    <Datagrid rowClick="show">
      <TextField source="id" />
      <CustomerShortDetail path="customer" label="Customer" />
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

export const ShortTermLoanEdit = (props) => {
  const transform = (data) => {
    const dataClone = { ...data };
    delete dataClone.customer;
    delete dataClone.si_frequency;
    delete dataClone.short_term_repayments_aggregate;
    delete dataClone.short_term_repayments;
    return dataClone;
  };

  return (
    <Edit
      {...props}
      transform={transform}
      actions={<EditActions />}
      mutationMode="pessimistic"
    >
      <SimpleForm redirect="show">
        <CustomerReadOnly />
        <DateInput source="date" />
        <NumberInput source="principal_amount" />
        <ReferenceInput
          source="si_frequency_id"
          reference={Resources.siFrequency}
        >
          <SelectInput optionText="name" />
        </ReferenceInput>
        <NumberInput source="duration" />
        <Divider style={{ margin: "20px 0px" }} />
        <DetailsCalculated />
        <NumberInput source="total" />
        <TextInput source="status" />
      </SimpleForm>
    </Edit>
  );
};

export const ShortTermLoanCreate = (props) => {
  return (
    <Create {...props} mutationMode={"pessimistic"}>
      <SimpleForm redirect="show">
        <CustomerReferenceInput label="Customer" source="customer_id" />
        <DateInput source="date" defaultValue={Date.now()} />
        <NumberInput source="principal_amount" />
        <ReferenceInput
          source="si_frequency_id"
          reference={Resources.siFrequency}
        >
          <SelectInput optionText="name" />
        </ReferenceInput>
        <NumberInput source="duration" />
        <Divider style={{ margin: "20px 0px" }} />
        <DetailsCalculated />
        <NumberInput source="total" />
      </SimpleForm>
    </Create>
  );
};

const ShortTermRepaymentEditButton = ({ record }) => {
  return (
    <EditButton
      basePath={`/${Resources.shortTermRepayments}/${record.id}`}
      record={record}
    />
  );
};

export const ShowActions = ({ basePath, data, resource, children }) => (
  <TopToolbar>
    <Button
      component={Link}
      to={{
        pathname: `/${Resources.shortTermRepayments}/create`,
        search: `?source=${JSON.stringify({
          short_term_loan_id: data?.id,
        })}`,
      }}
      size="small"
      color="primary"
    >
      <AddIcon />
      Add repayments
    </Button>
    <EditButton basePath={basePath} record={data} />
  </TopToolbar>
);

export const ShortTermLoanShow = (props) => {
  const leftSide = (
    <GridShowLayout>
      <Typography variant="h6">Details</Typography>
      <RaGrid container spacing={1}>
        <RaGrid item xs={6}>
          <CustomerShortDetail path="customer" label="Customer" />
        </RaGrid>
        <RaGrid item xs={6}>
          <TextField source="id" />
        </RaGrid>
        <RaGrid item xs={6}>
          <DateField
            source="date"
            options={{
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            }}
          />
        </RaGrid>
        <RaGrid item xs={6}>
          <NumberField source="principal_amount" />
        </RaGrid>
        <RaGrid item xs={6}>
          <TextField label="frequency" source="si_frequency.frequency" />
        </RaGrid>
        <RaGrid item xs={2}>
          <TextField label="SI" source="si_frequency.si" />
        </RaGrid>
        <RaGrid item xs={2}>
          <NumberField source="duration" />
        </RaGrid>
        <RaGrid item xs={6}>
          <NumberField source="total" />
        </RaGrid>
        <RaGrid item xs={6}>
          <NumberField source="installment_amount" />
        </RaGrid>
        <RaGrid item xs={12}>
          <Divider style={{ margin: "20px 0px" }} />
        </RaGrid>
        <RaGrid item xs={12}>
          <Box style={{ fontSize: "16px", fontWeight: 500 }}>Balance</Box>
        </RaGrid>
        <RaGrid item xs={6}>
          <TextField source="view_status.recievable_amount" label="Balance" />
        </RaGrid>
        <RaGrid item xs={6}>
          <FunctionField
            label="Balance (till date)"
            render={(record) =>
              get(record, "view_status.expected_repayment_amount") -
              get(record, "view_status.total_repayed_amount")
            }
          />
        </RaGrid>
        <RaGrid item xs={6}>
          <TextField source="status" />
        </RaGrid>
        <RaGrid item xs={12}>
          <Divider style={{ margin: "20px 0px" }} />
        </RaGrid>
        <RaGrid item xs={12}>
          <Box style={{ fontSize: "16px", fontWeight: 500 }}>Repayments</Box>
        </RaGrid>
        <RaGrid item xs={6}>
          <NumberField
            label="Installments"
            source="short_term_repayments_aggregate.aggregate.count"
          />
        </RaGrid>
        <RaGrid item xs={6}>
          <NumberField
            label="Amount"
            source="view_status.total_repayed_amount"
          />
        </RaGrid>
        <RaGrid item xs={12}>
          <DateField
            label="last payment date"
            source="view_status.last_repayment_date"
            options={{
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            }}
          />
        </RaGrid>
      </RaGrid>
    </GridShowLayout>
  );

  const rightSide = (
    <GridShowLayout>
      <Typography variant="h6">Repayments</Typography>
      <RaGrid item xs={12}>
        <ArrayField label="" source="short_term_repayments">
          <Datagrid>
            <DateField label="Added on" source="date" />
            <DateField label="Installment Date" source="installment_date" />
            <NumberField source="amount" />
            <ShortTermRepaymentEditButton />
          </Datagrid>
        </ArrayField>
      </RaGrid>
    </GridShowLayout>
  );

  return (
    <Show {...props} component="div" actions={<ShowActions />}>
      <ShowSplitter leftSide={leftSide} rightSide={rightSide} />
    </Show>
  );
};
