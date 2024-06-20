import { CONTROLLER_METADATA } from '../router/decorators/http';

type Constructor<T> = new (...args: any[]) => T;

export class Container {
  public services: Map<string, Constructor<any>> = new Map();

  register<T>(name: string, service: Constructor<T>): void {
    this.services.set(name, service);
  }

  resolve<T>(name: string): T {
    const service = this.services.get(name);
    if (!service) {
      throw new Error(`Service ${name} not found`);
    }

    const injectedServices = Reflect.getMetadata('injectedServices', service) || [];
    const injections = injectedServices.map((dep: any) => this.resolve(dep.serviceIdentifier));

    return new service(...injections);
  }

  getControllers(): Constructor<any>[] {
    return Array.from(this.services.values()).filter(service => {
      return Reflect.hasMetadata(CONTROLLER_METADATA, service);
    });
  }
}

