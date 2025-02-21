export interface JwtDecodedDTO {
    email: string,
    sub: string,
    firstName: string,
    lastName: string,
    iat: number,
    exp: number
}