import React from "react";
import {
  linkToRecord,
  List,
  TextField,
  TopToolbar,
  CreateButton,
  Filter,
  Create,
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  ReferenceInput,
  Show,
  NumberInput,
  NumberField,
  DateField,
  SelectInput,
  EditButton,
  Link,
  FunctionField,
} from "react-admin";
import get from "lodash/get";
import { ShowSplitter, GridShowLayout, RaGrid, RaBox } from "ra-compact-ui";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import { Resources } from "../../constants/resources";
import {
  CustomerShortDetail,
  CustomerReferenceInput,
} from "../Customers/components";

import {
  ListActions,
  listExtraProps,
  EditActions,
  CustomerReadOnly,
  CardList,
  Label,
  ArrayField,
} from "../../Commons";
import { DetailsCalculated } from "./components";

const ShortTermLoanListFilter = (props) => (
  <Filter {...props}>
    <NumberInput source="customer_id" label="Customer id" alwaysOn />
  </Filter>
);

export const ShortTermLoanList = (props) => (
  <List
    {...props}
    {...listExtraProps}
    filters={<ShortTermLoanListFilter />}
    actions={
      <ListActions>
        <CreateButton
          basePath={`/${Resources.shortTermRepayments}`}
          label="Repayment"
        />
      </ListActions>
    }
  >
    <Box px={2}>
      <CardList
        linkType="show"
        title={
          <RaBox display="inline-flex" alignItems="center">
            <CustomerShortDetail
              path="customer"
              label="Customer"
              variant="h6"
            />
            <Divider orientation="vertical" flexItem variant="middle" />
            <DateField source="date" variant="h6" />
          </RaBox>
        }
        subHeader={
          <FunctionField
            ml={1}
            render={(record) =>
              `${get(record, "duration")}
            (${get(record, "si_frequency.frequency")})`
            }
          />
        }
      >
        <RaGrid container spacing={1}>
          <RaGrid item xs={6}>
            <Label label="Id">
              <TextField source="id" />
            </Label>
          </RaGrid>
          <RaGrid item xs={6}>
            <Label label="Principal Amount">
              <NumberField source="principal_amount" />
            </Label>
          </RaGrid>
          <RaGrid item xs={6}>
            <Label label="Installment amount">
              <NumberField source="installment_amount" />
            </Label>
          </RaGrid>
          <RaGrid item xs={6}>
            <Label label="SI">
              <TextField label="SI" source="si_frequency.si" />
            </Label>
          </RaGrid>
          <RaGrid item xs={6}>
            <Label label="Status">
              <TextField source="status" />
            </Label>
          </RaGrid>
          <RaGrid item xs={6}>
            <Label label="Total">
              <TextField source="total" />
            </Label>
          </RaGrid>
        </RaGrid>
      </CardList>
    </Box>
  </List>
);

export const ShortTermLoanEdit = (props) => {
  const transform = (data) => {
    const dataClone = { ...data };
    delete dataClone.customer;
    delete dataClone.si_frequency;
    delete dataClone.short_term_repayments_aggregate;
    delete dataClone.short_term_repayments;
    return dataClone;
  };

  return (
    <Edit
      {...props}
      transform={transform}
      actions={<EditActions />}
      mutationMode="pessimistic"
    >
      <SimpleForm redirect="show">
        <CustomerReadOnly />
        <DateInput source="date" />
        <NumberInput source="principal_amount" />
        <ReferenceInput
          source="si_frequency_id"
          reference={Resources.siFrequency}
        >
          <SelectInput optionText="name" />
        </ReferenceInput>
        <NumberInput source="duration" />
        <Divider style={{ margin: "20px 0px" }} />
        <DetailsCalculated />
        <NumberInput source="total" />
        <TextInput source="status" />
      </SimpleForm>
    </Edit>
  );
};

export const ShortTermLoanCreate = (props) => {
  return (
    <Create {...props} mutationMode={"pessimistic"}>
      <SimpleForm redirect="show">
        <CustomerReferenceInput label="Customer" source="customer_id" />
        <DateInput source="date" defaultValue={Date.now()} />
        <NumberInput source="principal_amount" />
        <ReferenceInput
          source="si_frequency_id"
          reference={Resources.siFrequency}
        >
          <SelectInput optionText="name" />
        </ReferenceInput>
        <NumberInput source="duration" />
        <Divider style={{ margin: "20px 0px" }} />
        <DetailsCalculated />
        <NumberInput source="total" />
      </SimpleForm>
    </Create>
  );
};

export const ShowActions = ({ basePath, data, resource, children }) => {
  const classes = useStyles();
  return (
    <TopToolbar className={classes.toolbar}>
      <Button
        component={Link}
        to={{
          pathname: `/${Resources.shortTermRepayments}/create`,
          search: `?source=${JSON.stringify({
            short_term_loan_id: data?.id,
          })}`,
        }}
        size="small"
        color="primary"
      >
        <AddIcon />
        Add repayments
      </Button>
      <EditButton basePath={basePath} record={data} />
    </TopToolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  toolbar: {
    alignItems: "center",
  },
}));

export const ShortTermLoanShow = (props) => {
  const history = useHistory();
  const classes = useStyles();

  const leftSide = (
    <GridShowLayout>
      <Typography variant="h6">Details</Typography>
      <RaGrid container spacing={1}>
        <RaGrid item xs={6}>
          <CustomerShortDetail path="customer" label="Customer" />
        </RaGrid>
        <RaGrid item xs={6}>
          <TextField source="id" />
        </RaGrid>
        <RaGrid item xs={6}>
          <DateField
            source="date"
            options={{
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            }}
          />
        </RaGrid>
        <RaGrid item xs={6}>
          <NumberField source="principal_amount" />
        </RaGrid>
        <RaGrid item xs={6}>
          <TextField label="frequency" source="si_frequency.frequency" />
        </RaGrid>
        <RaGrid item xs={2}>
          <TextField label="SI" source="si_frequency.si" />
        </RaGrid>
        <RaGrid item xs={2}>
          <NumberField source="duration" />
        </RaGrid>
        <RaGrid item xs={6}>
          <NumberField source="total" />
        </RaGrid>
        <RaGrid item xs={6}>
          <NumberField source="installment_amount" />
        </RaGrid>
        <RaGrid item xs={12}>
          <Divider style={{ margin: "20px 0px" }} />
        </RaGrid>
        <RaGrid item xs={12}>
          <Box style={{ fontSize: "16px", fontWeight: 500 }}>Balance</Box>
        </RaGrid>
        <RaGrid item xs={6}>
          <TextField source="view_status.recievable_amount" label="Balance" />
        </RaGrid>
        <RaGrid item xs={6}>
          <FunctionField
            label="Balance (till date)"
            render={(record) =>
              get(record, "view_status.expected_repayment_amount") -
              get(record, "view_status.total_repayed_amount")
            }
          />
        </RaGrid>
        <RaGrid item xs={6}>
          <TextField source="status" />
        </RaGrid>
        <RaGrid item xs={12}>
          <Divider style={{ margin: "20px 0px" }} />
        </RaGrid>
        <RaGrid item xs={12}>
          <Box style={{ fontSize: "16px", fontWeight: 500 }}>Repayments</Box>
        </RaGrid>
        <RaGrid item xs={6}>
          <NumberField
            label="Installments"
            source="short_term_repayments_aggregate.aggregate.count"
          />
        </RaGrid>
        <RaGrid item xs={6}>
          <NumberField
            label="Amount"
            source="view_status.total_repayed_amount"
          />
        </RaGrid>
        <RaGrid item xs={12}>
          <DateField
            label="last payment date"
            source="view_status.last_repayment_date"
            options={{
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            }}
          />
        </RaGrid>
      </RaGrid>
    </GridShowLayout>
  );

  const rightSide = (
    <>
      <Typography variant="h6">Repayments</Typography>
      <ArrayField label="" source="short_term_repayments">
        <CardList
          linkType="show"
          rowClick={(id, path, record) => {
            const linkToLoan = linkToRecord(
              `/${Resources.shortTermRepayments}`,
              record?.id,
              "edit"
            );
            history.push(linkToLoan);
          }}
        >
          <RaGrid container spacing={1}>
            <RaGrid item xs={4}>
              <Label label="Added on">
                <DateField source="date" />
              </Label>
            </RaGrid>
            <RaGrid item xs={4}>
              <Label label="Installment Date">
                <DateField source="installment_date" />
              </Label>
            </RaGrid>
            <RaGrid item xs={4}>
              <Label label="Amount">
                <NumberField source="amount" />
              </Label>
            </RaGrid>
          </RaGrid>
        </CardList>
      </ArrayField>
    </>
  );

  return (
    <Show
      {...props}
      component="div"
      actions={<ShowActions />}
      className={classes.root}
    >
      <Box p={2}>
        <ShowSplitter
          leftSide={leftSide}
          rightSide={rightSide}
          rightSideProps={{
            md: 8,
            xs: 12,
            component: "div",
          }}
          leftSideProps={{
            md: 4,
            xs: 12,
          }}
        />
      </Box>
    </Show>
  );
};
