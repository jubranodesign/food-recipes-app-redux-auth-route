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

    protected async get(url: string): Promise<AxiosResponse> {
        try {
            return await this.client.get(url);
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    protected async post<Type>(url: string, payload: Type): Promise<AxiosResponse> {
        try {
            return await this.client.post(url, payload);
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    protected async put<Type>(url: string, payload: Type): Promise<AxiosResponse> {
        try {
            return await this.client.put(url, payload);
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    protected async delete(url: string): Promise<AxiosResponse> {
        try {
            return await this.client.delete(url);
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