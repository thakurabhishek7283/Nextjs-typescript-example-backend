import { Router } from "express";
import { signIn_C, signUp_C } from "../controller/auth";

const router = Router();

router.post("/signup", signUp_C);
router.post("/signin", signIn_C);

export default router;
