import { hashSync } from 'bcrypt';

export function getPassword(password: string): string {
    return hashSync(password, 10)
}
