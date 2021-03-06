import React, { useEffect, useState } from "react";
import {
  ReferenceInput,
  useDataProvider,
  FormDataConsumer,
  AutocompleteInput,
  linkToRecord,
} from "react-admin";

import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import { Resources } from "../../constants/resources";
import { Link } from "react-router-dom";

import { StopEventPropagation } from "../../Commons";

export const SISelectRenderer = ({ record }) => {
  return (
    <Box>
      <Box>
        {record.first_name} {record.last_name ?? ""}
      </Box>
      <Box>({record.occupation})</Box>
    </Box>
  );
};

export const DetailsCalculated = (props) => {
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
          total =
            formData.principal_amount *
            (1 + formData.duration * selectedSi?.si);
        }

        return (
          <Box mb={1}>
            <Box>
              <InputLabel>Calculated</InputLabel>
            </Box>
            <Box mt={0.5}>SI - {selectedSi?.si}</Box>
            <Box mt={0.5}>
              Installment -{" "}
              {total &&
                formData.duration &&
                Math.ceil(total / formData.duration)}
            </Box>
            <Box mt={1} style={{ fontWeight: 500, fontSize: "18px" }}>
              Total - {total && Math.ceil(total)}
            </Box>
          </Box>
        );
      }}
    </FormDataConsumer>
  );
};

export const ShortTermSelectRenderer = ({ record }) => {
  return (
    <Box>
      <Box>
        {record.customer?.first_name} {record.customer?.last_name ?? ""}
      </Box>
      <Box>
        {record.date} | {record.total} | {record.si_frequency.frequency}
      </Box>
    </Box>
  );
};

const useStyles = makeStyles(() => ({
  largeInput: {
    width: "40%",
  },
}));

export const ShortTermLoanReferenceInput = (props) => {
  const classes = useStyles();
  const { source, label } = props;
  return (
    <ReferenceInput
      label={label}
      source={source}
      reference={Resources.shortTermLoans}
      filterToQuery={(searchText) => ({
        customer: {
          format: "hasura-raw-query",
          value: { first_name: { _ilike: `%${searchText}%` } },
        },
      })}
    >
      <AutocompleteInput
        optionText={<ShortTermSelectRenderer />}
        inputText={(record) => {
          return `${record.customer?.first_name} ${
            record.customer?.last_name ?? ""
          } | ${record.date} | ${record.total} | ${
            record.si_frequency.frequency
          }`;
        }}
        matchSuggestion={(filterValue, record) => true}
        options={{
          classes: { root: classes.largeInput },
        }}
      />
    </ReferenceInput>
  );
};

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
          <Box style={{ whiteSpace: "nowrap" }}>
            {record.short_term_loan?.date} | {record.short_term_loan?.total} |{" "}
            {record.short_term_loan?.si_frequency.frequency}
          </Box>
        </Link>
      </StopEventPropagation>
    </Box>
  );
};
