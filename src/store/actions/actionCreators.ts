import IRecipe from "../../model/IRecipe";
import IRecipeAction from "../../model/store/IRecipeAction";
import ITokenAction from "../../model/store/ITokenAction";
import * as actionTypes from "./actionTypes"

export function updateRecipes(recipes: IRecipe[] | undefined) {
    const action: IRecipeAction = {
        type: actionTypes.UPDATE_RECIPES,
        recipes,
    }

    return action;
}

export function updateToken(token: string | null | undefined) {
    const action: ITokenAction = {
        type: actionTypes.UPDATE_TOKEN,
        token,
    }

    return action;
}