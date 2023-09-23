import { ILogin } from "../../model/ILogin";
import HttpService from "./HttpService";
import { IAuthenticationService } from "./IAuthenticationService";

class LoginAuthenticationService extends HttpService implements IAuthenticationService<ILogin> {
    private _token: string = "";

    constructor(baseURL: string) {
        super(baseURL)
    }

    /**
     * Getter token
     * @return {string }
     */
    public get token(): string {
        return this._token;
    }

    /**
     * Setter token
     * @param {string | null} value
     */
    public set token(value: string) {
        this._token = value;
    }

    public async Login(LoginData: ILogin): Promise<void> {
        //const response = await this.post<ILogin>(this._urlLogin);
        //const data = AuthenticationService.convertResponseToJSON<ILogin>(response);
        const response = await LoginAuthenticationService.fakeFetch<string>('2342f2f1d131rf12');
        this.token = response;
        //set token to axios common header
        //AuthenticationService.setAuthToken(this.token);
        localStorage.setItem("token", this.token);
    }

    public Logout(): void {
        this.token = '';
        localStorage.setItem("token", '');
    }

}

export default LoginAuthenticationService;