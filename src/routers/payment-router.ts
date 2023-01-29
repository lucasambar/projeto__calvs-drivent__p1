import express from "express";
import { authenticateToken } from "@/middlewares";
import { postPayment } from "@/controllers/payment-controller";

const paymentRouter = express.Router();

paymentRouter
  .all("/*", authenticateToken)
  .get("/",)
  .post("/process", postPayment);

export { paymentRouter };
