import { ILogin } from "../../model/ILogin"

export interface IAuthenticationService {
    token: string
    Login(LoginData: ILogin): Promise<void>
    Logout(): void
}