import React, { useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useNavigate } from "react-router-dom";
import "react-tabs/style/react-tabs.css";
import { COMPANY_LOGO } from "../assets/images";
import GridViewIcon from "@mui/icons-material/GridView";
import GroupIcon from "@mui/icons-material/Group";
import DataTable from "../components/DataTable";
import HomeScreen from "./HomeScreen";
function Dashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <Tabs className="vertical-tabs">
        <TabList className="vertical-tab-list">
          <div className="container">
            <Tab className="vertical-tab ">
              <GridViewIcon />
              <span className="m-2">Dashboard</span>
            </Tab>
            <Tab className="vertical-tab ">
              <GroupIcon />
              <span className="m-2">Customers</span>
            </Tab>
          </div>
        </TabList>
        <TabPanel>
          <HomeScreen />
        </TabPanel>

        <TabPanel>
          <DataTable />
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default Dashboard;
