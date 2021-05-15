import React from "react";
import {
  useRecordContext,
  ReferenceInput,
  AutocompleteInput,
} from "react-admin";
import Box from "@material-ui/core/Box";

import { Resources } from "../../constants/resources";
import { CustomerShortDetailsRenderer } from "../../Commons";

export const CustomerShortDetail = (props) => {
  const { path } = props;
  const record = useRecordContext(props);
  return <CustomerShortDetailsRenderer record={record} path={path} />;
};

CustomerShortDetail.defaultProps = { label: "Referrer", addLabel: true };

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

export const CustomerReferenceInput = (props) => {
  const { source, label } = props;
  return (
    <ReferenceInput
      label={label}
      source={source}
      reference={Resources.customers}
      filterToQuery={(searchText) => ({ first_name: searchText })}
    >
      <AutocompleteInput
        optionText={<CustomerSelectRenderer />}
        inputText={(record) => `${record.first_name} ${record.last_name ?? ""}`}
        matchSuggestion={(filterValue, record) => true}
      />
    </ReferenceInput>
  );
};
