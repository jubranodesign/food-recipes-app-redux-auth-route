import IPage from "../../model/IPage";
import IRecipe from "../../model/IRecipe";
import Recipe from "../../model/Recipe";
import { handleApiRequest } from "../../utils/apiUtils";
import { validateId, validateRequiredFields } from "../../utils/validation";
import HttpService from "./HttpService";
import { IListService } from "./IListService";

class RecipeService extends HttpService implements IListService<IRecipe, Recipe> {

    constructor(baseURL: string) {
        super(baseURL)
    }

    public async getAllItems(): Promise<IRecipe[]> {
        return handleApiRequest<IRecipe[]>(
            () => this.get<IRecipe[]>('/'),
            this.handleError.bind(this),
            "Failed to fetch recipes"
        );
    }

    public async getItem(id: string): Promise<IRecipe> {
        const errorMsg = validateId(id);
        if (errorMsg) {
            throw new Error(errorMsg);
        }
        return await handleApiRequest<IRecipe>(
            () => this.get<IRecipe>(`/${id}`),
            this.handleError.bind(this),
            "Recipe not found"
        );
    }

    public async addItem(recipe: Recipe): Promise<IRecipe> {
        const errorMsg = validateRequiredFields<Recipe>(recipe, ['name', 'categoryId', 'urlImg', 'instructions']);
        if (errorMsg) {
            throw new Error(errorMsg);
        }
        return await handleApiRequest<IRecipe>(
            () => this.post<Recipe, IRecipe>('/', recipe),
            this.handleError.bind(this),
            "Failed to add recipe"
        );
    }

    public async updateItem(id: string, recipe: Recipe): Promise<IRecipe> {
        const errorMsg = validateId(id) || validateRequiredFields<Recipe>(recipe, ['name', 'categoryId', 'urlImg', 'instructions']);
        if (errorMsg) {
            throw new Error(errorMsg);
        }
        return await handleApiRequest<IRecipe>(
            () => this.put<Recipe, IRecipe>(`/${id}`, recipe),
            this.handleError.bind(this),
            "Failed to update recipe"
        );
    }

    public async deleteItem(id: string): Promise<string> {
        const errorMsg = validateId(id);
        if (errorMsg) {
            throw new Error(errorMsg);
        }
        return await handleApiRequest<string>(
            () => this.delete<string>(`/${id}`),
            this.handleError.bind(this),
            "Recipe not found"
        );
    }

    public async getItemsByCategoryPage(id: string, page: string, limit: string): Promise<IPage<IRecipe>> {
        const errorMsg = validateId(id) || validateId(page) || validateId(limit);
        if (errorMsg) {
            throw new Error(errorMsg);
        }

        return await handleApiRequest<IPage<IRecipe>>(
            () => this.get<IPage<IRecipe>>(`/food/${id}?page=${page}&limit=${limit}`),
            this.handleError.bind(this),
            "Failed to fetch recipes"
        );

    }
}

export default RecipeService;