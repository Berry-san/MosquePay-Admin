import React, { useState} from 'react'
import axios from "axios";
import qs from 'qs'
import { FormGroup,   } from "reactstrap";
import {  Col,} from "../component/Component";
import { useNavigate } from 'react-router-dom';
import { WEB_BASE } from "../APIBase"; 


export default function CreateQuestion() {
    const[question, setQuestion] = useState('');
    const[description, setDescription] = useState('');
   const navigate = useNavigate();
   
    let admin_idd = sessionStorage.getItem('admin_iid');
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(question, description);
        try{
            const res = axios.post(WEB_BASE + 'create_questioncategory',
                qs.stringify({category: question, description: description, admin_id: admin_idd }),
                {headers: {'x-api-key': '987654', 'content-type': 'application/x-www-form-urlencoded' }});
            console.log(res);
            
            alert('Question Created Successfully');
            navigate('/question');
            
            
        }catch(e){
            console.log(e.response);
        }
    }

    

  return (
   
          <div className=' pt-10 mt-20'>
          <div className=" ">
          <h3 className=' text-center text-green-800'> Create Question Category</h3>
              <form onSubmit={handleSubmit}>
              <div className=' row w-3/4 min-w-fit mx-auto  '>
              <Col md="12">
              <FormGroup>
                  <label>Category Name</label>
                  <input type="text"  value={question} required onChange={(e) => setQuestion(e.target.value)} className=' form-control rounded-md  bg-gray-100 '/>
               </FormGroup>
              </Col>
              <Col md="12">
              <FormGroup>
                  <label className=' mt-3'>Description</label>
                  <textarea value={description} required onChange={(e) => setDescription(e.target.value)} className='form-control rounded-md  bg-gray-100 '></textarea>
               </FormGroup>
              </Col>
                      <button className='  form-control  mt-4 rounded-md text-white  bg-green-800 hover:bg-green-500' type='submit'>Submit</button>
                      </div>
                  </form>
          </div>
          </div>
       
  )
}
