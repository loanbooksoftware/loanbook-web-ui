import React from "react";
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  ReferenceField,
  DateField,
} from "react-admin";

export const ShortTermLoansList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="customer" name="Customer" />
      <DateField source="date" />
      <NumberField source="duration" />
      <NumberField source="installment_amount" />
      <NumberField source="principal_amount" />
      <TextField source="customer.first_name" name="Customer" />
      <TextField source="status" />
      <NumberField source="total" />
    </Datagrid>
  </List>
);
