import React from 'react'

import { Navigate, Outlet, Route, Routes, useParams } from 'react-router-dom'

import { CheckEmail } from '../../../features/auth/ForgotPassword/CheckEmail'
import { CreateNewPassword } from '../../../features/auth/ForgotPassword/CreateNewPassword'
import { ForgotPassword } from '../../../features/auth/ForgotPassword/ForgotPassword'
import { Login } from '../../../features/auth/Login/Login'
import { Register } from '../../../features/auth/Register/Register'
import { Cards } from '../../../features/cards/Cards'
import { Packs } from '../../../features/packs/Packs'
import { Profile } from '../../../features/profile/Profile'
import { useAppSelector } from '../../hooks/customHooks'
import { appSelector, authSelector } from '../../selectors'
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
  PACKS: '/packs',
  CARDS: '/cards',
}

const RequireToken = () => {
  let { token } = useParams()
  return token ? <Outlet /> : <Navigate to={PATH.LOGIN} />
}

const RequireAuth = () => {
  const isLoggedIn = useAppSelector(authSelector.isLoggedin)
  return isLoggedIn ? <Outlet /> : <Navigate to={PATH.LOGIN} />
}

const RequireAppStatus = () => {
  const status = useAppSelector(appSelector.status)
  return status !== 'succeeded' ? <Outlet /> : <Navigate to={PATH.CHECK_EMAIL} />
}

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<RequireAuth />}>
        {/* <Route index element={<Packs />} /> */}
        <Route path={PATH.PACKS} element={<Packs />} />
        <Route path={PATH.PROFILE} element={<Profile />} />
        {/*<Route path={'packs/:id'} element={<Cards />} />*/}
        <Route path={'/cards'} element={<Cards />} />
      </Route>
      <Route element={<RequireToken />}>
        <Route path={PATH.CREATE_PASSWORD_TOKEN} element={<CreateNewPassword />} />
      </Route>
      <Route path={PATH.REGISTER} element={<Register />} />
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.FORGOT_PASSWORD} element={<RequireAppStatus />}>
        <Route index element={<ForgotPassword />} />
      </Route>
      <Route path={PATH.CREATE_PASSWORD} element={<CreateNewPassword />} />
      <Route path={PATH.CHECK_EMAIL} element={<CheckEmail />} />
      <Route path={PATH.NOT_FOUND} element={<NotFound />} />
      <Route path={'*'} element={<Navigate to="/404" />} />
    </Routes>
  )
}
