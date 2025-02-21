import { applyDecorators, Type } from "@nestjs/common";
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from "@nestjs/swagger";
import { ListResponseDTO } from "shared/models/list-response.dto";


export const ApiOkListResponsePaginated = <DataDTO extends Type<unknown>>(dataDTO: DataDTO) =>
    applyDecorators(
        ApiExtraModels(ListResponseDTO, dataDTO),
        ApiOkResponse({
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ListResponseDTO) },
                    {
                        properties: {
                            data: {
                                type: 'array',
                                items: { $ref: getSchemaPath(dataDTO) }
                            }
                        }
                    }
                ]
            }
        })
    )