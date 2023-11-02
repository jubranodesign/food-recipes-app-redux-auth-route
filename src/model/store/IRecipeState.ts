import IPage from "../IPage";
import IRecipe from "../IRecipe";

interface IRecipeState {
    recipes: IPage<IRecipe> | undefined
}

export default IRecipeState;
