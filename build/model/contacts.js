"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const contactSchema = new mongoose_1.default.Schema({
    contactName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    id: { type: String },
    userId: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});
exports.default = mongoose_1.default.model("Contact", contactSchema);
