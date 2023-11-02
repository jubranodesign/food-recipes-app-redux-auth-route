import IPage from "../IPage";
import IRecipe from "../IRecipe"

interface IRecipeAction {
    type: string
    recipes: IPage<IRecipe> | undefined
}

export default IRecipeAction;
