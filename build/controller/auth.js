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
exports.signIn_C = exports.signUp_C = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../model/user"));
const secret = process.env.SECRET;
const signUp_C = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, firstName, lastName } = req.body;
    try {
        const oldUser = yield user_1.default.findOne({ email });
        if (oldUser)
            return res.status(400).json({ message: "User already exists" });
        const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
        const result = yield user_1.default.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
        });
        const token = jsonwebtoken_1.default.sign({ email: result.email, id: result._id }, secret, {
            expiresIn: "1h",
        });
        res.status(201).json({ userId: result._id, token });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
});
exports.signUp_C = signUp_C;
const signIn_C = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const oldUser = yield user_1.default.findOne({ email });
        if (!oldUser)
            return res.status(404).json({ message: "User doesn't exist" });
        const isPasswordCorrect = yield bcryptjs_1.default.compare(password, oldUser.password);
        if (!isPasswordCorrect)
            return res.status(400).json({ message: "Invalid credentials" });
        const token = jsonwebtoken_1.default.sign({ email: oldUser.email, id: oldUser._id }, secret, {
            expiresIn: "1h",
        });
        res.status(200).json({ userId: oldUser._id, token });
    }
    catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.signIn_C = signIn_C;
