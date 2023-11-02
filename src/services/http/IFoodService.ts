import IFood from "../../model/IFood"
import IPage from "../../model/IPage"

export interface IFoodService<IFoodType, FoodType, IRecipeType, RecipeType> {
    getAll(): Promise<IFoodType[]>
    addNewCategory(food: FoodType): Promise<IFoodType>
    getRecipesByFoodPage(id: string, page: string, limit: string): Promise<IPage<RecipeType>>
    addNewRecipeByCategory(recipe: RecipeType): Promise<IRecipeType>
    // getRecipeById(id: number): Promise<IRecipeType>
}