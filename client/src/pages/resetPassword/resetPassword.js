import React,{useState,} from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
const Reset  = ()=>{
    const [email,setEmail] = useState("")
    const navigate=useNavigate();
    const PostData = ()=>{
        
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return
        }
        console.log('fetching')
        // const data = await axios.post('http://localhost:5000/reset-password', formData).then((response)=>{
        //     if (response.status==200) {
        //         navigate('/admin/dashboard')
        //     }
        //    }).catch(function (error) {
        //         if (error.response.status==422) {
        //             toast.error('Something Went wrong, Try Again');
        //             console.log(error)
        //             console.log(error.message)
        //         }
          
        //    })

        fetch('http://localhost:5000/reset-password',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
              toast('hi')
           }
           else{
               toast('hi')
               navigate('/')
           }
        }).catch((err)=>{
            console.log(err)
        })
    }
   return (
      <div className="mycard">
          <div className="card auth-card input-field">
            <h2>Instagram</h2>
            <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            {/* <button onClick={PostData()}
            >
               Reset password
            </button>
             */}
             <Button
                      className="btn-fill pull-right"
                      id="btnUpdate"
                      type="submit"
                      variant="info"
                      onClick={PostData}
                      style={{
                        float: 'right'
                      }}
                    >
                      Update Profile
                    </Button>
    
        </div>
        <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
      </div>
      
   )
}


export default Reset