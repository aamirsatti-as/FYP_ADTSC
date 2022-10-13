import React, { createContext, useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Routes, Outlet } from 'react-router-dom';
import AdminLayout from "layouts/Admin.js";
import Dashboard from "views/Dashboard"
import Login from "../src/pages/login/login";
import UserProfile from "views/UserProfile.js";
import Detection from "views/Detection";
import ChangePassword from '../src/pages/changePassword/changePassword'
import Notifications from 'views/Notifications';
import Livefootage from "pages/liveFootage/livefootage";
import Notifier from 'views/Notifier';
import ResetPassword from 'pages/resetPassword/resetPassword';
import Four0Four from 'pages/404 Not Found/404';
import ShowTraceback from 'views/ShowTraceback';
import Location from 'views/Icons';

export const UserContext = createContext();

function app() {
  const [user, setUser] = useState(true);
const navigate=useNavigate()
  var userExist = localStorage.getItem("profile");

  useEffect(()=>{
    document.title="ADTSC"},[])



  if (!userExist) {
    
    return (

      <Routes>
        <Route exact path="/" element={<Login />} />
        
        
      </Routes>
    )

  }
  if(userExist){
    return (
      <div>
        <UserContext.Provider value={{ user, setUser }}>
  
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
  
  
        <Route exact path="/" element={<Login />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              
              <Route path="user" element={<UserProfile />} />
              <Route path="detection" element={<Detection />} />
  
              <Route path="traceback" element={< h1>This is Typography</h1>} />
              <Route path="icons" element={<Livefootage />} />
              <Route path="notifiers" element={<Notifier />} />
              <Route path="notifications" element={<Notifications />} />
            </Route>
            <Route path="/traceback" element={<ShowTraceback />} />
            <Route path="/notification" element={<Notifications />} />
            <Route path="/location" element={<Location />} />
          </Routes>
        </UserContext.Provider>
      </div>
  )
  }


  
}


export default app
