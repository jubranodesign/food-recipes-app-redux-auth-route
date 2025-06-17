import { ILogin } from "../../model/ILogin";
import IUser from "../../model/IUser";
import { handleApiRequest } from "../../utils/apiUtils";
import { removeToken, saveToken } from "../../utils/tokenStorage";
import { validateRequiredFields } from "../../utils/validation";
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
        const errorMsg = validateRequiredFields<ILogin>(LoginData, ['userName', 'password']);
        if (errorMsg) {
            throw new Error(errorMsg);
        }

        const response = await handleApiRequest<IUser>(
            () => this.post<ILogin, IUser>("/login", LoginData),
            this.handleError.bind(this),
            "Login failed"
        );

        this.token = response.token;
        //set token to local Storage
        saveToken(this.token)
    }

    public Logout(): void {
        this.token = '';
        removeToken()
    }

}

export default UserAuthenticationService;