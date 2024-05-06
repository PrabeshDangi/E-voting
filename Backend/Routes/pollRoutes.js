import { Router } from "express";
const router = Router();
import { authorizeRoles, verifyJWT } from "../Middlewares/authMiddleware.js";

import {
  createCandidate,
  deleteCandidate,
  getAllCandidates,
  getCandidateById,
  updateCandidate,
} from "../Controllers/pollController.js";

router.route("/getallcandidate").get(getAllCandidates);
router.route("/getcandidate").get(getCandidateById);

//Private Routes
router
  .route("/createcandidate")
  .post(verifyJWT, authorizeRoles("admin"), createCandidate);
router
  .route("/updatecandidate/:id")
  .post(verifyJWT, authorizeRoles("admin"), updateCandidate);
router
  .route("/deletecandidate/:id")
  .post(verifyJWT, authorizeRoles("admin"), deleteCandidate);

export { router as PollRoute };
