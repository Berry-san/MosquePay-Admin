import React, {useEffect, useState, useLayoutEffect} from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import qs from 'qs'
import { FormGroup,   } from "reactstrap";
import {  Col,} from "../component/Component";
import { WEB_BASE } from '../APIBase';
  


export default function DonationCreate() {
    const [needyD, setNeedyD] = useState([]);
    const [donationEmail, setDonationEmail] = useState('');
    const [donationStartDate, setDonationStartDate] = useState('');
    const [donationEndDate, setDonationEndDate] = useState('');
    const [donationAmount, setDonationAmount] = useState('');
    const [donationNeedyId, setDonationNeedyId] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(WEB_BASE + 'needy_category', {headers: {'x-api-key': '987654'}})
                .then(res => {
                    setNeedyD(res.data.result);
                }
                )
                .catch(err => console.log(err));

    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log( donationEmail, donationStartDate, donationEndDate, donationAmount, donationNeedyId);
        try{
             axios.post(WEB_BASE + 'friday_donation_insert',
             qs.stringify({email: donationEmail, start_dt: donationStartDate, end_dt: donationEndDate, amount: donationAmount, needy_category_id: donationNeedyId }),  
             {headers: {'x-api-key': '987654', 'content-type': 'application/x-www-form-urlencoded' }});  
            
            alert('Donation Campaign Created Successfully');
            navigate('/donation');
         
            }catch(e){
                console.log(e.response);
                alert('Error in Creating Donation Campaign');
            }
    }
 

  return (
    
          <div className=' pt-5 px-4 mt-20'>
          <div className=" ">
          <h3 className=' text-center text-green-800'> Create Friday Donation</h3>
              <form onSubmit={handleSubmit}>
              <div className=' row w-3/4 min-w-fit mx-auto  '>
              <Col md="12">
              <FormGroup>
                  <label>Email:</label>
                  <input type="email"  required value={donationEmail} onChange={(e) => setDonationEmail(e.target.value)} className=' form-control bg-gray-100 '/>
               </FormGroup>
              </Col>
              <Col md="6">
              <FormGroup>
                  <label className=' mt-3'>Start Date:</label>
                  <input type="date" required value={donationStartDate} onChange={(e) => setDonationStartDate(e.target.value)} className=' form-control rounded-md  bg-gray-100 '/>
               </FormGroup>
              </Col>
              <Col md="6">
              <FormGroup>
                  <label className=' mt-3'>End Date:</label>
                  <input type="date" required value={donationEndDate} onChange={(e) => setDonationEndDate(e.target.value)} className=' form-control rounded-md  bg-gray-100 '/>
               </FormGroup>
              </Col>
              <Col md="12">
              <FormGroup>
                  <label className=' mt-3'>Amount:</label>
                  <input type="text" required  value={donationAmount} onChange={(e) => setDonationAmount(e.target.value)} className=' form-control rounded-md  bg-gray-100 '/>
               </FormGroup>
              </Col>
              <Col md="12">
              <FormGroup>
                  <label className=' mt-3'>Needy Category:</label>
                  <select value={donationNeedyId} required onChange={(e) => setDonationNeedyId(e.target.value)} className='form-control rounded-md  bg-gray-100 '>
                              <option value="">Select Needy Category</option>
                          {needyD.map((need) => (
                              
                              <option key={need.needy_category_id} value={need.needy_category_id}>{need.category}</option>
                          ))}  
                          </select>
               </FormGroup>
              </Col>       
                      <button className='  form-control  mt-4 rounded-md text-white  bg-green-800 hover:bg-green-500' type='submit'>Submit</button>
                      </div>
                  </form>
          </div>
          </div>
       
  )
}
