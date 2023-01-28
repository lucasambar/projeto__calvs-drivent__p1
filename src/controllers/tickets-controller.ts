import ticketService from "@/services/tickets-service";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";

export async function getTicketsType(req: Request, res: Response) {
  const response = await ticketService.getTypes();
  res.send(response);
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const id = req.userId;
  const response = await ticketService.getTickets(id);
  res.send(response);
}
