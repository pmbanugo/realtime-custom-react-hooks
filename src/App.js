import React, { useState, useEffect } from "react";
import "./App.css";
import Hamoni from "hamoni-sync";

import Header from "./components/Header";
import Table from "./components/Table";
import Form from "./components/Form";

export const HamoniContext = React.createContext({});

const App = () => {
  const accountId = "REPLACE_WITH_ACCOUNT_ID";
  const appId = "REPLACE_WITH_APP_ID";
  const [hamoni, setHamoni] = useState();

  useEffect(() => {
    const initialiseHamoniSync = async () => {
      // recommended to generate this from your backend and send to your client apps.
      const response = await fetch("https://api.sync.hamoni.tech/v1/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ accountId, appId }),
      });

      const token = await response.json();
      const hamoniSync = new Hamoni(token);
      await hamoniSync.connect();

      setHamoni(hamoniSync);
    };

    initialiseHamoniSync();
  }, [accountId, appId]);

  return (
    <HamoniContext.Provider value={hamoni}>
      <div className="App">
        <Header />
        <Form />
        <br />
        <Table />
      </div>
    </HamoniContext.Provider>
  );
};

export default App;
