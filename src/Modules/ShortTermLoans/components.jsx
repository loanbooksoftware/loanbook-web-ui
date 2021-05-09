import React, { useEffect, useState } from "react";
import {
  ReferenceInput,
  SelectInput,
  useDataProvider,
  FormDataConsumer,
} from "react-admin";

import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import { Resources } from "../../constants/resources";

import { CustomerShortDetailsRenderer } from "../Commons";

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

export const CustomerReadOnly = (props) => {
  const { record } = props;
  return (
    <Box mb={1}>
      <Box mb={0.5}>
        <InputLabel>Customer name</InputLabel>
      </Box>
      <CustomerShortDetailsRenderer record={record} path="customer" />
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
