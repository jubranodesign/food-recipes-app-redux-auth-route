import { AxiosResponse } from "axios";

export interface IHttpService {
    get(url: string): Promise<AxiosResponse>;
    post<T>(url: string, payload: T): Promise<AxiosResponse>;
    put<T>(url: string, payload: T): Promise<AxiosResponse>;
    delete(url: string): Promise<AxiosResponse>;
}