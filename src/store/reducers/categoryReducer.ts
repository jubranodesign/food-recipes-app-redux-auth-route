import ICategoryAction from "../../model/store/ICategoryAction"
import ICategoryState from "../../model/store/ICategoryState"
import * as actionTypes from "../actions/actionTypes"

const initialState: ICategoryState = {
    category: null
}

const categoryReducer = (
    state: ICategoryState = initialState,
    action: ICategoryAction
): ICategoryState => {
    switch (action.type) {
        case actionTypes.UPDATE_CATEGORY:
            return {
                ...state,
                category: action.category,
            }
    }
    return state
}

export default categoryReducer