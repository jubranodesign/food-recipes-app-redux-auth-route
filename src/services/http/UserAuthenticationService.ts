import { ILogin } from "../../model/ILogin";
import IUser from "../../model/IUser";
import { removeToken, saveToken } from "../../utils/tokenStorage";
import HttpService from "./HttpService";
import { IAuthenticationService } from "./IAuthenticationService";

class UserAuthenticationService extends HttpService implements IAuthenticationService<ILogin> {
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
        const response = await this.post<ILogin>("/login", LoginData);
        const data = UserAuthenticationService.convertResponseToJSON<IUser>(response);
        this.token = data.token;
        //set token to local Storage
        saveToken(this.token)
    }

    public Logout(): void {
        this.token = '';
        removeToken()
    }

}

export default UserAuthenticationService;