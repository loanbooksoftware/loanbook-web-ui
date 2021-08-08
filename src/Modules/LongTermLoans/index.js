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
import { longTermRepaymentTypes } from "../../constants";

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
          <SelectInput optionText="name" />
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
          <SelectInput optionText="name" />
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
          type: longTermRepaymentTypes.INTEREST,
        })}`,
      }}
      size="small"
      color="primary"
    >
      <AddIcon />
      Add interest repayments
    </Button>
    <Button
      component={Link}
      to={{
        pathname: `/${Resources.longTermRepayments}/create`,
        search: `?source=${JSON.stringify({
          long_term_loan_id: data?.id,
          type: longTermRepaymentTypes.PRINCIPAL,
        })}`,
      }}
      size="small"
      color="primary"
    >
      <AddIcon />
      Add principal repayments
    </Button>
    <EditButton basePath={basePath} record={data} />
  </TopToolbar>
);

export const LongTermLoanShow = (props) => {
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
          <NumberField source="period_interest_amount" />
        </RaGrid>
        <RaGrid item xs={2}>
          <TextField label="SI" source="si_frequency.si" />
        </RaGrid>
        <RaGrid item xs={2}>
          <TextField label="frequency" source="si_frequency.frequency" />
        </RaGrid>
        <RaGrid item xs={12}>
          <Divider style={{ margin: "20px 0px" }} />
        </RaGrid>
        <RaGrid item xs={12}>
          <Box style={{ fontSize: "16px", fontWeight: 500 }}>Balance</Box>
        </RaGrid>
        <RaGrid item xs={6}>
          <TextField
            source="view_status.principal_amount_left"
            label="Principal"
          />
        </RaGrid>
        <RaGrid item xs={6}>
          <TextField
            source="view_status.new_amount"
            label="New interest amount"
          />
        </RaGrid>
        <RaGrid item xs={6}>
          <FunctionField
            label="Balance (till date)"
            render={(record) => {
              const longTermBalances = get(record, "balance_view", []);
              if (longTermBalances.length > 0) {
                return longTermBalances[longTermBalances.length - 1].balance;
              }
              return 0;
            }}
          />
        </RaGrid>
        <RaGrid item xs={12}>
          <Divider style={{ margin: "20px 0px" }} />
        </RaGrid>
        <RaGrid item xs={12}>
          <Box style={{ fontSize: "16px", fontWeight: 500 }}>Repayments</Box>
        </RaGrid>
        <RaGrid item xs={6}>
          <TextField
            source="view_status.long_term_repayments_principal"
            label="Total principal payment"
          />
        </RaGrid>
        <RaGrid item xs={6}>
          <TextField
            source="view_status.long_term_repayments_interest"
            label="Total interest payment"
          />
        </RaGrid>
      </RaGrid>
    </GridShowLayout>
  );
  const rightSide = (
    <GridShowLayout>
      <RaGrid container spacing={1}>
        <RaGrid item xs={12}>
          <Box style={{ fontSize: "16px", fontWeight: 500 }}>
            Principal Repayments
          </Box>
        </RaGrid>
        <RaGrid item xs={12}>
          <ArrayField label="" source="long_term_repayments">
            <FilterResourceList filter={(el) => el.type === "PRINCIPAL"}>
              <Datagrid>
                <DateField label="Installment Date" source="date" />
                <NumberField source="amount" />
                <TextField source="type" />
                <LongTermRepaymentEditButton />
              </Datagrid>
            </FilterResourceList>
          </ArrayField>
        </RaGrid>
        <RaGrid item xs={12}>
          <Divider style={{ margin: "20px 0px" }} />
        </RaGrid>
        <RaGrid item xs={12}>
          <Box style={{ fontSize: "16px", fontWeight: 500 }}>
            Interest Repayments
          </Box>
        </RaGrid>
        <RaGrid item xs={12}>
          <ArrayField label="" source="long_term_repayments">
            <FilterResourceList filter={(el) => el.type === "INTEREST"}>
              <Datagrid>
                <DateField label="Installment Date" source="date" />
                <NumberField source="amount" />
                <TextField source="type" />
                <LongTermRepaymentEditButton />
              </Datagrid>
            </FilterResourceList>
          </ArrayField>
        </RaGrid>
      </RaGrid>
    </GridShowLayout>
  );

  return (
    <Show {...props} component="div" actions={<ShowActions />}>
      <ShowSplitter leftSide={leftSide} rightSide={rightSide} />
    </Show>
  );
};
