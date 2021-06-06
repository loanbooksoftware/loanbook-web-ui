import React from "react";
import {
  TextField,
  Create,
  Edit,
  SimpleForm,
  DateInput,
  Show,
  SimpleShowLayout,
  NumberInput,
  NumberField,
  DateField,
  List,
  Datagrid,
  Toolbar,
  SaveButton,
  SelectField,
  RadioButtonGroupInput,
} from "react-admin";
import { makeStyles } from "@material-ui/core/styles";
import ClearButton from "../../Commons";
import { listExtraProps, ListActions } from "../../Commons";
import {
  LongTermLoanReferenceInput,
  LongTermLoanReadOnly,
} from "../LongTermLoans/components";

import { longTermRepaymentTypes } from "../../constants";

const useStyles = makeStyles({
  toolbar: {
    display: "flex",
    "& button": {
      marginRight: "8px",
    },
  },
});

const longTermRepaymentOptions = [
  { id: longTermRepaymentTypes.PRINCIPAL, name: "Principal" },
  { id: longTermRepaymentTypes.INTEREST, name: "Interest" },
];

export const LongTermRepaymentList = (props) => (
  <List {...props} {...listExtraProps} actions={<ListActions />}>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <LongTermLoanReadOnly label="Loan" />
      <DateField source="date" />
      <DateField source="installment_date" />
      <SelectField source="type" choices={longTermRepaymentOptions} />
    </Datagrid>
  </List>
);

const PostCreateToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton label="Save and add" redirect={false} submitOnEnter={false} />
    <SaveButton
      label="Save and show"
      redirect="show"
      submitOnEnter={true}
      variant="outlined"
    />
    <ClearButton />
  </Toolbar>
);

export const LongTermRepaymentCreate = (props) => {
  const classes = useStyles();
  return (
    <Create {...props} mutationMode={"pessimistic"}>
      <SimpleForm
        redirect="show"
        toolbar={<PostCreateToolbar classes={{ toolbar: classes.toolbar }} />}
      >
        <LongTermLoanReferenceInput
          source="long_term_loan_id"
          label="Long term loan"
        />
        <DateInput
          label="Collection date"
          source="date"
          defaultValue={Date.now()}
        />
        <NumberInput source="amount" />
        <RadioButtonGroupInput
          source="type"
          choices={longTermRepaymentOptions}
        />
      </SimpleForm>
    </Create>
  );
};

export const LongTermRepaymentEdit = (props) => {
  const transform = (data) => {
    const dataClone = { ...data };
    delete dataClone.long_term_loan;
    return dataClone;
  };

  return (
    <Edit {...props} transform={transform} mutationMode="pessimistic">
      <SimpleForm redirect="show">
        <LongTermLoanReferenceInput
          source="long_term_loan_id"
          label="Long term loan"
        />
        <DateInput label="Collection date" source="date" />
        <NumberInput source="amount" />
        <RadioButtonGroupInput
          source="type"
          choices={longTermRepaymentOptions}
        />
      </SimpleForm>
    </Edit>
  );
};

export const LongTermRepaymentShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <LongTermLoanReadOnly />
      <DateField
        label="Collection date"
        source="date"
        options={{
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }}
      />
      <NumberField source="amount" />
      <SelectField source="type" choices={longTermRepaymentOptions} />
    </SimpleShowLayout>
  </Show>
);
