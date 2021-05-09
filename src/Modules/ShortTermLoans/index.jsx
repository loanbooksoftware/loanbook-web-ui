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

import { ListActions, listExtraProps, EditActions } from "../Commons";
import { CustomerReadOnly, DetailsCalculated } from "./components";

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
      mutationMode={"pessimistic"}
    >
      <SimpleForm>
        <CustomerReadOnly />
        <DateInput source="date" />
        <NumberInput source="principal_amount" />
        <ReferenceInput
          source="si_frequency_id"
          reference={Resources.siFrequency}
        >
          <SelectInput optionText="frequency" />
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
      <SimpleForm>
        <CustomerReferenceInput label="Customer" source="customer_id" />
        <DateInput source="date" defaultValue={Date.now()} />
        <NumberInput source="principal_amount" />
        <ReferenceInput
          source="si_frequency_id"
          reference={Resources.siFrequency}
        >
          <SelectInput optionText="frequency" />
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
          short_term_loan_id: data.id,
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

export const ShortTermLoanShow = (props) => (
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
      <NumberField source="duration" />
      <NumberField source="total" />
      <Divider style={{ margin: "20px 0px" }} />
      <NumberField source="installment_amount" />
      <TextField source="status" />
      <Divider style={{ margin: "20px 0px" }} />
      <Box mb={1} style={{ fontSize: "20px", fontWeight: 500 }}>
        Repayments
      </Box>
      <NumberField
        label="Installments"
        source="short_term_repayments_aggregate.aggregate.count"
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
      />
      <ArrayField label="Repayments" source="short_term_repayments">
        <Datagrid>
          <DateField label="Added on" source="date" />
          <DateField label="Installment Date" source="installment_date" />
          <NumberField source="amount" />
          <ShortTermRepaymentEditButton />
        </Datagrid>
      </ArrayField>
    </SimpleShowLayout>
  </Show>
);
