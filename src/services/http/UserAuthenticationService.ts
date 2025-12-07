import { ILogin } from "../../model/ILogin";
import IUser from "../../model/IUser";
import { handleApiRequest } from "../../utils/apiUtils";
import { removeToken, saveToken } from "../../utils/tokenStorage";
import { validateRequiredFields } from "../../utils/validation";
import HttpService from "./HttpService";
import { IAuthenticationService } from "./IAuthenticationService";

class UserAuthenticationService extends HttpService implements IAuthenticationService<ILogin> {
    constructor(baseURL: string) {
        super(baseURL)
    }

    public async Login(LoginData: ILogin): Promise<string> {
        const errorMsg = validateRequiredFields<ILogin>(LoginData, ['userName', 'password']);
        if (errorMsg) {
            throw new Error(errorMsg);
        }

        const response = await handleApiRequest<IUser>(
            () => this.post<ILogin, IUser>("/login", LoginData),
            this.handleError.bind(this),
            "Login failed"
        );

        // Save token to localStorage
        saveToken(response.token);
        
        // Return token directly
        return response.token;
    }

    public Logout(): void {
        removeToken();
    }

}

export default UserAuthenticationService;