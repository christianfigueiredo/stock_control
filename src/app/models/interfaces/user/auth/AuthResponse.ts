export interface AuthResponse {
    id: number;
    nome: string;
    email: string;
    token: string; // token jwt do usuario
}