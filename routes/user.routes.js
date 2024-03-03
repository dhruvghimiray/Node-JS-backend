import express from "express";
import {
  addUser,
  loginUser,
  currentUser,
} from "../controllers/user.controller.js";

import { validateToken } from "../middleware/validateToken.js";
const router = express.Router();

// router.get("/:id", getProduct);
router.post("/createUser", addUser);
router.post("/loginUser", loginUser);
router.get("/current", validateToken, currentUser);

export default router;
