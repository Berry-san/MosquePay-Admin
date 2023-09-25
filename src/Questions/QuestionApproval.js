import React, { useState} from 'react'
import { useParams,  Link, } from 'react-router-dom'
import axios from 'axios'
import qs from 'qs'
import {
    
    FormGroup,
    Modal,
    ModalBody,
  } from "reactstrap";
  import { WEB_BASE } from "../APIBase";
    import {Icon,  Col,} from "../component/Component";
function QuestionApproval() {
    const {  email, ref } = useParams();
    const [modal, setModal] = useState({
        add: true,
      });

    const [needyName, setNeedyName] = useState('');
    

    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(needyName,);
        try{
            axios.post(WEB_BASE +  `update_question_status`, qs.stringify({email: email, question_reference: ref, status: needyName}), {headers: {'x-api-key': '987654'}})
            alert('Question Updated Successfully');
            window.location.href = "/que"
            
        }catch(err){
            console.log(err);
        }
    }
  return (
    <div >
     <Modal isOpen={modal.add} toggle={() => setModal({ add: true })} className="modal-dialog-centered " size="lg">
     <ModalBody>
            <Link
             to='/que'
              
              className="close"
            >
              <Icon name="cross-sm"></Icon>
            </Link>

            <div className="p-2">
            <div className="  rounded-lg ">
        <h3 className=' text-center text-green-800'> Approve Question </h3>
        <form onSubmit={handleSubmit}>
        <div className=' row w-3/4 min-w-fit mx-auto  '>
        <Col md="12">
        <FormGroup>
            <label className=' block'>Select Option</label>
          <select className=' p-3 w-full bg-gray-300 rounded-lg' value={needyName} onChange={(e) => setNeedyName(e.target.value)}>
          <option>Select Status</option>
            <option value='0'>Approve</option>
            <option value='1'>Reject</option>
          </select>
         </FormGroup>
        </Col>
       
                <button className='  form-control  mt-4 rounded-md text-white  bg-green-800 hover:bg-green-500' type='submit'>Submit</button>
                </div>
            </form>
                 </div>
            </div>
            </ModalBody>
     </Modal>
  
    </div>
  )
}

export default QuestionApproval