import React, {useEffect, useState} from 'react'

import axios from "axios";
import qs from 'qs'
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import {  Spinner } from "reactstrap";
import { WEB_BASE} from "../APIBase";
export default function Setup() {
   
    const [password, setPassword] = useState("");
    const [passwordConfim, setPasswordConfirm] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
   
     const eemail = sessionStorage.getItem('email');

    const handleSubmit = (e) => {
        e.preventDefault()
        if(password == passwordConfim){
            console.log(password,  email, )
            setLoading(true);
            axios.post(WEB_BASE + 'activate_sheikh',
             qs.stringify({ email: email, password: password}),
             {headers: {'x-api-key': '987654', 'content-type': 'application/x-www-form-urlencoded' }})
            .then(res => {
                console.log(res)
                navigate("/")
            }
            )
            .catch(err => {
                console.log(err)
                setError(err.data.message)
                setLoading(false);
               
            }
            )
        }else{
            setError("Password does not match")
        }
       

    }
    useEffect (() => { 
        setEmail(eemail)
    }
     , [eemail]);
     
  return (
    <div>
        <Navbar />
        <div className='h-full pt-20'>
        <div className='form-back  z-10' >
        <div className=' text-center pt-10'>
            <h1 className=' text-black'>Create Password </h1>
        </div>
       <div className=' w-1/3 my-2 min-w-fit pb-10 pt-1 mx-auto bg-white relative drop-shadow-lg px-8 border-slate-900 z-10 rounded-md'>
            <form
            onSubmit={handleSubmit}
            >
                <p className=' text-center'> Activate your password</p>
                <div className='mt-10'>
                    <label className='text-black' htmlFor='email'>Email</label>
                    <input placeholder='Email' 
                     id='user-email' 
                     className='form-control input-round w-full p-3 bg-gray-100' 
                     type='email' 
                     onChange={(e) => setEmail(e.target.value)}
                     value={email}
                     required
                     />
                </div>
                <div className='mt-10'>
                    <label className='text-black' htmlFor='password'>Password</label>
                    <input 
                    placeholder='Password'
                     id='user-pword' 
                     className='form-control input-round  w-full p-3 bg-gray-100' 
                     type='Password' 
                     onChange={(e) => setPassword(e.target.value)}
                     value={password}
                     required
                     />
                </div>
                <div className='mt-10'>
                    <label className='text-black' htmlFor='password'>Confirm Password</label>
                    <input 
                    placeholder='Password'
                     id='user-pword' 
                     className='form-control input-round  w-full p-3 bg-gray-100' 
                     type='Password' 
                     onChange={(e) => setPasswordConfirm(e.target.value)}
                     value={passwordConfim}
                     required
                     />
                </div>
                {error && <div className='text-red-600 text-center pt-3'>{error}</div>}
                
                <div className='mt-10'>
                    <button type='submit' className="btn bg-green-600 text-white rounded-md mb-3 hover:bg-green-700 hover:text-slate-100 w-full p-3" > 
                    {loading ? <Spinner size="sm" color="light" /> : "Activate Password"} 
                    </button>
                </div>
               
                
              
            </form>
            
       </div>
      
       </div>
       </div>
    </div>
  )
}
