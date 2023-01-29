import { CreditCard, Payment } from "@/protocols";
import paymentRepository from "@/repositories/payment-repository";
import { wrongData, notFound, unauthorized } from "./error";

async function get(ticketId: number, userId: number) {
  if (!ticketId) throw wrongData("There is no ticket id to search.");

  const ticket = await paymentRepository.selectTicketById(ticketId);
  if (!ticket) throw notFound("ticket not found in database");
  if (ticket.enrollment.userId !== userId) throw unauthorized();

  return await paymentRepository.selectPayment(ticketId);
}

function validateCreditCard(card: CreditCard) {
  const { issuer, name, number, expirationDate, cvv } = card;

  if (!issuer || !name) throw wrongData("Missing issuer or name informations");

  if (number/(10**15) >= 10 || number/(10**15) < 0 || isNaN(number)) throw wrongData("Invalid format of credit card number.");
  if (cvv/(10**3) > 10 || cvv/(10**3) < 0 || isNaN(cvv)) throw wrongData("Invalid format of credit card cvv.");

  if (!expirationDate) throw wrongData("Missing expiration date of credit card");
  const date = expirationDate.split("/");
  if (Number(date[0]) < 0 || Number(date[0]) > 12) throw wrongData("Invalid format of credit card expiration date.");
  if (Number(date[1]) < 23) throw wrongData("Credit card already expirated.");

  const arrCard = (JSON.stringify(number)).split("");
  const cardLastDigits = [arrCard[12], arrCard[13], arrCard[14], arrCard[15]].join("");
  return cardLastDigits;
}

async function post(body: Payment, userId: number) {
  let { ticketId } = body;
  
  if (! ticketId || isNaN(ticketId)) throw wrongData("Missing ticketId or it's in a invalid format");
  ticketId = Number(ticketId);
  
  const ticket = await paymentRepository.selectTicketById(ticketId);
  if (!ticket) throw notFound("Ticket not found in database.");
  if (ticket.enrollment.userId !== userId) throw unauthorized();

  if (!body.cardData) throw wrongData("Missing credit card informations");
  const cardLastDigits = validateCreditCard(body.cardData);

  const db = {
    ticketId,
    value: ticket.TicketType.price,
    cardIssuer: body.cardData.issuer,
    cardLastDigits
  };
  await paymentRepository.insertPayment(db);
  await paymentRepository.updateStatus(ticketId);

  return await paymentRepository.selectPayment(ticketId);
}

const paymentServices = {
  get,
  post
};

export default paymentServices;
