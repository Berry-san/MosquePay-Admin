import React,{useState} from 'react'
import { useParams, Link, } from 'react-router-dom'
import axios from 'axios'
import qs from 'qs'
import { Modal,
    ModalBody,
  } from "reactstrap";
  import { WEB_BASE } from "../APIBase";
    import {Icon,  } from "../component/Component";
    import Cancel from '../images/x.svg'
    import Check from '../images/ck.svg'

function QuestionDelete() {
    let {id} = useParams();
   

    const [modal, setModal] = useState({
        add: true,
      });

      const handleDelete = () =>{
        try{
            const res = axios.post(WEB_BASE + 'delete_question',
             qs.stringify({ id: id }), 
             {headers: {'x-api-key': '987654', 'content-type': 'application/x-www-form-urlencoded' }});
            console.log(res);
            window.location.href = "/que"
            alert('Question Deleted Successfully');
            
            
          
         }catch(e){
              console.log(e.response);
              alert('Error in deleting needy campaign');
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

            <h1 className=' text-center pt-3 pb-3'>Are you sure you want to delete?</h1>
                
            <div className="flex justify-around mt-6">
        <Link to={`/que`}>
          <button
          
            className=' bg-red-600  rounded-lg p-2 px-4 text-white'
          >
            <img src={Cancel} alt="Cancel" className=' inline'/>
            <span className=' inline' >  No</span>
          
          </button>
          </Link>
          <form onSubmit={handleDelete} >
          <button className=' bg-green-600 rounded-lg p-2 px-4 text-white' > 
          <img src={Check} alt="Check" className=' inline' />
          <span className=' inline'>  Yes</span>
          </button>
          </form>
        </div>
            </ModalBody>
            </Modal>
    </div>
  )
}

export default QuestionDelete