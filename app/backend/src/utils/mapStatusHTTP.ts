enum httpCodeMap {
  SUCCESSFUL = 200,
  CREATED = 201,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INVALID_VALUE = 422,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500,
}

export type TypeCode = keyof typeof httpCodeMap;

export const mapStatusHTTP = (status: TypeCode) => httpCodeMap[status] || 500;
