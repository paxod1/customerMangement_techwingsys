import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './User/Login'
import Signup from './User/Signup'
import { useSelector } from 'react-redux';
import Home from './User/Home';
import AdminHome from './Admin/AdminHome';
import AdminLogin from './Admin/AdminLogin';
import AllExecutives from './Admin/AllExecutives';
import ExecutiveUpdate from './Admin/ExecutiveUpdate';
import AddCustomer from './User/AddCustomer';
import AllCustomers from './User/AllCustomers';
import DailyCustomerUpdate from './User/DailyCustomerUpdate';
import AllCustomersAdmin from './Admin/AllCustmoresAdmin';
import OneCustomerAdmin from './Admin/OneCustomerAdmin';

function App() {

  const logininfom = useSelector((state) => state.userlogin?.LoginInfo[0]);
  console.log("from app.js logininfom", logininfom);

  const Adminlogininfom = useSelector((state) => state.adminLogin?.LoginInfo[0]);


  const token = logininfom?.Token;
  const Admintoken = Adminlogininfom?.Token;

  const app = createBrowserRouter([
    {
      path: "/",
      element: token ? <Home /> : <Login />
    }, 
    {
      path: "/AddCustomer",
      element: token ? <AddCustomer /> : <Login />
    }, 
    {
      path: "/AllCustomers",
      element: token ? <AllCustomers /> : <Login />
    }, 
    {
      path: "/DailyCustomerUpdate/:id",
      element: token ? <DailyCustomerUpdate /> : <Login />
    }
    ,
    {
      path: "/Admin",
      element: Admintoken ? <AdminHome /> : <AdminLogin />
    },
    {
      path: '/Usersignup',
      element: Admintoken ? <Signup /> : <AdminLogin />
    },
    {
      path: '/AllExecutives',
      element: Admintoken ? <AllExecutives /> : <AdminLogin />
    }
    ,
    {
      path: '/ExecutiveUpdate/:id',
      element: Admintoken ? <ExecutiveUpdate /> : <AdminLogin />
    },
    {
      path: '/AllCustomersAdmin',
      element: Admintoken ? <AllCustomersAdmin /> : <AdminLogin />
    },
    {
      path: '/OneCustomerAdmin/:id',
      element: Admintoken ? <OneCustomerAdmin /> : <AdminLogin />
    }
  ])
  return (
    <div>
      <RouterProvider router={app} />
    </div>
  )
}

export default App
