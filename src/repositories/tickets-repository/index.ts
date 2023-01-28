import { prisma } from "@/config";
import { Ticket } from "@/protocols";
import { PrismaPromise } from "@prisma/client";
import { TicketType } from "@prisma/client";

function selectTypes(): PrismaPromise<TicketType[]> {
  return prisma.ticketType.findMany();
}

function selectTickets(id: number) {
  return prisma.ticket.findMany({
    where: { 
      enrollmentId: id,
    },
    include: {
      TicketType: true
    }
  });
}

function findEnrollmentByUserId(id: number) {
  return prisma.enrollment.findFirst({
    where: {
      userId: id
    }
  });
}

function findTypeById(id: number) {
  return prisma.ticketType.findFirst({
    where: {
      id,
    }
  });
}

function createTicket(body: Ticket) {
  return prisma.ticket.create({
    data: body
  });
}

const ticketsRepository = {
  selectTypes,
  selectTickets,
  findEnrollmentByUserId,
  findTypeById,
  createTicket
};

export default ticketsRepository;
