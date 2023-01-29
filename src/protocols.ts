export type ApplicationError = {
  name: string;
  message: string;
};

export type ViaCEPAddress = {
  logradouro: string,
  complemento: string,
  bairro: string,
  localidade: string,
  uf: string,
};

export type RequestError = {
  status: number,
  data: object | null,
  statusText: string,
  name: string,
  message: string,
};

export type Ticket = {
  status: string,
  ticketTypeId: number,
  enrollmentId: number
}

export type Payment = {
  ticketId: number,
  cardData: CreditCard
}

export type CreditCard = {
  issuer: string,
  number: number,
  name: string,
  expirationDate: string,
  cvv: number
}

export type PaymentDB = {
  ticketId: number,
  value: number,
  cardIssuer: string,
  cardLastDigits: string
}
