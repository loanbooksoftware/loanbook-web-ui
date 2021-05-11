import React, { useEffect, useState } from "react";
import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import { Resources } from "./constants/resources";
import PersonIcon from "@material-ui/icons/Person";
import RestoreIcon from "@material-ui/icons/Restore";
import provider from "./hasura";

import Dashboard from "./Modules/Dashboard";
import NotFound from "./notFound";
import {
  CustomerList,
  CustomerEdit,
  CustomerCreate,
  CustomerShow,
} from "./Modules/Customers";
import {
  ShortTermLoanList,
  ShortTermLoanEdit,
  ShortTermLoanCreate,
  ShortTermLoanShow,
} from "./Modules/ShortTermLoans";

import {
  ShortTermRepaymentCreate,
  ShortTermRepaymentEdit,
  ShortTermRepaymentShow,
  ShortTermRepaymentList,
} from "./Modules/ShortTermRepayments";

function App() {
  const [dataProvider, setDataProvider] = useState(null);

  useEffect(() => {
    const buildDataProvider = async () => {
      const dataProvider = await provider();
      setDataProvider(() => dataProvider);
    };
    buildDataProvider();
  }, []);

  if (!dataProvider) return <p>Loading...</p>;

  return (
    <Admin
      dataProvider={dataProvider}
      dashboard={Dashboard}
      disableTelemetry
      catchAll={NotFound}
    >
      <Resource
        name={Resources.customers}
        list={CustomerList}
        create={CustomerCreate}
        edit={CustomerEdit}
        show={CustomerShow}
        icon={PersonIcon}
      />
      <Resource
        name={Resources.shortTermLoans}
        list={ShortTermLoanList}
        edit={ShortTermLoanEdit}
        create={ShortTermLoanCreate}
        show={ShortTermLoanShow}
        icon={RestoreIcon}
      />
      <Resource
        name={Resources.shortTermRepayments}
        list={ShortTermRepaymentList}
        edit={ShortTermRepaymentEdit}
        create={ShortTermRepaymentCreate}
        show={ShortTermRepaymentShow}
      />
      <Resource name={Resources.siFrequency} />
    </Admin>
  );
}

export default App;
