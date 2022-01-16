import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {
    ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE
} from "./utils/consts";
import { Admin, Auth, Basket, DevicePage, Shop } from './pages';

const AppRouter = () => {
    const isAuth = false;

    if (isAuth) {
        return (
            <Routes>
                <Route path={ ADMIN_ROUTE } element={<Admin/>}/>
                <Route path={ BASKET_ROUTE } element={<Basket/>}/>
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path={ LOGIN_ROUTE } element={<Auth/>}/>
            <Route path={ REGISTRATION_ROUTE } element={<Auth/>}/>
            <Route path={ DEVICE_ROUTE } element={<DevicePage/>}/>
            <Route path={ SHOP_ROUTE } element={<Shop/>}/>
            <Route path='*' element={<Shop/>}/>
        </Routes>
    )
};

export default AppRouter;
