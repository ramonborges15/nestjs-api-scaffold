import { ApiProperty } from "@nestjs/swagger";

export default class UserDto {

    @ApiProperty()
    public uuid: string;

    @ApiProperty()
    public name: string;

    @ApiProperty()
    public email: string;
}