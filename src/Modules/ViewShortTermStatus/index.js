import React from "react";
import { TextField, NumberField, DateField, List, Datagrid } from "react-admin";
import { listExtraProps, ListActions } from "../../Commons";
import { ShortTermLoanReadOnly } from "../ShortTermLoans/components";

export const ViewShortTermStatusList = (props) => (
  <List {...props} {...listExtraProps} actions={<ListActions disableCreate />}>
    <Datagrid rowClick={false}>
      <TextField source="id" />
      <ShortTermLoanReadOnly label="Loan" />
      {/* <DateField source="date" /> */}
      {/* <NumberField source="principal_amount" /> */}
      {/* <NumberField source="repayment_amount" label="Total" /> */}
      {/* <TextField source="frequency" /> */}
      <NumberField source="recievable_amount" label="Balance" />
      {/* <NumberField source="duration" /> */}
      <NumberField source="total_repayed_amount" />
      <NumberField source="expected_repayment_amount" />
      <NumberField source="repayment_shortfall_in_perc" />
      <DateField source="last_repayment_date" />
      <NumberField source="nu_of_expected_installments" />
      <NumberField source="recieved_installments" />
      <NumberField source="days_since_last_repayment" />
      <TextField source="distress_level" />
      <DateField source="npa_level" />
      {/* <NumberField source="total" /> */}
    </Datagrid>
  </List>
);
