import axios, { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { setAppErrorAC, setAppErrorACType } from '../../app/app-reducer'

export const errorUtils = (
  err: Error | AxiosError<{ error: string }>,
  dispatch: Dispatch<setAppErrorACType>
) => {
  if (axios.isAxiosError(err)) {
    const error = err.response?.data ? err.response.data.error : err.message

    dispatch(setAppErrorAC(error))
  } else {
    dispatch(setAppErrorAC(`Native error ${err.message}`))
  }
}
