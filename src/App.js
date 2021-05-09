import React, { useEffect, useState } from "react";
import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import { Resources } from "./constants/resources";
import PersonIcon from "@material-ui/icons/Person";
import provider from "./hasura";

import Dashboard from "./Modules/Dashboard";
import NotFound from "./notFound";
import {
  CustomerList,
  CustomerEdit,
  CustomerCreate,
  CustomerShow,
} from "./Modules/Customers";
import { ShortTermLoansList } from "./Modules/ShortTermLoans";

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
        list={ShortTermLoansList}
        // list={PostList}
        // edit={PostEdit}
        // create={PostCreate}
      />
    </Admin>
  );
}

export default App;
