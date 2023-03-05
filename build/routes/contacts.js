"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contacts_1 = require("../controller/contacts");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = (0, express_1.Router)();
router.patch("/:contactId", auth_1.default, contacts_1.updateContact);
router.post("/", auth_1.default, contacts_1.createContact);
router.delete("/:contactId", auth_1.default, contacts_1.deleteContact);
router.get("/", auth_1.default, contacts_1.fetchContactList);
exports.default = router;
