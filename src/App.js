import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Protected from "./components/Protected";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Registration from "./components/Registration";
import CreateEvent from "./components/CreateEvent";
import SingleEvent from "./components/SingleEvent";

import './App.css';
 
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Protected Component={Dashboard} />} />
        <Route path="/create-event" element={<Protected Component={CreateEvent} />} />
        <Route path="/dashboard/single-event" element={<Protected Component={SingleEvent} />} />
      </Routes>
    </BrowserRouter>
  );
}
 
export default App
