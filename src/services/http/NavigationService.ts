import { INav } from "../../model/INav";
import HttpService from "./HttpService";
import { IListService } from "./IListService";

class NavigationService extends HttpService implements IListService<INav> {

    constructor(baseURL: string) {
        super(baseURL)
    }

    public async getAll(): Promise<INav[]> {
        const response = await this.get('/');
        const data = NavigationService.convertResponseToJSON<INav[]>(response);
        return data;
    }

}

export default NavigationService;