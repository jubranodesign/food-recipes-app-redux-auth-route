import { INav } from "../../model/INav";
import HttpService from "./HttpService";
import { IListService } from "./IListService";

class NavigationService extends HttpService implements IListService<INav, any> {

    constructor(baseURL: string) {
        super(baseURL)
    }

    public async getAllItems(): Promise<INav[]> {
        const response = await this.get('/');
        return NavigationService.convertResponseToJSON<INav[]>(response);
    }

    public async getItem(id: string): Promise<INav> {
        const response = await this.get(`/${id}`);
        return NavigationService.convertResponseToJSON<INav>(response);
    }

    public async addItem(nav: any): Promise<INav> {
        const response = await this.post<any>('/', nav);
        return NavigationService.convertResponseToJSON<INav>(response);
    }

    public async updateItem(id: string, nav: any): Promise<INav> {
        const response = await this.put<any>(`/${id}`, nav);
        return NavigationService.convertResponseToJSON<INav>(response);
    }

    public async deleteItem(id: string): Promise<string> {
        const response = await this.delete(`/${id}`);
        return NavigationService.convertResponseToJSON<string>(response);
    }

}

export default NavigationService;