import { INav } from "../../model/INav";
import HttpService from "./HttpService";

class NavigationService extends HttpService {
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

    public async getAllNavigationCategories(): Promise<INav[]> {
        const response = await this.fakeAuth<INav[]>(this.allNavigationCategories);
        return response;
    }

}

export default NavigationService;