import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { AppRootState, AppThunkDispatch } from '../../app/store'

export const useAppDispatch: () => AppThunkDispatch = useDispatch

export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector
