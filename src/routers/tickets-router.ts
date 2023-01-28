import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";

const ticketRouter = Router();

ticketRouter
  .all("/*", authenticateToken)
  .get("/types");

export default ticketRouter;
