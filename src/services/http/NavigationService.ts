import { INav } from "../../model/INav";
import HttpService from "./HttpService";
import { INavigationService } from "./INavigationService";

class NavigationService extends HttpService implements INavigationService {
    private urlNavigations: string = "";
    private allNavigationCategories: INav[] = [
        {
            id: 1,
            name: "Home",
            url: "/"
        },
        {
            id: 2,
            name: "Gallery",
            url: "/gallery"
        },
        {
            id: 3,
            name: "Add New Category",
            url: "/new-category"
        }
    ]

    constructor(baseURL: string) {
        super(baseURL)
    }

    public async getAllNavigationCategories(): Promise<INav[]> {
        const response = await NavigationService.fakeFetch<INav[]>(this.allNavigationCategories);
        return response;
    }

}

export default NavigationService;