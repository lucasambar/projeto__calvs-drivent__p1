import ticketsRepository from "@/repositories/tickets-repository";
import { notFoundError } from "@/errors";
async function getTypes() {
  return ticketsRepository.selectTypes();
}

async function getTickets(id: number) {
  const tickets = await ticketsRepository.selectTickets(id);
  if ( tickets.length === 0 ) {
    throw notFoundError();
  }
  return tickets;
}

const ticketService = {
  getTypes,
  getTickets
};

export default ticketService;
