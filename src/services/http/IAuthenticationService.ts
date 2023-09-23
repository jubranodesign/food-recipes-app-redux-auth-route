
export interface IAuthenticationService<Type> {
    token: string
    Login(LoginData: Type): Promise<void>
    Logout(): void
}