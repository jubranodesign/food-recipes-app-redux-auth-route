import IFood from "../../model/IFood"

export interface IFoodService<IFoodType, FoodType, IRecipeType, RecipeType> {
    getAll(): Promise<IFoodType[]>
    addNewCategory(food: FoodType): Promise<IFoodType>
    getAllRecipesByCategory(id: string): Promise<RecipeType[]>
    addNewRecipeByCategory(recipe: RecipeType): Promise<IRecipeType>
    // getRecipeById(id: number): Promise<IRecipeType>
}