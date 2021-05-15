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
} from "react-admin";
import { makeStyles } from "@material-ui/core/styles";
import ClearButton from "../../Commons";
import { listExtraProps, ListActions } from "../../Commons";
import {
  ShortTermLoanReferenceInput,
  ShortTermLoanReadOnly,
} from "../ShortTermLoans/components";

const useStyles = makeStyles({
  toolbar: {
    display: "flex",
    "& button": {
      marginRight: "8px",
    },
  },
});

export const ShortTermRepaymentList = (props) => (
  <List {...props} {...listExtraProps} actions={<ListActions />}>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <ShortTermLoanReadOnly label="Loan" />
      <DateField source="date" />
      <DateField source="installment_date" />
      <NumberField source="amount" />
    </Datagrid>
  </List>
);

// const redirect = (basePath, id, data) => `${basePath}/create`;

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

export const ShortTermRepaymentCreate = (props) => {
  const classes = useStyles();
  return (
    <Create {...props} mutationMode={"pessimistic"}>
      <SimpleForm
        redirect="show"
        toolbar={<PostCreateToolbar classes={{ toolbar: classes.toolbar }} />}
      >
        <ShortTermLoanReferenceInput
          source="short_term_loan_id"
          label="Short term loan"
        />
        <DateInput
          label="Collection date"
          source="date"
          defaultValue={Date.now()}
        />
        <DateInput source="installment_date" defaultValue={Date.now()} />
        <NumberInput source="amount" />
      </SimpleForm>
    </Create>
  );
};

export const ShortTermRepaymentEdit = (props) => {
  const transform = (data) => {
    const dataClone = { ...data };
    delete dataClone.short_term_loan;
    return dataClone;
  };

  return (
    <Edit {...props} transform={transform} mutationMode="pessimistic">
      <SimpleForm redirect="show">
        <ShortTermLoanReferenceInput
          source="short_term_loan_id"
          label="Short term loan"
        />
        <DateInput label="Collection date" source="date" />
        <DateInput source="installment_date" />
        <NumberInput source="amount" />
      </SimpleForm>
    </Edit>
  );
};

export const ShortTermRepaymentShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <ShortTermLoanReadOnly />
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
      <DateField
        source="installment_date"
        options={{
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }}
      />
      <NumberField source="amount" />
    </SimpleShowLayout>
  </Show>
);
