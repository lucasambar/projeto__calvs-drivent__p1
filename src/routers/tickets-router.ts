import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getTicketsType, getTickets, postTicket } from "@/controllers/tickets-controller";
import { ticketSchema } from "@/schemas";

const ticketRouter = Router();

ticketRouter
  .all("/*", authenticateToken)
  .get("/types", getTicketsType)
  .get("/", getTickets)
  .post("/", validateBody(ticketSchema), postTicket);

export { ticketRouter };
