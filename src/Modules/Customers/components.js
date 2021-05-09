import React from "react";
import {
  linkToRecord,
  useRecordContext,
  ReferenceInput,
  AutocompleteInput,
} from "react-admin";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import { Resources } from "../../constants/resources";

export const RefererDetail = (props) => {
  const customer = useRecordContext(props);
  const linkToCustomer = linkToRecord(
    `/${Resources.customers}`,
    customer.referer_details?.id,
    "show"
  );

  return (
    <Link to={linkToCustomer}>
      {customer?.referer_details?.first_name}{" "}
      {customer?.referer_details?.last_name}
    </Link>
  );
};

RefererDetail.defaultProps = { label: "Referrer", addLabel: true };

export const CustomerSelectRenderer = ({ record }) => {
  return (
    <Box>
      <Box>
        {record.first_name} {record.last_name ?? ""}
      </Box>
      <Box>({record.occupation})</Box>
    </Box>
  );
};

export const CustomerReferenceInput = (props) => (
  <ReferenceInput
    label="Reference"
    source="reference"
    reference="customers"
    filterToQuery={(searchText) => ({ first_name: searchText })}
  >
    <AutocompleteInput
      optionText={<CustomerSelectRenderer />}
      inputText={(record) => `${record.first_name} ${record.last_name ?? ""}`}
      matchSuggestion={(filterValue, record) => true}
    />
  </ReferenceInput>
);
