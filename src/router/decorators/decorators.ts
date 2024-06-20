import {  CONTROLLER_METADATA, ROUTE_METADATA, RequestMethod } from "./http";


export const controller = (path: string): ClassDecorator => {
  return (target) => {
    Reflect.defineMetadata(CONTROLLER_METADATA, path, target);
  };
};


export const http = (method: RequestMethod, path: string): MethodDecorator => {
  return (target, key, descriptor) => {
    const routes = Reflect.getMetadata(ROUTE_METADATA, target.constructor) || [];
    routes.push({ method: method, path, handler: key });
    Reflect.defineMetadata(ROUTE_METADATA, routes, target.constructor);
  };
}

