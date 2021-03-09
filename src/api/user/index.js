import { Router } from "express";
import {
  password as passwordAuth,
  master,
  token,
} from "../../services/passport";
import { showMe, register, update, updatePassword } from "./controller";

const router = new Router();

router.get("/me", token({ required: true }), showMe);
router.post("/register", master(), register);
router.put("/:id", token({ required: true }), update);
router.put("/:id/password", passwordAuth(), updatePassword);

export default router;
