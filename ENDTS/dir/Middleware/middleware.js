"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const EFILE = "12345677";
const userMiddleware = (req, res, next) => {
    const header = req.headers['Authorization'];
    const decoded = jsonwebtoken_1.default.verify(header, EFILE);
    if (decoded) {
        req.userId = decoded.id;
        next();
    }
    else {
        res.status(403).json({
            message: "Not logged in"
        });
    }
};
exports.userMiddleware = userMiddleware;
exports.default = exports.userMiddleware;
