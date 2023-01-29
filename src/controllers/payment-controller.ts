import paymentServices from "@/services/payment-services";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";

export async function postPayment(req: AuthenticatedRequest, res: Response) {
  const body = req.body;
  const userId = req.userId;
  const reponse = await paymentServices.post(body, userId);
  res.send(reponse);
}
