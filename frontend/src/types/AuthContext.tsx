export default interface AuthContextType {
    auth: { token: string } | null;
    login: (token: string) => void;
    logout: () => void;
}