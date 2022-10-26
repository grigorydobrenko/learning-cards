import {combineReducers, createStore} from "redux";
import {appReducer} from "./app-reducer";


const reducers = combineReducers({
    appReducer: appReducer
})

const store = createStore(reducers)

export default store

export type AppRootState = ReturnType<typeof reducers>