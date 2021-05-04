import React, { useEffect, useState } from "react";
import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import { Resources } from "./constants/resources";

import provider from "./hasura";

import Dashboard from "./Modules/Dashboard";
import NotFound from "./notFound";
import {
  CustomerList,
  CustomerEdit,
  CustomerCreate,
} from "./Modules/Customers";
import { ShortTermLoansList } from "./Modules/ShortTermLoans";

function App() {
  const [dataProvider, setDataProvider] = useState(null);

  useEffect(() => {
    const buildDataProvider = async () => {
      const dataProvider = await provider();
      console.log("dataProvider", dataProvider);
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

        // list={PostList}
        // edit={PostEdit}
        // create={PostCreate}
      />
      <Resource
        name="short_term_loans"
        list={ShortTermLoansList}
        // list={PostList}
        // edit={PostEdit}
        // create={PostCreate}
      />
    </Admin>
  );
}

export default App;
