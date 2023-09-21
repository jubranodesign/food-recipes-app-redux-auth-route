import { ILogin } from "../../model/ILogin";
import HttpService from "./HttpService";

class AuthenticationService extends HttpService {
    private _urlLogin: string = "";
    private _token: string = "";

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
        //const response = await this.postDataToAPI(this._urlLogin);
        //const data = this.convertResponseToJSON<{ key : Type }>(response);
        const response = await this.fakeAuth<string>('2342f2f1d131rf12');
        this.token = response;
        //set token to axios common header
        //this.setAuthToken(this.token);
        localStorage.setItem("token", this.token);
    }

    public Logout(): void {
        this.token = '';
        localStorage.setItem("token", '');
    }

}

export default AuthenticationService;