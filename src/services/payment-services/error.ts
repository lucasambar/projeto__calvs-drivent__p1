export function wrongData(message: string) {
  return {
    name: "invalidPaymentFormat",
    message
  };
}

export function notFound(message: string) {
  return {
    name: "NotFoundError",
    message
  };
}

export function unauthorized() {
  return {
    name: "UnauthorizedError",
    message: "You don't own this ticket"
  };
}
