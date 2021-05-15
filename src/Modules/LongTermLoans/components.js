import React, { useEffect, useState } from "react";
import { useDataProvider, FormDataConsumer } from "react-admin";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";

import { Resources } from "../../constants/resources";

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
