import React, {useState} from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import qs from 'qs'
import { FormGroup,   } from "reactstrap";
import {  Col,} from "../component/Component";
import { WEB_BASE } from "../APIBase";  


export default function CreateSheikh() {
    const [sheikhName, setSheikhName] = useState('');
    const [sheikhEmail, setSheikhEmail] = useState('');
    const [sheikhPassword, setSheikhPassword] = useState('');
    const navigate = useNavigate();
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        try{
            axios.post(WEB_BASE +'create_sheikh',
             qs.stringify({sheikh_name: sheikhName, email: sheikhEmail, popular_name: sheikhPassword}),
              {headers: {'x-api-key': '987654'}})
            alert('Sheikh Created Successfully');
            navigate('/sheikh');
            
        }catch(err){
            console.log(err);
            alert('Error in Creating Sheikh');
        }
    }
  
  return (
   
          <div className='pt-10 mt-20'>
          <div className=" ">
          <h3 className=' text-center text-green-800'> Create Sheikh</h3>
              <form onSubmit={handleSubmit}>
              <div className=' row w-3/4 min-w-fit mx-auto  '>
              <Col md="12">
              <FormGroup>
                  <label>Sheikh Name</label>
                  <input type="text" required value={sheikhName} onChange={(e) => setSheikhName(e.target.value)}  className=' w-full mb-3 p-3 rounded-md input-round bg-gray-100 '/>
               </FormGroup>
              </Col>
              <Col md="12">
              <FormGroup>
                  <label className=' mt-3'>Email</label>
                  <input type="email" required  value={sheikhEmail} onChange={(e) => setSheikhEmail(e.target.value)} className=' w-full mb-3 p-3 rounded-md input-round bg-gray-100 '/>
               </FormGroup>
              </Col>
              <Col md="12">
              <FormGroup>
                  <label className=' mt-3'>Popular Name</label>
                  <input type="text" required value={sheikhPassword} onChange={(e) => setSheikhPassword(e.target.value)} className=' w-full mb-3 p-3 rounded-md input-round bg-gray-100 '/>
               </FormGroup>
              </Col>
                      <button className='  form-control  mt-4 rounded-md text-white  bg-green-800 hover:bg-green-500' type='submit'>Submit</button>
                      </div>
                  </form>
          </div>
          </div>
       
  )
}
