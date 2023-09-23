import { INav } from "../../model/INav";

export interface INavigationService {
    getAllNavigationCategories(): Promise<INav[]>
}