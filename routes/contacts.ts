import { Router } from "express";
import {
  fetchContactList,
  updateContact,
  createContact,
  deleteContact,
} from "../controller/contacts";
import auth from "../middleware/auth";

const router = Router();

router.patch("/:contactId", auth, updateContact);
router.post("/", auth, createContact);
router.delete("/:contactId", auth, deleteContact);
router.get("/", auth, fetchContactList);

export default router;
