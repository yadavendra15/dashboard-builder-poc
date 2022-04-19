import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import './App.css';
import Dashboard from "./Containers/Dashboard";
import AddWidget from "./Containers/AddWidget";
// import DataTable from "./Components/DataTable";
function App() {

  const [dynamicRoutes, setDynamicRoutes] = useState([]);
  const [dashboardConfig, setDashboardConfig] = useState([]);
  const [drilledDashboardConfig, setDrilledDashboardConfig] = useState([]);

  useEffect(() => {
    let dashboardConfig = localStorage.getItem('savedConfig');
    if (dashboardConfig) {
      dashboardConfig = JSON.parse(dashboardConfig);
      setDashboardConfig(dashboardConfig)
      let routedWidgets = dashboardConfig.filter(el => el.action)
      setDynamicRoutes(routedWidgets)
    }
  }, [])

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/add-widget" element={<AddWidget type='main' />} />
            <Route path="/dashboard" element={<Dashboard dashboardConfig={dashboardConfig} type='main' />} />
            <Route path="/" element={<Dashboard dashboardConfig={dashboardConfig} type='main' />} />
            {
              dynamicRoutes &&
              dynamicRoutes.map((el, index) => {
                return <Route key={index} path={`/${el.action.url}/:params`} element={<><AddWidget type='drilled-down' /><Dashboard dashboardConfig={el.drilledData} type='drilled-down' /></>} />
              })
            }
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
