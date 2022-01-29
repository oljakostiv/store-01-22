import React, {useContext} from 'react';
import {Routes, Route} from 'react-router-dom';
import {
    ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE
} from "./utils/consts";
import { Admin, Auth, Basket, DevicePage, Shop } from './pages';
import UndefinedPage from "./pages/UndefinedPage";
import {Context} from "./index";

const AppRouter = () => {
    const { user } = useContext(Context);

    if (user.isAuth) {
        return (
            <Routes>
                <Route path={ ADMIN_ROUTE } element={<Admin/>}/>
                <Route path={ BASKET_ROUTE } element={<Basket/>}/>
                <Route path={ LOGIN_ROUTE } element={<Auth/>}/>
                <Route path={ REGISTRATION_ROUTE } element={<Auth/>}/>
                <Route path={ DEVICE_ROUTE + '/:id' } element={<DevicePage/>}/>
                <Route path={ SHOP_ROUTE } element={<Shop/>}/>
                <Route path='*' element={<UndefinedPage/>}/>
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path={ LOGIN_ROUTE } element={<Auth/>}/>
            <Route path={ REGISTRATION_ROUTE } element={<Auth/>}/>
            <Route path={ DEVICE_ROUTE + '/:id' } element={<DevicePage/>}/>
            <Route path={ SHOP_ROUTE } element={<Shop/>}/>
            <Route path='*' element={<UndefinedPage/>}/>
        </Routes>
    )
};

export default AppRouter;
