import UserDto from "../dtos/user.dto";
import { User } from "../entities/user.entity";

export class UserViewModel {

    static toDto(user: User): UserDto {
        return {
            uuid: user.uuid,
            name: user.name,
            email: user.email
        };
    }
}