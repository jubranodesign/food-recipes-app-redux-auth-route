import HttpService from "./HttpService";
import { IFoodService } from "./IFoodService";

class FoodService extends HttpService implements IFoodService {

    private urlAllFoodCategories: string = "https://www.themealdb.com/api/json/v1/1/categories.php";
    private urlRecipesByCategory: string = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";
    private urlInstructionsByRecipe: string = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

    constructor(baseURL: string) {
        super(baseURL)
    }

    public async getAll<Type>(): Promise<Type> {
        // const response = await this.get('');
        const response = await FoodService.fetchDataFromAPI(this.urlAllFoodCategories);
        const data = FoodService.convertResponseToJSON<{ categories: Type }>(response);
        return data.categories;
    }

    public async getAllRecipesByCategory<Type>(category: string): Promise<Type> {
        //const response = await this.get(`/${category}`);
        const response = await FoodService.fetchDataFromAPI(this.urlRecipesByCategory + category);
        const data = FoodService.convertResponseToJSON<{ meals: Type }>(response);
        return data.meals;
    }

    public async getRecipeById<Type>(id: number): Promise<Type> {
        //const response = await this.get(`category/recipe/${id}`);
        const response = await FoodService.fetchDataFromAPI(this.urlInstructionsByRecipe + id);
        const data = FoodService.convertResponseToJSON<{ meals: Type }>(response);
        return data.meals;
    }

    public async addNewCategory<Type>(payload: Type): Promise<Type> {
        const response = await this.post<Type>('', payload);
        return FoodService.convertResponseToJSON<Type>(response);
    }

}

export default FoodService;