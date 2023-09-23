export interface IFoodService {
    getAllFoodCategories<Type>(): Promise<Type>
    getAllRecipesByCategory<Type>(category: string): Promise<Type>
    getRecipeById<Type>(id: number): Promise<Type>
    addNewFoodCategory<Type>(payload: Type): Promise<Type>
}