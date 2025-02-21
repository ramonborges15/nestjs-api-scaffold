import * as bcrypt from 'bcrypt';
import { HashProvider } from "../hash.provider";

export default class BCryptHashProvider implements HashProvider {
    public async generateHash(payload: string): Promise<string> {
        const saltOrRounds = 10;
        return bcrypt.hash(payload, saltOrRounds);
    }

    public async compareHash(payload: string, hashed: string): Promise<boolean> {
        return bcrypt.compare(payload, hashed);
    }
}
