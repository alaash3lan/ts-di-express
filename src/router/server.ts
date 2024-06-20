import express from "express";
import { Container } from "../di/container";
import { CONTROLLER_METADATA, ROUTE_METADATA } from "./decorators/http";
import IController from "../controllers/controller";


interface RouteMetadata {
    method: string;
    path: string;
    handler: string;
}


export class ExpressServer {
  private app: express.Application;

  constructor(private container: Container) {
    this.app = express();
  }

  setConfig(callback: (app: express.Application) => void): void {
    callback(this.app);
  }

  build(): express.Application {
    const controllers = this.container.getControllers();
    controllers.forEach(Controller => {
      const basePath = Reflect.getMetadata(CONTROLLER_METADATA, Controller);
      const routes = Reflect.getMetadata(ROUTE_METADATA, Controller) || [];
      const instance = this.container.resolve<IController>(Controller.name);
     
      routes.forEach(({ method, path, handler }: RouteMetadata) => {
        if (typeof instance[handler] === 'function') {
          this.app[method as keyof express.Application](basePath + path, instance[handler].bind(instance));
        } else {
          console.error(`Handler method ${handler} is not a function on controller ${Controller.name}`);
        }
      });
    });

    return this.app;
  }
}