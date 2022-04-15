import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import './App.css';
import Dashboard from "./Containers/Dashboard";
import AddWidget from "./Containers/AddWidget";
// import DataTable from "./Components/DataTable";
function App() {

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/add-widget" element={<AddWidget />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
