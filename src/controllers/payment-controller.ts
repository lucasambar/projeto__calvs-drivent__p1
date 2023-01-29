import paymentServices from "@/services/payment-services";
import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";

export async function postPayment(req: AuthenticatedRequest, res: Response) {
  const body = req.body;
  const userId = req.userId;
  const reponse = await paymentServices.post(body, userId);
  res.send(reponse);
}

export async function getPayment(req: AuthenticatedRequest, res: Response) {
  const ticketId = Number(req.query.ticketId);
  const userId = req.userId;
  const response = await paymentServices.get(ticketId, userId);
  res.send(response);
}
