import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "./Card";
function Sharelink()
{
    interface Contentitem{
        _id: string,
        type: "Youtube" | "Twitter" | undefined | null,
        tags: [],
        userId:[
            _id: string,
            username: string
        ],
        link: string
    }
    const [content, setcontent] = useState<Contentitem[]>([]);

    const params = useParams<{randomstring: string}>();
    console.log(params.randomstring);

    useEffect(()=>{
        const fetchdata = async()=>{
            try{
                const resp  = await axios.get(`http://localhost:3000/api/v1/${params.randomstring}`, {
                    params:{
                        shareLink: params.randomstring
                    }
                })
                setcontent(resp.data.message)
            }
            catch(e){
                console.log("Error", e);
            }
        }
        fetchdata();
    },[])
    
    function FETCHCONTENT()
    {
        if(content.length)
        {   
            return (
                content.map((element, index)=>(
                    <Card type = {element.type} link={element.link} title = "P"></Card>
                ))
            )
        }
         return (
            <div><h1>No files recorded</h1></div>
         )
    }
    return (
        <div className="flex flex-wrap p-8 bg-gray-100 pl-16">
            {FETCHCONTENT()}
        </div>
    )
}
export default Sharelink;