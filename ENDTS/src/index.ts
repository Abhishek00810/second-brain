import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import {z} from 'zod';
import { userModel, contentModel, LinkModel } from './db';
import userMiddleware from './Middleware/middleware';
import { generateHash } from './GenHash';
const MONGODB_URL = "mongodb+srv://dadwalabhishek10:fy3BsTyCdVaH8Wcq@cluster0.vh6s6.mongodb.net/course-selling?retryWrites=true&w=majority&appName=Cluster0"
import { Request } from 'express';
import cors from 'cors';


export interface CustomRequest extends Request{
    userId?:string
} 

const mySchema = z.string();
const EFILE = "12345677"
const app = express();
app.use(express.json());
app.use(cors());


const userSchema = z.object({
    username: z.string(),
    password: z.string().min(8, "password should be have atleast 8 characters")
})

app.post("/api/v1/signup",async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    try
    {
        const result = userSchema.parse({
            username: req.body.username,
            password: req.body.password
       })

       console.log("data is valid");
    }

    catch(e){
        res.json({
            message: "Not valid entry",
            error: e
        })
        return;
    }

    try{
        await userModel.create({
            username: username,
            password: password
        })

        res.json({
            message: "Successfully created"
        })
    }
    catch{
        res.json({
            message: "Invalid actions"
        })
    }
})

app.post("/api/v1/signin", async (req,res)=>{
    console.log(req.body.username);
    try
    {
        const result = userSchema.parse({
            username: req.body.username,
            password: req.body.password
       })

       console.log("data is valid");
    }

    catch(e){
        res.json({
            message: "Not valid entry",
            error: e
        })
        return;
    }
    
    const username = req.body.username;
    const password = req.body.password;

    try{
        const user = await userModel.findOne({
            username: username,
            password: password
        })
        if(user)
        {
            const token = jwt.sign({id: user._id}, EFILE);

            res.status(201).json({
                status: 'success',
                message: token,
                date: user
            })
        }
    }
    catch{
        res.json({
            message: "invalid creds"
        })
    }
})

app.post("/api/v1/content",userMiddleware , async(req:CustomRequest,res)=>{
    const link = req.body.link;
    const type = req.body.type;
    
    
    try{
        await contentModel.create({
            link: link,
            type: type,
            tags: [],
            userId: req.userId
        })
        res.send({
            message: "Content added successfully"
        })
    }
    catch(e){
        res.send({
            message:e
        })
    }
})


app.get("/api/v1/content", userMiddleware,  async (req:CustomRequest, res)=>{
    const userId = req.userId;
    const user = await contentModel.find({
        userId: userId
    }).populate("userId", "username")

    res.json({
        user
    })
})


app.post("/api/v1/share", userMiddleware, async (req:CustomRequest ,res)=>{
    const share = req.body.share;

    if(share)
    {
        const existingLink = await LinkModel.findOne({
            userId: req.userId
        })
        if(existingLink)
        {
            res.json({
                hash: existingLink.hash
            })
            return;
        }
        else
        {
            try{
                const hash = generateHash(10)
                console.log(hash)
                await LinkModel.create({
                    userId: req.userId,
                    hash: hash
                })

                res.json({
                    hash: hash
                })
            }
            catch{
                res.json({
                    message: "Invalid actions"
                })
            }
        }
    }
    else{
        await LinkModel.deleteOne({
            userId: req.userId
        })
    }   
})

app.get("/api/v1/:shareLink",async (req,res)=>{
    const hash = req.params.shareLink;
    
    console.log(hash)
    const Link = await LinkModel.findOne({
        hash: hash
    })

    if(Link)
    {
        //content and who made it
        const userId = Link.userId
        const content = await contentModel.find({
            userId: userId
        }).populate("userId", "username")
        res.json({
            message: content
        })
    }
    
    else{
        res.json({
            message: "Invalid link"
        })
        return;
    }
})


app.listen(3000);