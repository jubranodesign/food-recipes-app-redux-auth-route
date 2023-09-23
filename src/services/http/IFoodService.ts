export interface IFoodService<FoodType, RecipeType, AnyType> {
    getAll(): Promise<FoodType[]>
    getAllRecipesByCategory(category: string): Promise<RecipeType[]>
    getRecipeById(id: number): Promise<AnyType[]>
    addNewCategory(payload: FoodType): Promise<FoodType>
}