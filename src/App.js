import React from "react";
import "./App.css";

import Header from "./components/Header";
import Table from "./components/Table";
import Form from "./components/Form";

import HamoniContext from "./HamoniContext";
import useHamoni from "./hooks/use-hamoni";

const App = () => {
  const accountId = "REPLACE_WITH_ACCOUNT_ID";
  const appId = "REPLACE_WITH_APP_ID";
  const hamoni = useHamoni(accountId, appId);

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
