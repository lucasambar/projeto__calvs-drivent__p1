import { prisma } from "@/config";
import { PrismaPromise } from "@prisma/client";
import { TicketType } from "@prisma/client";

function selectTypes(): PrismaPromise<TicketType[]> {
  return prisma.ticketType.findMany();
}

function selectTickets(id: number) {
  return prisma.ticket.findMany({
    where: { id },
    include: {
      TicketType: true
    }
  });
}

const ticketsRepository = {
  selectTypes,
  selectTickets
};

export default ticketsRepository;
