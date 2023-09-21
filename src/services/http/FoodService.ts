import HttpService from "./HttpService";

class FoodService extends HttpService {
    private urlAllFoodCategories: string = "https://www.themealdb.com/api/json/v1/1/categories.php";
    private urlRecipesByCategory: string = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";
    private urlInstructionsByRecipe: string = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

    public async getAllFoodCategories<Type>(): Promise<Type> {
        const response = await this.fetchDataFromAPI(this.urlAllFoodCategories);
        const data = this.convertResponseToJSON<{ categories: Type }>(response);
        return data.categories;
    }

    public async getAllRecipesByCategory<Type>(category: string): Promise<Type> {
        const response = await this.fetchDataFromAPI(this.urlRecipesByCategory + category);
        const data = this.convertResponseToJSON<{ meals: Type }>(response);
        return data.meals;
    }

    public async getInstructionsByRecipe<Type>(idMeal: number): Promise<Type> {
        const response = await this.fetchDataFromAPI(this.urlInstructionsByRecipe + idMeal);
        const data = this.convertResponseToJSON<{ meals: Type }>(response);
        return data.meals;
    }

}

export default FoodService;