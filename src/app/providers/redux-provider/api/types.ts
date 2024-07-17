export interface AuthorizationCredentialsRequest {
    login: string;
    password: string;
}

export interface TokenResponse {
    token: string;
}
