import { UserController } from "../controllers/userController";

export const TYPES = {
    UserController : Symbol.for('UserController'),
    UserService : Symbol.for('UserService'),
    AuthService : Symbol.for('AuthService'),
}
