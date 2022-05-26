import React, { useState } from "react";
import { Created, Solded, Purchased } from "../../components";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { ServicesContainer } from "../BuyItems/BuyItemElements";

function TabPanel(props) {
  const { children, value, index } = props;
  return <>{value === index && <>{children}</>}</>;
}

const Profile = () => {
  const [value, setValue] = useState(0);
  const handleTabs = (e, val) => {
    setValue(val);
  };
  return (
    <div>
      <ServicesContainer>
        <Tabs value={value} onChange={handleTabs}>
          <Tab label="Collected" />
          <Tab label="Listed" />
        </Tabs>
      </ServicesContainer>
      <TabPanel value={value} index={0}>
        <Purchased />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Created />
      </TabPanel>
    </div>
  );
};

export default Profile;
