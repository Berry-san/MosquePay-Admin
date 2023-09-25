import React ,{useState, useEffect} from 'react'
import axios from 'axios'
import {
    Modal,
    ModalBody,
  } from "reactstrap";
  import { WEB_BASE } from "../APIBase";
    import {Icon,} from "../component/Component";
  import ReactHTMLTableToExcel from 'react-html-table-to-excel';

export default function ReferralDetails({open, payment, handleClose}) {
    const [payments, setPayment] = useState([]);
    const[ref, setRef] = useState('')
     
    useEffect(() =>{
        setRef(payment)
    },[payment])
        
      useEffect(() =>{
       
        axios.get(WEB_BASE + `single_campaign_payment_detail?campaign_reference=${ref}`, {headers: {'x-api-key': '987654'}})
        .then(res => {
            setPayment(res.data.result)
           
        }
        )
      }, [ref])
     
  return (
    <div>
        <Modal isOpen={open}  className="modal-dialog-centered " size="lg">
            <ModalBody>
            <div
            onClick={handleClose}
              
              className="close"
            >
              <Icon name="cross-sm"></Icon>
            </div>
            <div className='flex justify-end mb-3'>
            <ReactHTMLTableToExcel
                    id="table-xls-button"
                    className='p-2 rounded-xl bg-green-700 hover:bg-green-500 mt-1 mr-2 underline underline-offset-1 text-white'
                    table="referral-details-table"
                    filename='Campaigndetails'
                    sheet="tablexls"
                    buttonText="DownLoad Data"/>
            </div>
            <table className="table-auto w-full text-center" id='referral-details-table'>
            <thead>
            <tr className="tb-tnx-head border-y-2">
                 <th className='border-2'>
                       Account Name
                       
                        </th>
                        <th className='border-2'>
                       
                         Account Number
                       
                        </th>
                        <th className='border-2'>
                        
                         Bank Name
                        
                          </th>
                          <th className='border-2'>Referral Token
                         </th>
                          <th className='border-2'>Amount Raised
                         </th>
                         <th className='border-2'>PayOut
                         </th>
            </tr>
            </thead>
            <tbody>
            {payments.map((pay, i )=>{
                return <tr key={i} className="tb-tnx-item">
                <td className='border-2'>{pay.account_name}</td>
                <td className='border-2'>{pay.account_no}</td>
                <td className='border-2'>{pay.bank_name}</td>
                <td className='border-2'>{pay.referral_token}</td>
                <td className='border-2'>{pay.amount_raised}</td>
                <td className='border-2'>{pay.five_percent}</td>

                </tr>
            })}
            </tbody>
            </table>
            {payments.length === 0 ? <p className=' text-center text-red-800'>No Payments made yet</p> : null}
            </ModalBody>
            </Modal>
    </div>
  )
}
