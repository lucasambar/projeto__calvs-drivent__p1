import ticketsRepository from "@/repositories/tickets-repository";
import { notFoundError } from "@/errors";
import notFound from "./error";
async function getTypes() {
  return ticketsRepository.selectTypes();
}

async function getTickets(id: number) {
  const enrollment = await ticketsRepository.findEnrollmentByUserId(id);
  if (!enrollment) throw notFound("Enrollment not found in database.");

  const tickets = await ticketsRepository.selectTickets(enrollment.id);
  if ( tickets.length === 0 ) {
    throw notFoundError();
  }
  return tickets;
}

async function post(userId: number, ticketTypeId: number) {
  const enrollment = await ticketsRepository.findEnrollmentByUserId(userId);
  if (!enrollment) throw notFound("Enrollment not found in database.");

  const type = await ticketsRepository.findTypeById(ticketTypeId);
  if ( !type ) throw notFound("Ticket type not found in database.");

  const body = {
    status: "RESERVED",
    ticketTypeId,
    enrollmentId: enrollment.id,
  };
  await ticketsRepository.createTicket(body);
  
  const tickets = await ticketsRepository.selectTickets(enrollment.id);
  return tickets[tickets.length -1];
}

const ticketService = {
  getTypes,
  getTickets,
  post
};

export default ticketService;
