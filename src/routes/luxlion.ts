import { Router } from "express";
import luxlions from "../controllers/luxlions/luxlions.js";
import { authenticateJwt } from "../middleware/authenticateJwt.js";

const luxlionsRouter = Router();

luxlionsRouter.get("/nft", luxlions.getAccountNftsByGender);
luxlionsRouter.post("/nft", authenticateJwt, luxlions.mint);

export default luxlionsRouter;
