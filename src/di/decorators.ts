export const Injectable = (): ClassDecorator => {
  return target => {};
};

export const Inject = (serviceIdentifier: string): ParameterDecorator => {
  return (target, propertyKey, parameterIndex) => {
    const existingInjectedServices = Reflect.getOwnMetadata('injectedServices', target) || [];
    existingInjectedServices.push({ index: parameterIndex, serviceIdentifier });
    Reflect.defineMetadata('injectedServices', existingInjectedServices, target);
  };
};
