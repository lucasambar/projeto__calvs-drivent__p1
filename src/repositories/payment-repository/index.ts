import { prisma } from "@/config";
import { PaymentDB } from "@/protocols";

function selectTicketById(id: number) {
  return prisma.ticket.findFirst({
    where: { id },
    include: {
      enrollment: true,
      TicketType: true
    }
  });
}

function insertPayment(body: PaymentDB) {
  return prisma.payment.create({
    data: body
  });
}

function updateStatus(id: number) {
  return prisma.ticket.update({
    where: {
      id: id,
    },
    data: {
      status: "PAID"
    }
  });
}

function selectPayment(id: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId: id
    }
  });
}

const paymentRepository = {
  selectTicketById,
  insertPayment,
  updateStatus,
  selectPayment
};

export default paymentRepository;
