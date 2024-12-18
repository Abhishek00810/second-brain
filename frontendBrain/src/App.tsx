import './App.css'
import { Button } from './Button'
import Card from './Card';
import { Addicon } from './icons/Addicon';
import { Shareicon } from './icons/Shareicon';
import { Logoicon } from './icons/Logoicon';
import { useEffect, useRef, useState } from 'react';
import Popup from './Popup';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


function App() {
  const Typeref = useRef<HTMLInputElement>(null);
  const Linkref = useRef<HTMLInputElement>(null);
  const [Content, setContent] = useState<any[]>([]);

  const location = useLocation();

  const GenerateLink = async()=>
  {
    try{
      const response = await axios.post("http://localhost:3000/api/v1/share",{
        share: true
      },
      {
        headers:{
          Authorization: location?.state?.Jwt
        }
      })
      console.log(response);
    }
    catch(e){
      console.log("Error: ", e);
    }
  }

  useEffect(()=>{
    const fetchdata = async()=>{
      try{
        const response = await axios.get("http://localhost:3000/api/v1/content",{
          headers:{
            Authorization: location?.state?.Jwt
          }
        })
        setContent(response.data.user);
      }
      catch(e){
        console.log("Error: ", e);
      }
    }
    fetchdata();
  },[])

 function FetchCards(){
  if(Content.length)
  {
    return (
      Content.map((element, index)=>(
        <Card title='P' type={element.type} link={element.link}></Card>
      ))
    )

  }

  }

  const FUNCTIONCALL = async ()=>{
    console.log("hey");
    console.log(location?.state);
    try{
      const response = await axios.post("http://localhost:3000/api/v1/content", {
        type: Typeref?.current?.value,
        link: Linkref?.current?.value
      },
    {
      headers:{
        Authorization: location?.state?.Jwt
      }
    })
      console.log(response)
    }
    catch(e){
      console.log("Error", e);
    }
    setshowAdd(false)
  }

  const [showAdd, setshowAdd] = useState(false);


  return (
    
    <div className='flex bg-gray-200 min-h-screen w-full'>
      <div className='w-64 bg-white w-64 p-4'>
          <h1 className='text-2xl  mb-8 flex items-center'>
            <span className='mr-2'>{<Logoicon />}</span>
            Second Brain</h1>
          
          <div className=''>
            <h2 className='mb-2 text-lg cursor-pointer p-2 rounded hover:bg-black/10'>Tweets</h2>
            <h2  className='mb-2 text-lg cursor-pointer p-2 rounded hover:bg-black/10'>Documents</h2>
            <h2  className='mb-2 text-lg cursor-pointer p-2 rounded hover:bg-black/10'>Videos</h2>
            <h2  className='mb-2 text-lg cursor-pointer p-2 rounded hover:bg-black/10'>Tags</h2>
            <h2  className='mb-2 text-lg cursor-pointer p-2 rounded hover:bg-black/10'>Links</h2>
          </div>
      </div>
    
    <div className='flex flex-1 flex-col p-4'>
    <div className='flex mt-4 justify-between'>
      <div>
        <h1 className='text-2xl font-semibold ml-4' >All Notes</h1>
      </div>
      <div className='flex flex-row'>
        <div  className='mx-4 text-[#4A4D71]'><Button startIcon={Shareicon} text = "Share Brain" variant='secondary' size='md' onClick ={()=>{
          GenerateLink()
        }}></Button></div>
        <div  className = 'text-white'><Button startIcon={Addicon}  text = "Add Content" variant='primary' size='md' onClick={()=>{
          setshowAdd(true)
        }}></Button></div>
      </div>
    </div>
    <div className='flex gap-16 flex-wrap mt-16 ml-8'>
    <Card title = "P" type = "Youtube" link='https://youtube.com'></Card>
      <Card title = "P" type = "Youtube" link='https://youtube.com'></Card>
      <Card title = "P" type = "Twitter" link='https://youtube.com'></Card>
      <Card title = "P" type = "Twitter" link='https://youtube.com'></Card>
      {FetchCards()}
    </div>
    </div>

    {showAdd &&  <Popup title = "Description" children = {
        <form onSubmit={(e) => {
          e.preventDefault(); // Prevent default form submission
          FUNCTIONCALL(); // Call API function
        }}>
          <h1>Type</h1>
          <input ref = {Typeref} placeholder='Type of Note'></input>
          <h1>Link</h1>
          <input ref={Linkref} placeholder='Enter Link here'></input>
          
        <div className='flex flex-row justify-between mt-4'>
        <Button variant='secondary' text = "Cancel" onClick={()=>{setshowAdd(false)}} size='md'></Button>
        <Button variant='primary' text = "Submit" size='md'></Button>
        </div>
        </form>
    }></Popup>}
    </div>
  )
}

export default App
