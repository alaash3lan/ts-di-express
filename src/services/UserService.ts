import { IUserService } from "./interfaces/IUserService";

export class UserService implements IUserService {
    getUser(id: string): string {
        return `User ${id}`;
    }
}