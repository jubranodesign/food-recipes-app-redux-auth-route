import { INav } from "../../model/INav";
import { Nav } from "../../model/Nav";
import { handleApiRequest } from "../../utils/apiUtils";
import { validateId, validateRequiredFields } from "../../utils/validation";
import HttpService from "./HttpService";
import { IListService } from "./IListService";

class NavigationService extends HttpService implements IListService<INav, any> {

    constructor(baseURL: string) {
        super(baseURL)
    }

    public async getAllItems(): Promise<INav[]> {
        return handleApiRequest<INav[]>(
            () => this.get<INav[]>('/'),
            this.handleError.bind(this),
            "Failed to fetch nav items"
        );
    }

    public async getItem(id: string): Promise<INav> {
        const errorMsg = validateId(id);
        if (errorMsg) {
            throw new Error(errorMsg);
        }

        return handleApiRequest<INav>(
            () => this.get<INav>(`/${id}`),
            this.handleError.bind(this),
            "Nav item not found"
        );
    }

    public async addItem(nav: Nav): Promise<INav> {
        const errorMsg = validateRequiredFields<Nav>(nav, ['name', 'url']);
        if (errorMsg) {
            throw new Error(errorMsg);
        }

        return handleApiRequest<INav>(
            () => this.post<Nav, INav>('/', nav),
            this.handleError.bind(this),
            "Failed to add nav item"
        );
    }

    public async updateItem(id: string, nav: Nav): Promise<INav> {
        const errorMsg = validateId(id) || validateRequiredFields<Nav>(nav, ['name', 'url']);
        if (errorMsg) {
            throw new Error(errorMsg);
        }

        return handleApiRequest<INav>(
            () => this.put<Nav, INav>(`/${id}`, nav),
            this.handleError.bind(this),
            "Failed to update nav item"
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
            "Nav item not found"
        );
    }

}

export default NavigationService;