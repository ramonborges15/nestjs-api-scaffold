import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail } from "class-validator";

export default class SendPasswordResetEmailDTO {
    @ApiProperty()
    @IsEmail({}, { message: "Este e-mail é invalido!" })
    @Transform(({ value }) => (typeof value === 'string' ? value.toLowerCase() : value))
    email: string;
}