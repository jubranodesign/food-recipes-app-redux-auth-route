import Food from "../../model/Food";
import IFood from "../../model/IFood";
import HttpService from "./HttpService";
import { IListService } from "./IListService";

class FoodService extends HttpService implements IListService<IFood, Food> {

    constructor(baseURL: string) {
        super(baseURL)
    }

    public async getAllItems(): Promise<IFood[]> {
        const response = await this.get('/');
        return FoodService.convertResponseToJSON<IFood[]>(response);
    }

    public async getItem(id: string): Promise<IFood> {
        const response = await this.get(`/${id}`);
        return FoodService.convertResponseToJSON<IFood>(response);
    }

    public async addItem(food: Food): Promise<IFood> {
        const response = await this.post<Food>('/', food);
        return FoodService.convertResponseToJSON<IFood>(response);
    }

    public async updateItem(id: string, food: Food): Promise<IFood> {
        const response = await this.put<Food>(`/${id}`, food);
        return FoodService.convertResponseToJSON<IFood>(response);
    }

    public async deleteItem(id: string): Promise<string> {
        const response = await this.delete(`/${id}`);
        return FoodService.convertResponseToJSON<string>(response);
    }
}

export default FoodService;