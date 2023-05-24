import jwt_decode from "jwt-decode";
export class TokenUtils {

    static isTokenExpired(token: string): boolean {
        const decodedToken: any = jwt_decode(token);
        return decodedToken.exp < Date.now() / 1000;
    }
}
