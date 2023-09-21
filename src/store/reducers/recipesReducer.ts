import IRecipeAction from "../../model/store/IRecipeAction";
import IRecipeState from "../../model/store/IRecipeState";
import * as actionTypes from "../actions/actionTypes"

const initialState: IRecipeState = {
    recipes: []
}

const recipesReducer = (
    state: IRecipeState = initialState,
    action: IRecipeAction
): IRecipeState => {
    switch (action.type) {
        case actionTypes.UPDATE_RECIPES:
            return {
                //...state,
                recipes: action.recipes,
            }
    }
    return state
}

export default recipesReducer