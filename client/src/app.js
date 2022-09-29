import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Routes, Outlet } from 'react-router-dom';
import AdminLayout from "layouts/Admin.js";
import Login from "../src/pages/login/login";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList";
import ChangePassword from '../src/pages/changePassword/changePassword'
import Notification from "pages/Notification/notification";
import Livefootage from "pages/liveFootage/livefootage";
function app() {

    return (

    <Routes>

      {/* <Redirect from="/" to="/admin/dashboard" /> */}
      {/* <Route exact path="/" element={<Login />} /> */}
      {/* <Route  render={(props) => <AdminLayout {...props} />} /> */}
      {/* <Route path="/f" element={AdminLayout} /> */}
      {/* <Route path="/admin" element={<AdminLayout ></AdminLayout>} /> */}


      {/* <Route exact path="/invoices" element={
        <>
          <h1>Heloo i am invoices </h1>
          <Outlet />
        </>
      }>
        <Route path=":invoiceId" element={<h1>hello i am invoices/id</h1>} />
        <Route path="sent" element={<h1>invoices/send</h1>} />
      </Route> */}


      <Route exact path="/" element={<Login/>}/>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={< h1>This is admins dashboard</h1>} />
        <Route path="user" element={<UserProfile/>} />
        <Route path="table" element={< h1>This is admins table</h1>} />
        <Route path="typography" element={<TableList/>} />
        <Route path="icons" element={<Livefootage/>} />
        <Route path="maps" element={<h1>Maps Component</h1>} />
        <Route path="notifications" element={<h1>Notification Component</h1>} />
      </Route>
      <Route path="/changePassword" element={<ChangePassword/>}/>
      <Route path="/notification" element={<Notification/>}/>
    </Routes>
    
    )}

    
export default app
