// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';


const PrivateRoutes = () => {
    const { user } = useContext(AuthContext);
    return user ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoutes;

