import Food from "../../model/Food";
import IFood from "../../model/IFood";
import { validateId, validateRequiredFields } from "../../utils/validation";
import HttpService from "./HttpService";
import { IListService } from "./IListService";
import { handleApiRequest } from "../../utils/apiUtils";

class FoodService extends HttpService implements IListService<IFood, Food> {

    constructor(baseURL: string) {
        super(baseURL)
    }

    public async getAllItems(): Promise<IFood[]> {
        return handleApiRequest<IFood[]>(
            () => this.get<IFood[]>('/'),
            this.handleError.bind(this),
            "Failed to fetch foods"
        );
    }

    public async getItem(id: string): Promise<IFood> {
        const errorMsg = validateId(id);
        if (errorMsg) {
            throw new Error(errorMsg);
        }

        return handleApiRequest<IFood>(
            () => this.get<IFood>(`/${id}`),
            this.handleError.bind(this),
            "Food not found"
        );
    }

    public async addItem(food: Food): Promise<IFood> {
        const errorMsg = validateRequiredFields<Food>(food, ['name']);
        if (errorMsg) {
            throw new Error(errorMsg);
        }

        return handleApiRequest<IFood>(
            () => this.post<Food, IFood>('/', food),
            this.handleError.bind(this),
            "Failed to add food"
        );
    }

    public async updateItem(id: string, food: Food): Promise<IFood> {
        const errorMsg = validateId(id) || validateRequiredFields<Food>(food, ['name']);
        if (errorMsg) {
            throw new Error(errorMsg);
        }
        return handleApiRequest<IFood>(
            () => this.put<Food, IFood>(`/${id}`, food),
            this.handleError.bind(this),
            "Food not found"
        );
    }

    public async deleteItem(id: string): Promise<string> {
        const errorMsg = validateId(id);
        if (errorMsg) {
            throw new Error(errorMsg);
        }

        return handleApiRequest<string>(
            () => this.delete<string>(`/${id}`),
            this.handleError.bind(this),
            "Food not found"
        );
    }
}

export default FoodService;