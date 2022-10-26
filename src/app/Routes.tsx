import React from 'react';
import ChangePassword from "../pages/ChangePassword";
import {Route, Routes} from "react-router-dom";
import Components from "../pages/components/Components";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";
import RestorePassword from "../pages/RestorePassword";
import SignUp from "../pages/SignUp";


export const PATH = {
    CHANGE_PASSWORD: '/change-password',
    COMPONENTS: '/components',
    LOGIN: '/login',
    NOT_FOUND: '/not-found',
    PROFILE: '/profile',
    RESTORE_PASSWORD: '/restore-password',
    SIGN_UP: '/sign-up',

}


const AppRoutes = () => {
    return (
        <Routes>
            <Route path={PATH.SIGN_UP} element={<SignUp />} />
            <Route path={PATH.COMPONENTS} element={<Components />} />
            <Route path={PATH.LOGIN} element={<Login />} />
            <Route path={PATH.NOT_FOUND} element={<NotFound />} />
            <Route path={PATH.PROFILE} element={<Profile />} />
            <Route path={PATH.RESTORE_PASSWORD} element={<RestorePassword />} />
            <Route path={PATH.CHANGE_PASSWORD} element={<ChangePassword />} />

        </Routes>
    );
};

export default AppRoutes;