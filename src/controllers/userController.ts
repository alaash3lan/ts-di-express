import { Request, Response } from "express";
import { IUserService } from "../services/interfaces/IUserService";
import { Inject, Injectable } from "../di/decorators";
import { controller, http } from "../router/decorators/decorators";
import { RequestMethod } from "../router/decorators/http";
import IController from "./controller";

@Injectable()
@controller("/users")
export class UserController implements IController {
  constructor(@Inject("UserService") private userService: IUserService) { }

  @http(RequestMethod.GET, "/:id")
  public getUser(req: Request, res: Response): void {
    const user = this.userService.getUser(req.params.id);
    res.send(user);
  }
}
