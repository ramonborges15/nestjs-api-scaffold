import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";


export default class SignInDTO {

    @ApiProperty()
    @IsEmail()
    @Transform(({ value }) => (typeof value === 'string' ? value.toLowerCase() : value))
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;
}