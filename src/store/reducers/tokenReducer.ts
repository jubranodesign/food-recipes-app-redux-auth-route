import ITokenAction from "../../model/store/ITokenAction"
import ITokenState from "../../model/store/ITokenState"
import * as actionTypes from "../actions/actionTypes"

const initialState: ITokenState = {
    token: null
}

const tokenReducer = (
    state: ITokenState = initialState,
    action: ITokenAction
): ITokenState => {
    switch (action.type) {
        case actionTypes.UPDATE_TOKEN:
            return {
                ...state,
                token: action.token,
            }
    }
    return state
}

export default tokenReducer