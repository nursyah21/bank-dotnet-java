import { hashSync, compareSync } from 'bcrypt';

export function getPassword(password: string): string {
    return hashSync(password, 10)
}

export function verifyPassword(hashPassword: string, password: string): boolean {
    return compareSync(password, hashPassword)
}