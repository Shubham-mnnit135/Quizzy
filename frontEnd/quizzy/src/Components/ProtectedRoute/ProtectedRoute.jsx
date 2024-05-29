import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { userContext } from '../../Context/Context';

const ProtectedRoute = () => {
  const {account} = useContext(userContext);
  return account ? <Outlet/> : <Navigate to={"/login"}/>
}

export default ProtectedRoute
