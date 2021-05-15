import React, { useEffect, useState } from "react";
import {
  useDataProvider,
  FormDataConsumer,
  linkToRecord,
  ReferenceInput,
  AutocompleteInput,
} from "react-admin";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { Resources } from "../../constants/resources";
import { StopEventPropagation } from "../../Commons";

export function LongTermDetailsCalculated() {
  const dataProvider = useDataProvider();
  const [siConstants, setSiConstants] = useState([]);

  useEffect(() => {
    dataProvider.getList(Resources.siFrequency, {}).then(({ data }) => {
      setSiConstants(data);
    });
  }, [dataProvider]);

  return (
    <FormDataConsumer>
      {({ formData, ...rest }) => {
        let total;
        const selectedSi = siConstants.find(
          (el) => el.id === formData.si_frequency_id
        );
        if (formData?.principal_amount && selectedSi?.si) {
          total = (formData.principal_amount * selectedSi?.si) / 100;
        }

        return (
          <Box mb={1}>
            <Box>
              <InputLabel>Calculated</InputLabel>
            </Box>
            <Box mt={0.5}>SI - {selectedSi?.si}</Box>
            <Box mt={1} style={{ fontWeight: 500, fontSize: "18px" }}>
              Installment - {total && Math.ceil(total)}
            </Box>
          </Box>
        );
      }}
    </FormDataConsumer>
  );
}

export function LongTermLoanReadOnly(props) {
  const { record } = props;
  const linkToLoan = linkToRecord(
    `/${Resources.longTermLoans}`,
    record.long_term_loan?.id,
    "show"
  );
  return (
    <Box mb={1}>
      <StopEventPropagation>
        <Link to={linkToLoan}>
          <Box>
            {record.long_term_loan?.customer?.first_name}{" "}
            {record.long_term_loan?.customer?.last_name ?? ""}
          </Box>
          <Box style={{ whiteSpace: "nowrap" }}>
            {record.long_term_loan?.date} |{" "}
            {record.long_term_loan?.principal_amount} |{" "}
            {record.long_term_loan?.si_frequency.frequency} |{" "}
            {record.long_term_loan?.period_interest_amount}
          </Box>
        </Link>
      </StopEventPropagation>
    </Box>
  );
}

const useStyles = makeStyles(() => ({
  largeInput: {
    width: "40%",
  },
}));

export const LongTermSelectRenderer = ({ record }) => {
  return (
    <Box>
      <Box>
        {record.customer?.first_name} {record.customer?.last_name ?? ""}
      </Box>
      <Box>
        {record.date} | {record.principal_amount} |{" "}
        {record.si_frequency.frequency} | {record.period_interest_amount}
      </Box>
    </Box>
  );
};

export const LongTermLoanReferenceInput = (props) => {
  const classes = useStyles();
  const { source, label } = props;
  return (
    <ReferenceInput
      label={label}
      source={source}
      reference={Resources.longTermLoans}
      filterToQuery={(searchText) => ({
        customer: {
          format: "hasura-raw-query",
          value: { first_name: { _ilike: `%${searchText}%` } },
        },
      })}
    >
      <AutocompleteInput
        optionText={<LongTermSelectRenderer />}
        inputText={(record) => {
          return `${record.customer?.first_name} ${
            record.customer?.last_name ?? ""
          } | ${record.date} | ${record.principal_amount} - ${
            record.si_frequency.frequency
          } | ${record.period_interest_amount}`;
        }}
        matchSuggestion={(filterValue, record) => true}
        options={{
          classes: { root: classes.largeInput },
        }}
      />
    </ReferenceInput>
  );
};
