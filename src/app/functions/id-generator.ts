export const getId = (): string =>
  (Math.random() + 1).toString(36).substring(2);
