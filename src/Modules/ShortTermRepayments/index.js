import React from "react";
import {
  linkToRecord,
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
  DeleteButton,
} from "react-admin";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ClearButton from "../Commons";

import { StopEventPropagation, listExtraProps, ListActions } from "../Commons";
import { ShortTermLoanReferenceInput } from "../ShortTermLoans/components";
import { Resources } from "../../constants/resources";

const useStyles = makeStyles({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
});

export const ShortTermLoanReadOnly = (props) => {
  const { record } = props;
  const linkToLoan = linkToRecord(
    `/${Resources.shortTermLoans}`,
    record.short_term_loan?.id,
    "show"
  );
  return (
    <Box mb={1}>
      <StopEventPropagation>
        <Link to={linkToLoan}>
          <Box>
            {record.short_term_loan?.customer?.first_name}{" "}
            {record.short_term_loan?.customer?.last_name ?? ""}
          </Box>
          <Box>
            {record.short_term_loan?.date} | {record.short_term_loan?.total} |{" "}
            {record.short_term_loan?.si_frequency.frequency}
          </Box>
        </Link>
      </StopEventPropagation>
    </Box>
  );
};

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

const redirect = (basePath, id, data) => `${basePath}/create`;

const PostCreateToolbar = (props) => (
  <Toolbar {...props}>
    <Box mr={1}>
      <SaveButton label="Save and add" redirect={false} submitOnEnter={false} />
    </Box>
    <Box mr={1}>
      <SaveButton
        label="Save and show"
        redirect="show"
        submitOnEnter={true}
        variant="outlined"
      />
    </Box>
    <ClearButton />
  </Toolbar>
);

export const ShortTermRepaymentCreate = (props) => {
  return (
    <Create {...props} mutationMode={"pessimistic"}>
      <SimpleForm
        redirect={redirect}
        toolbar={<PostCreateToolbar />}
        classes={useStyles()}
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
  return (
    <Edit {...props}>
      <SimpleForm>
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
