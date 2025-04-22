import IPage from "../../model/IPage";
import IRecipe from "../../model/IRecipe";
import ICategoryAction from "../../model/store/ICategoryAction";
import IRecipeAction from "../../model/store/IRecipeAction";
import ITokenAction from "../../model/store/ITokenAction";
import * as actionTypes from "./actionTypes"

export function updateRecipes(recipes: IPage<IRecipe> | undefined) {
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

export function updateCategory(category: string | null | undefined) {
    const action: ICategoryAction = {
        type: actionTypes.UPDATE_CATEGORY,
        category,
    }

    return action;
}