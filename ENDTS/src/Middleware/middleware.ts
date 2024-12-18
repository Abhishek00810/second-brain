import { Request, Response, NextFunction } from "express"
import jwt,{JwtPayload} from "jsonwebtoken";
const EFILE = "12345677"



export interface CustomRequest extends Request{
    userId?:string
} 

export interface customToken extends JwtPayload{
    id?:string
}


export const userMiddleware = (req: CustomRequest, res: Response, next: NextFunction)=>{
    const header = req.headers['Authorization'];

    const decoded = jwt.verify(header as string, EFILE);

    if(decoded)
    {
        req.userId = (decoded as customToken).id;
        next();
    }
    else{
        res.status(403).json({
            message: "Not logged in"
        })
    }
}

export default userMiddleware