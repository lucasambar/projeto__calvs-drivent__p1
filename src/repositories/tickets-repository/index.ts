import { Prisma } from "@prisma/client";
import { prisma } from "@/config";

function selectTypes() {
  return prisma.
}

const ticketsRepository = {
  selectTypes,
}

export default ticketsRepository