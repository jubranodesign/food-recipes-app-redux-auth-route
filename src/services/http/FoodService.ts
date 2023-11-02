import Food from "../../model/Food";
import IFood from "../../model/IFood";
import IPage from "../../model/IPage";
import IRecipe from "../../model/IRecipe";
import Recipe from "../../model/Recipe";
import HttpService from "./HttpService";
import { IFoodService } from "./IFoodService";

class FoodService extends HttpService implements IFoodService<IFood, Food, IRecipe, Recipe> {

    constructor(baseURL: string) {
        super(baseURL)
    }

    public async getAll(): Promise<IFood[]> {
        const response = await this.get('/');
        const data = FoodService.convertResponseToJSON<IFood[]>(response);
        return data;
    }

    public async addNewCategory(food: Food): Promise<IFood> {
        const response = await this.post<Food>('/', food);
        return FoodService.convertResponseToJSON<IFood>(response);
    }

    public async getRecipesByFoodPage(id: string, page: string, limit: string): Promise<IPage<IRecipe>> {
        const response = await this.get(`/${id}/recipes?page=${page}&limit=${limit}`);
        const data = FoodService.convertResponseToJSON<IPage<IRecipe>>(response);
        return data;
    }

    public async addNewRecipeByCategory(recipe: Recipe): Promise<IRecipe> {
        const response = await this.post<Recipe>(`/${recipe.categoryId}/recipes`, recipe);
        return FoodService.convertResponseToJSON<IRecipe>(response);
    }

    // public async getRecipeById(id: number): Promise<any[]> {
    //     //const response = await this.get(`category/recipe/${id}`);
    //     const response = await FoodService.fetchDataFromAPI(this.urlInstructionsByRecipe + id);
    //     const data = FoodService.convertResponseToJSON<{ meals: any[] }>(response);
    //     return data.meals;
    // }
}

export default FoodService;