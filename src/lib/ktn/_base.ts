export const definePropertyIfNotExists = (obj: any, p: PropertyKey, attributes: PropertyDescriptor & ThisType<any>) => {
  if (p in obj) return;
  Object.defineProperty(obj, p, attributes);
}
