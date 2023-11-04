import IPage from "../../model/IPage";
import IRecipe from "../../model/IRecipe";
import Recipe from "../../model/Recipe";
import HttpService from "./HttpService";
import { IListService } from "./IListService";

class RecipeService extends HttpService implements IListService<IRecipe, Recipe> {

    constructor(baseURL: string) {
        super(baseURL)
    }

    public async getAllItems(): Promise<IRecipe[]> {
        const response = await this.get('/');
        return RecipeService.convertResponseToJSON<IRecipe[]>(response);
    }

    public async getItem(id: string): Promise<IRecipe> {
        const response = await this.get(`/${id}`);
        return RecipeService.convertResponseToJSON<IRecipe>(response);
    }

    public async addItem(recipe: Recipe): Promise<IRecipe> {
        const response = await this.post<Recipe>('/', recipe);
        return RecipeService.convertResponseToJSON<IRecipe>(response);
    }

    public async updateItem(id: string, recipe: Recipe): Promise<IRecipe> {
        const response = await this.put<Recipe>(`/${id}`, recipe);
        return RecipeService.convertResponseToJSON<IRecipe>(response);
    }

    public async deleteItem(id: string): Promise<string> {
        const response = await this.delete(`/${id}`);
        return RecipeService.convertResponseToJSON<string>(response);
    }

    public async getItemsByCategoryPage(id: string, page: string, limit: string): Promise<IPage<IRecipe>> {
        const response = await this.get(`/food/${id}?page=${page}&limit=${limit}`);
        return RecipeService.convertResponseToJSON<IPage<IRecipe>>(response);
    }

}

export default RecipeService;