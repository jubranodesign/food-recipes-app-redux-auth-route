import IRecipe from "../IRecipe"

interface IRecipeAction {
    type: string
    recipes: IRecipe[] | undefined
}

export default IRecipeAction;
