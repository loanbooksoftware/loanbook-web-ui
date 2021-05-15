import React from "react";
import { TextField, NumberField, List, Datagrid } from "react-admin";
import { listExtraProps, ListActions } from "../../Commons";
import { LongTermLoanReadOnly } from "../LongTermLoans/components";

export const ViewLongTermStatusList = (props) => (
  <List {...props} {...listExtraProps} actions={<ListActions disableCreate />}>
    <Datagrid rowClick={false}>
      <TextField source="id" />
      <LongTermLoanReadOnly label="Loan" />
      <NumberField source="principal_amount" />
      <NumberField source="si" />
      <NumberField source="period_interest_amount" />
      <NumberField source="long_term_repayments_interest" />
      <NumberField source="long_term_repayments_principal" />
      <NumberField source="principal_amount_left" />
      <NumberField source="new_amount" />
    </Datagrid>
  </List>
);
