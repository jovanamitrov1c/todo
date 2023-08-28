export const getId = (): string => {
  const date = new Date();
  return date.toISOString();
};
