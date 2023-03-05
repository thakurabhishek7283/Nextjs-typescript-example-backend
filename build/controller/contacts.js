"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContact = exports.deleteContact = exports.updateContact = exports.fetchContactList = void 0;
const contacts_1 = __importDefault(require("../model/contacts"));
const fetchContactList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.userId;
        const contacts = yield contacts_1.default.find({
            userId,
        }).select("_id contactName contactNumber");
        return res.status(200).json({
            contactList: contacts,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.fetchContactList = fetchContactList;
const updateContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { contactName, contactNumber } = req.body;
        const { contactId } = req.params;
        const updatedContact = yield contacts_1.default.findByIdAndUpdate(contactId, { contactName, contactNumber }, { new: true }).select("contactName contactNumber _id");
        return res.status(200).json({ updatedContact });
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateContact = updateContact;
const deleteContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { contactId } = req.params;
        yield contacts_1.default.deleteOne({ _id: contactId });
        return res.status(200).json({ message: "successfully deleted" });
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteContact = deleteContact;
const createContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { contactName, contactNumber, userId } = req.body;
        const contact = new contacts_1.default({ contactName, contactNumber, userId });
        const data = yield contact.save();
        return res.status(201).json(data);
    }
    catch (error) {
        console.log(error);
    }
});
exports.createContact = createContact;
