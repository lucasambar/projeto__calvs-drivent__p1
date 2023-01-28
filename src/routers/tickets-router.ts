import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getTicketsType, getTickets } from "@/controllers/tickets-controller";
const ticketRouter = Router();

ticketRouter
  .all("/*", authenticateToken)
  .get("/types", getTicketsType)
  .get("/", getTickets);

export { ticketRouter };
