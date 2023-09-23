export interface IFoodService {
    getAll<Type>(): Promise<Type>
    getAllRecipesByCategory<Type>(category: string): Promise<Type>
    getRecipeById<Type>(id: number): Promise<Type>
    addNewCategory<Type>(payload: Type): Promise<Type>
}