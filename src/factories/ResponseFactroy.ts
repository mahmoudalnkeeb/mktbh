type Status = "OK" | "ERROR" | "UNKNOWN";

const STATUS_CODES_ERROR = [
  400, 401, 403, 404, 405, 408, 409, 410, 413, 414, 415, 429, 500, 501, 502,
  503, 504,
];

const STATUS_CODES_OK = [200, 201, 202, 204, 206];

const STATUS_MAP: { [code: number]: string } = {
  200: "OK",
  201: "Created",
  202: "Accepted",
  204: "No Content",
  206: "Partial Content",
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  408: "Request Timeout",
  409: "Conflict",
  410: "Gone",
  413: "Payload Too Large",
  414: "URI Too Long",
  415: "Unsupported Media Type",
  429: "Too Many Requests",
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
};

class ResponseFactory {
  static create(statusCode: number, message?: string): CustomResponse {
    if (typeof statusCode !== "number" || !Number.isInteger(statusCode)) {
      throw new Error(
        "statusCode required and must be an integer number to construct response"
      );
    }

    const status = STATUS_CODES_OK.includes(statusCode)
      ? "OK"
      : STATUS_CODES_ERROR.includes(statusCode)
      ? "ERROR"
      : "UNKNOWN";

    message = message || STATUS_MAP[statusCode] || "Unknown Status";

    return new CustomResponse(status, statusCode, message);
  }
}

class CustomResponse {
  status: Status;
  statusCode: number;
  message: string;

  constructor(status: Status, statusCode: number, message: string) {
    this.status = status;
    this.statusCode = statusCode;
    this.message = message;
  }
}

export default ResponseFactory;
