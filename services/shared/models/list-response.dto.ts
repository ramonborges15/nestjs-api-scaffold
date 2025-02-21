import { ApiProperty } from "@nestjs/swagger";

export class ListResponseDTO<T> {

    @ApiProperty()
    page: number;

    @ApiProperty()
    pageSize: number;

    @ApiProperty({ type: [Object] })
    data: T[];

    @ApiProperty()
    count: number;
}