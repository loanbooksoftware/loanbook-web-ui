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
  SimpleShowLayout,
  NumberInput,
  NumberField,
  DateField,
  ArrayField,
  SelectInput,
  EditButton,
  Link,
  TabbedShowLayout,
  Tab,
} from "react-admin";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import { Resources } from "../../constants/resources";
import {
  CustomerShortDetail,
  CustomerReferenceInput,
} from "../Customers/components";

import FilterResourceList from "../../RaExtensions/FilterResourceList";

import {
  ListActions,
  listExtraProps,
  EditActions,
  CustomerReadOnly,
} from "../../Commons";
import { LongTermDetailsCalculated } from "./components";

const ShortTermLoanListFilter = (props) => (
  <Filter {...props}>
    <NumberInput source="customer_id" label="Customer id" alwaysOn />
  </Filter>
);

export const LongTermLoanList = (props) => (
  <List
    {...props}
    {...listExtraProps}
    filters={<ShortTermLoanListFilter />}
    actions={
      <ListActions>
        <CreateButton
          basePath={`/${Resources.longTermRepayments}`}
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
      <NumberField source="period_interest_amount" />
      <TextField label="frequency" source="si_frequency.frequency" />
      <TextField label="SI" source="si_frequency.si" />
    </Datagrid>
  </List>
);

export const LongTermLoanEdit = (props) => {
  const transform = (data) => {
    const dataClone = { ...data };
    delete dataClone.customer;
    delete dataClone.si_frequency;
    delete dataClone.view_status;
    delete dataClone.long_term_repayments;
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
          <SelectInput optionText="frequency" />
        </ReferenceInput>
        <Divider style={{ margin: "20px 0px" }} />
        <LongTermDetailsCalculated />
        {/* <NumberInput source="period_interest_amount" /> */}
        <TextInput source="status" />
      </SimpleForm>
    </Edit>
  );
};

export const LongTermLoanCreate = (props) => {
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
          <SelectInput optionText="frequency" />
        </ReferenceInput>
        <Divider style={{ margin: "20px 0px" }} />
        <LongTermDetailsCalculated />
        <NumberInput source="period_interest_amount" />
      </SimpleForm>
    </Create>
  );
};

const LongTermRepaymentEditButton = ({ record }) => {
  return (
    <EditButton
      basePath={`/${Resources.longTermRepayments}/${record.id}`}
      record={record}
    />
  );
};

export const ShowActions = ({ basePath, data, resource, children }) => (
  <TopToolbar>
    <Button
      component={Link}
      to={{
        pathname: `/${Resources.longTermRepayments}/create`,
        search: `?source=${JSON.stringify({
          long_term_loan_id: data?.id,
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

export const LongTermLoanShow = (props) => (
  <Show {...props} actions={<ShowActions />}>
    <SimpleShowLayout>
      <TextField source="id" />
      <CustomerShortDetail path="customer" label="Customer" />
      <DateField
        source="date"
        options={{
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }}
      />
      <NumberField source="principal_amount" />
      <TextField label="frequency" source="si_frequency.frequency" />
      <TextField label="SI" source="si_frequency.si" />
      <Divider style={{ margin: "20px 0px" }} />
      <NumberField source="period_interest_amount" />
      <Divider style={{ margin: "20px 0px" }} />
      <Box mb={1} style={{ fontSize: "20px", fontWeight: 500 }}>
        Repayments
      </Box>
      <TextField
        source="view_status.long_term_repayments_interest"
        label="Total interest payment"
      />
      <TextField
        source="view_status.long_term_repayments_principal"
        label="Total principal payment"
      />
      <TextField source="view_status.new_amount" label="New interest amount" />
      <TextField source="view_status.principal_amount_left" label="Principal" />
      <TabbedShowLayout>
        <Tab label="Interest Payments">
          <ArrayField label="" source="long_term_repayments">
            <FilterResourceList filter={(el) => el.type === "INTEREST"}>
              <Datagrid>
                <DateField label="Installment Date" source="date" />
                <NumberField source="amount" />
                <TextField source="type" />
                {/* <ShortTermRepaymentEditButton /> */}
              </Datagrid>
            </FilterResourceList>
          </ArrayField>
        </Tab>
        <Tab label="Principal Payments" path="principal_payments">
          <ArrayField label="" source="long_term_repayments">
            <FilterResourceList filter={(el) => el.type === "PRINCIPAL"}>
              <Datagrid>
                <DateField label="Installment Date" source="date" />
                <NumberField source="amount" />
                <TextField source="type" />
                {/* <ShortTermRepaymentEditButton /> */}
              </Datagrid>
            </FilterResourceList>
          </ArrayField>
        </Tab>
      </TabbedShowLayout>

      {/* <NumberField
        label="Interest Installments"
        source="long_term_repayments_aggregate.aggregate.count"
      />
      <NumberField
        label="Principal Installments"
        source="long_term_repayments_aggregate.aggregate.count"
      />
      <NumberField
        label="Amount"
        source="short_term_repayments_aggregate.aggregate.sum.amount"
      />
      <DateField
        label="last payment date"
        source="short_term_repayments_aggregate.aggregate.max.date"
        options={{
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }}
      /> */}
      {/* <ArrayField label="Repayments" source="short_term_repayments">
        <Datagrid>
          <DateField label="Added on" source="date" />
          <DateField label="Installment Date" source="installment_date" />
          <NumberField source="amount" />
          <LongTermRepaymentEditButton />
        </Datagrid>
      </ArrayField> */}
    </SimpleShowLayout>
  </Show>
);
