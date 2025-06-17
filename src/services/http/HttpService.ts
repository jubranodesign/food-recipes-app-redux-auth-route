import axios, { AxiosInstance, AxiosResponse } from "axios";
import { getToken } from "../../utils/tokenStorage";

abstract class HttpService {
    private _baseURL: string = "";
    private _client: AxiosInstance = axios.create();

    constructor(baseURL: string) {
        this.baseURL = baseURL;
        this.client = this._client;

        this.client.interceptors.request.use((config) => {
            const token = getToken()
            if (token) {
                config.headers = config.headers || {};
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
    }

    /**
     * Getter baseURL
     * @return {string }
     */
    protected get baseURL(): string {
        return this._baseURL;
    }

    /**
     * Setter baseURL
     * @param {string } value
     */
    protected set baseURL(value: string) {
        this._baseURL = value;
        this._client.defaults.baseURL = value;
    }

    /**
     * Getter client
     * @return {AxiosInstance}
     */
    protected get client(): AxiosInstance {
        return this._client;
    }

    /**
     * Setter client
     * @param {AxiosInstance} value
     */
    protected set client(value: AxiosInstance) {
        this._client = value;
    }

    protected async get<T>(url: string): Promise<T> {
        try {
            const response = await this.client.get(url);
            return HttpService.convertResponseToJSON<T>(response)
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    protected async post<T, D>(url: string, payload: T): Promise<D> {
        try {
            const response = await this.client.post(url, payload);
            return HttpService.convertResponseToJSON<D>(response)
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    protected async put<T, D>(url: string, payload: T): Promise<D> {
        try {
            const response = await this.client.put(url, payload);
            return HttpService.convertResponseToJSON<D>(response)
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    protected async delete<T>(url: string): Promise<T> {
        try {
            const response = await this.client.delete(url);
            return HttpService.convertResponseToJSON<T>(response)
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    protected handleError(error: unknown): void {
        // כאן אפשר להוסיף לוג, שליחת טלמטריה, או עיבוד שגיאה מותאם
        if (axios.isAxiosError(error)) {
            console.error('HTTP error:', error.response?.status, error.message);
        } else {
            console.error('Unknown error:', error);
        }
    }

    protected static convertResponseToJSON<Type>(res: any): Type {
        return res.data;
    }

    public setAuthToken(tokn: string | undefined): void {
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