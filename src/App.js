import React from "react";
import AppRouter from "./routes/AppRouter";
import GlobalStyle, { Button } from "./styles/globalStyles";
import { useEthers } from "@usedapp/core";
import { notifyWarning } from "./helper";
import { Landing } from "./components";

const App = () => {
  const { account, activateBrowserWallet } = useEthers();

  const onError = () => {
    notifyWarning("Wrong Network !", "Please connect to Polygon Mainnet");
  };

  return (
    <div>
      <GlobalStyle />

      {account ? <AppRouter /> : <Landing />}
    </div>
  );
};

export default App;
