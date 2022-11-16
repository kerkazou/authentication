import React from 'react';
import{BrowserRouter,Routes,Route} from "react-router-dom";

import UserPrivateRoutes from './PrivateRoutes/UserPrivateRoutes'
import AuthPrivateRoutes from './PrivateRoutes/AuthPrivateRoutes'
import RolePrivateRoutes from './PrivateRoutes/RolePrivateRoutes'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import ForgetPassword from './components/auth/ForgetPassword'
import FormForgetPassword from './components/auth/FormForgetPassword'

import ResetPassword from './components/user/ResetPassword'
import Manager from './components/user/Manager'
import Livreur from './components/user/Livreur'
import Client from './components/user/Client'

import PageNotFound from './components/auth/PageNotFound'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route element={<UserPrivateRoutes/>}>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/form-forget-password" element={<FormForgetPassword />} />
        </Route>
        {/* User */}
        <Route element={<AuthPrivateRoutes/>}>
          <Route element={<RolePrivateRoutes role='manager'/>}>
            <Route path="/api/user/manager/me" element={<Manager />} />
          </Route>
          <Route element={<RolePrivateRoutes role='livreur'/>}>
            <Route path="/api/user/livreur/me" element={<Livreur />} />
          </Route>
          <Route element={<RolePrivateRoutes role='client'/>}>
            <Route path="/api/user/client/me" element={<Client />} />
          </Route>
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
        {/* Page Not Found */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
