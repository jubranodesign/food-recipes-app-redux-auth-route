import axios, { AxiosInstance } from "axios";
import { IHttpService } from "./IHttpService";

abstract class HttpService implements IHttpService {
    private _baseURL: string = "";
    private _client: AxiosInstance = axios.create();

    constructor(baseURL: string) {
        this.baseURL = baseURL;
        this.client = this._client;
        this.client.defaults.baseURL = baseURL;
    }

    /**
     * Getter baseURL
     * @return {string }
     */
    private get baseURL(): string {
        return this._baseURL;
    }

    /**
     * Setter baseURL
     * @param {string } value
     */
    private set baseURL(value: string) {
        this._baseURL = value;
    }

    /**
     * Getter client
     * @return {AxiosInstance}
     */
    private get client(): AxiosInstance {
        return this._client;
    }

    /**
     * Setter client
     * @param {AxiosInstance} value
     */
    private set client(value: AxiosInstance) {
        this._client = value;
    }

    protected async get(url: string): Promise<Response> {
        return await this.client.get(url);
    }

    protected async post<Type>(url: string, payload: Type): Promise<Response> {
        return await this.client.post(url, payload);
    }

    protected async put<Type>(url: string, payload: Type): Promise<Response> {
        return await this.client.put(url, payload);
    }

    protected async delete(url: string): Promise<Response> {
        return await this.client.delete(url);
    }

    protected static convertResponseToJSON<Type>(res: any): Type {
        return res.data;
    }

    public setAuthToken(tokn: string): void {
        if (tokn) {
            this.client.defaults.headers.common["Authorization"] = `Bearer ${tokn}`;
        }
        else
            delete this.client.defaults.headers.common["Authorization"];
    }

    protected static async fetchDataFromAPI(url: string): Promise<Response> {
        return await axios(url);
    }

    // fake fetch only for test
    protected static async fakeFetch<Type>(val: Type): Promise<Type> {
        return new Promise((resolve) => {
            setTimeout(() => resolve(val), 250);
        });
    }

}

export default HttpService;