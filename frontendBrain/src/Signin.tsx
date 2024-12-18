import axios from "axios";
import { Headers } from "node-fetch";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
function Signin()
{
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [Jwt, setJwt] = useState("");

    const navigate = useNavigate();
    
    const SIGNINCALL = async()=>
    {
        try{
            const resp = await axios.post("http://localhost:3000/api/v1/signin",{
                username: usernameRef.current?.value,
                password: passwordRef.current?.value
            })
            if(resp.data?.status == "success")
            {
                setJwt(resp.data?.message)
                console.log(Jwt);
                navigate("/",{
                    state:{
                        username: usernameRef.current?.value,
                        Jwt: resp.data?.message
                    }
                })
            }

        }
        catch(e){
            console.log(e);
        }
    }
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100" >
            <form className="flex flex-col bg-white p-8 rounded" onSubmit={(e)=>{
                e.preventDefault();
                SIGNINCALL();
            }}> 
            <h1 className="mb-6 text-center">Signin</h1>
            <input ref = {usernameRef} className= "rounded outline-none mb-6 border-gray-300 px-2 border-2" placeholder="Enter your email"></input>
            <input ref = {passwordRef} className="rounded outline-none mb-6 border-gray-300 px-2 border-2" placeholder="Enter your password"></input>
            <button type="submit" className="bg-[#645CB8] text-white rounded">Signin</button>
            </form>
    </div>
    );
}

export default Signin;