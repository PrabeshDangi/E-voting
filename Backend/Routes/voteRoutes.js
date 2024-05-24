import { authorizeRoles, verifyJWT } from "../Middlewares/authMiddleware.js";
import { Router } from "express";
import {
  createVote,
  getTotalVote,
  getVoteCountById,
} from "../Controllers/voteController.js";

const router = Router();
//Only for logged-in user
router
  .route("/createvote")
  .post(verifyJWT, authorizeRoles("voter"), createVote);

router
  .route("/getvotecount/:id")
  .get(verifyJWT, authorizeRoles("admin"), getVoteCountById);

router
  .route("/totalvote")
  .get(verifyJWT, authorizeRoles("admin"), getTotalVote);

export { router as VoteRoute };
