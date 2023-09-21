import axios from "axios";

abstract class HttpService {

    protected async fetchDataFromAPI(url: string): Promise<Response> {
        return await axios(url);
    }

    protected async postDataToAPI(url: string): Promise<Response> {
        return await axios(url);
    }

    protected convertResponseToJSON<Type>(res: any): Type {
        return res.data;
    }

    public setAuthToken(tok: string): void {
        if (tok) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${tok}`;
        }
        else
            delete axios.defaults.headers.common["Authorization"];
    }

    protected async fakeAuth<Type>(val: Type): Promise<Type> {
        return new Promise((resolve) => {
            setTimeout(() => resolve(val), 250);
        });
    }

}

export default HttpService;