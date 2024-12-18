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
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const db_1 = require("./db");
const middleware_1 = __importDefault(require("./Middleware/middleware"));
const GenHash_1 = require("./GenHash");
const MONGODB_URL = "mongodb+srv://dadwalabhishek10:fy3BsTyCdVaH8Wcq@cluster0.vh6s6.mongodb.net/course-selling?retryWrites=true&w=majority&appName=Cluster0";
const cors_1 = __importDefault(require("cors"));
const mySchema = zod_1.z.string();
const EFILE = "12345677";
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const userSchema = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string().min(8, "password should be have atleast 8 characters")
});
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const result = userSchema.parse({
            username: req.body.username,
            password: req.body.password
        });
        console.log("data is valid");
    }
    catch (e) {
        res.json({
            message: "Not valid entry",
            error: e
        });
        return;
    }
    try {
        yield db_1.userModel.create({
            username: username,
            password: password
        });
        res.json({
            message: "Successfully created"
        });
    }
    catch (_a) {
        res.json({
            message: "Invalid actions"
        });
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body.username);
    try {
        const result = userSchema.parse({
            username: req.body.username,
            password: req.body.password
        });
        console.log("data is valid");
    }
    catch (e) {
        res.json({
            message: "Not valid entry",
            error: e
        });
        return;
    }
    const username = req.body.username;
    const password = req.body.password;
    try {
        const user = yield db_1.userModel.findOne({
            username: username,
            password: password
        });
        if (user) {
            const token = jsonwebtoken_1.default.sign({ id: user._id }, EFILE);
            res.status(201).json({
                status: 'success',
                message: token,
                date: user
            });
        }
    }
    catch (_a) {
        res.json({
            message: "invalid creds"
        });
    }
}));
app.post("/api/v1/content", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.body.link;
    const type = req.body.type;
    try {
        yield db_1.contentModel.create({
            link: link,
            type: type,
            tags: [],
            userId: req.userId
        });
        res.send({
            message: "Content added successfully"
        });
    }
    catch (e) {
        res.send({
            message: e
        });
    }
}));
app.get("/api/v1/content", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const user = yield db_1.contentModel.find({
        userId: userId
    }).populate("userId", "username");
    res.json({
        user
    });
}));
app.post("/api/v1/share", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    if (share) {
        const existingLink = yield db_1.LinkModel.findOne({
            userId: req.userId
        });
        if (existingLink) {
            res.json({
                hash: existingLink.hash
            });
            return;
        }
        else {
            try {
                const hash = (0, GenHash_1.generateHash)(10);
                console.log(hash);
                yield db_1.LinkModel.create({
                    userId: req.userId,
                    hash: hash
                });
                res.json({
                    hash: hash
                });
            }
            catch (_a) {
                res.json({
                    message: "Invalid actions"
                });
            }
        }
    }
    else {
        yield db_1.LinkModel.deleteOne({
            userId: req.userId
        });
    }
}));
app.get("/api/v1/:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    console.log(hash);
    const Link = yield db_1.LinkModel.findOne({
        hash: hash
    });
    if (Link) {
        //content and who made it
        const userId = Link.userId;
        const content = yield db_1.contentModel.find({
            userId: userId
        }).populate("userId", "username");
        res.json({
            message: content
        });
    }
    else {
        res.json({
            message: "Invalid link"
        });
        return;
    }
}));
app.listen(3000);
