import express from "express";
import { authenticateToken } from "@/middlewares";
import { getPayment, postPayment } from "@/controllers/payment-controller";

const paymentRouter = express.Router();

paymentRouter
  .all("/*", authenticateToken)
  .get("/", getPayment)
  .post("/process", postPayment);

export { paymentRouter };
