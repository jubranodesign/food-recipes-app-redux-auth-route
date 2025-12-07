
export interface IAuthenticationService<Type> {
    Login(LoginData: Type): Promise<string>
    Logout(): void
}