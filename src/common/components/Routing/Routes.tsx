import React from 'react'

import { Navigate, Outlet, Route, Routes, useParams } from 'react-router-dom'

import { CheckEmail } from '../../../features/auth/ForgotPassword/CheckEmail'
import { CreateNewPassword } from '../../../features/auth/ForgotPassword/CreateNewPassword'
import { ForgotPassword } from '../../../features/auth/ForgotPassword/ForgotPassword'
import { Login } from '../../../features/auth/Login/Login'
import { Register } from '../../../features/auth/Register/Register'
import { Cards } from '../../../features/cards/Cards'
import { Profile } from '../../../features/profile/Profile'
import { NotFound } from '../PageNotFound/NotFound'

export const PATH = {
  MAIN: '/',
  REGISTER: '/register',
  LOGIN: '/login',
  PROFILE: '/profile',
  FORGOT_PASSWORD: '/forgot-password',
  CHECK_EMAIL: '/check-email',
  CREATE_PASSWORD: '/create-password',
  CREATE_PASSWORD_TOKEN: '/create-password/:token',
  NOT_FOUND: '/404',
  CARDS: '/cards',
}

const PrivateRoutes = () => {
  let { token } = useParams()

  return token ? <Outlet /> : <Navigate to={PATH.LOGIN} />
}

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={PATH.MAIN} element={<Profile />} />
      <Route path={PATH.PROFILE} element={<Profile />} />
      <Route path={PATH.REGISTER} element={<Register />} />
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={PATH.CHECK_EMAIL} element={<CheckEmail />} />
      <Route path={PATH.CREATE_PASSWORD} element={<CreateNewPassword />} />
      <Route element={<PrivateRoutes />}>
        <Route path={PATH.CREATE_PASSWORD_TOKEN} element={<CreateNewPassword />} />
      </Route>
      <Route path={PATH.CARDS} element={<Cards />} />
      <Route path={'*'} element={<NotFound />} />
      {/*<Route path={PATH.NOT_FOUND} element={<NotFound />} />*/}
      {/*<Route path={'*'} element={<Navigate to="/404" />} />*/}
    </Routes>
  )
}
