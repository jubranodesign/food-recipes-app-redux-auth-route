import IFood from "../../model/IFood";
import IRecipe from "../../model/IRecipe";
import HttpService from "./HttpService";
import { IFoodService } from "./IFoodService";

class FoodService extends HttpService implements IFoodService<IFood, IRecipe, any> {

    private urlAllFoodCategories: string = "https://www.themealdb.com/api/json/v1/1/categories.php";
    private urlRecipesByCategory: string = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";
    private urlInstructionsByRecipe: string = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

    constructor(baseURL: string) {
        super(baseURL)
    }

    public async getAll(): Promise<IFood[]> {
        // const response = await this.get('');
        const response = await FoodService.fetchDataFromAPI(this.urlAllFoodCategories);
        const data = FoodService.convertResponseToJSON<{ categories: IFood[] }>(response);
        return data.categories;
    }

    public async getAllRecipesByCategory(category: string): Promise<IRecipe[]> {
        //const response = await this.get(`/${category}`);
        const response = await FoodService.fetchDataFromAPI(this.urlRecipesByCategory + category);
        const data = FoodService.convertResponseToJSON<{ meals: IRecipe[] }>(response);
        return data.meals;
    }

    public async getRecipeById(id: number): Promise<any[]> {
        //const response = await this.get(`category/recipe/${id}`);
        const response = await FoodService.fetchDataFromAPI(this.urlInstructionsByRecipe + id);
        const data = FoodService.convertResponseToJSON<{ meals: any[] }>(response);
        return data.meals;
    }

    public async addNewCategory(payload: IFood): Promise<IFood> {
        const response = await this.post<IFood>('', payload);
        return FoodService.convertResponseToJSON<IFood>(response);
    }

}

export default FoodService;