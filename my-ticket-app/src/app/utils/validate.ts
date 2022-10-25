import isEmpty from 'is-empty';

export const existsOrError = (value: any, message: string): void | string => {
  if (isEmpty(value)) throw message;
  if (!value) throw message;
  if (Array.isArray(value) && value.length === 0) throw message;
  if (typeof value === 'string' && !value.trim()) throw message;
  if (typeof value === 'number' && !Number(value)) throw message;
};

export const notExistisOrError = (value: any, message: string): void | string => {
  try {
    existsOrError(value, message);
  } catch (message) {
    return;
  }

  throw message;
};

export const equalsOrError = (valueA: any, valueB: any, message: string): void | string => {
  if (valueA !== valueB) throw message;
};
