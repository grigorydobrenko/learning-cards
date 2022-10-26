export type initStateType = {}

const initState: initStateType = {}

export const appReducer = (state = initState, action: initACType): initStateType => {
    switch (action.type) {
        case "INIT": {
            return state
        }
        default:
            return state
    }
}

type initACType = ReturnType<typeof loadingAC>

export const loadingAC = () => {
    return {
        type: 'INIT',

    }
}