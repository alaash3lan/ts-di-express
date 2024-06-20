import { UserController } from "./controllers/userController";
import { Container } from "./di/container";
import { TYPES } from "./di/types";
import { UserService } from "./services/UserService";
import { IUserService } from "./services/interfaces/IUserService";


const container = new Container();

container.register<IUserService>("UserService", UserService)
container.register<UserController>("UserController", UserController)

export default container ;

