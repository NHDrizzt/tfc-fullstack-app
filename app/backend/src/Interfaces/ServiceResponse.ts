import { TypeCode } from '../utils/mapStatusHTTP';

export type ServiceMessage = { message: string };

export type ServiceResponseError = {
  status: TypeCode,
  data: ServiceMessage
};

export type ServiceResponseSuccess<T> = {
  status: 'SUCCESSFUL',
  data: T
};

export type ServiceResponseGeneric<T> = {
  status: TypeCode,
  data: T | ServiceMessage
};

export type ServiceResponse<T> = ServiceResponseError
| ServiceResponseSuccess<T> | ServiceResponseGeneric<T>;
