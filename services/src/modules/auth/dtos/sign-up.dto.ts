import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export default class SignUpDTO {

    @ApiProperty()
    @IsEmail({}, { message: 'E-mail inválido' })
    @Transform(({ value }) => (typeof value === 'string' ? value.toLowerCase() : value))
    email: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Senha é obrigatória' })
    password: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Nome é obrigatório' })
    @IsString({ message: 'Nome deve ser string' })
    @Transform(({ value }) => {
        if (typeof value === 'string') {
            return value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
        }
        return value;
    })
    name: string;
}