import React,{useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'

const ShowTraceback = () => {
  const location=useLocation()
    // const [image,setImage]=useState('')

    // const fetchData=async()=>{
    //     const res = await fetch("http://localhost:5000/getDetection", {
    //         method: "GET",
    //         headers: {
    //           "Content-Type": "application/json",
    //         }
    //       });
    //       const data = await res.json();
    //       console.log(data[0].Traceback_Image) 
    //       setImage(data[0].Traceback_Image)       
    // }

    // useEffect(()=>{
    //     fetchData()
    // },[])
    var image1
try{
  image1=location.state.image1
  console.log('location',location) 
}

catch(e)
{
  console.log(e)
}
    if(image1){
      return (
        <div>
        <h1 style={{fontWeight:'bold'}}> Traceback Result</h1>
         <div style={{paddingLeft:'1px'}}>
         <img src={image1} height={600} width={1000} />
       
         </div>
        
        </div>
    
      
      )
    
    }
else
    {
      <h1>Result Not Found</h1>
    }

}

export default ShowTraceback