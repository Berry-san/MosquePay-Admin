import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import qs from 'qs'
import { FormGroup, Modal, ModalBody } from 'reactstrap'
import { WEB_BASE } from '../APIBase'
import { Icon, Col } from '../component/Component'
import axiosInstance from '../utils/axios'

export default function CampaignFull() {
  let { id } = useParams()

  const [status, setStatus] = useState('')
  const [accountNo, setAccountNo] = useState('')
  const [uReason, setuReason] = useState('')
  const [campId, setCampId] = useState('')
  const [campTitle, setCampTitle] = useState('')
  const [accountName, setAccountName] = useState('')
  const [campType, setCampType] = useState('')
  const [campEmail, setCampEmail] = useState('')
  const [campStartDate, setCampStartDate] = useState('')
  const [campEndDate, setCampEndDate] = useState('')
  const [campAmount, setCampAmount] = useState('')
  const [campAccount, setCampAccount] = useState('')
  const [campStatus, setCampStatus] = useState('')
  const [campApprovalDate, setCampApprovalDate] = useState('')
  const [campBankName, setCampBankName] = useState('')
  const [campBoardResolution, setCampBoardResolution] = useState('')
  const [campBvn, setCampBvn] = useState('')
  const [campBvn2, setCampBvn2] = useState('')
  const [campCac, setCampCac] = useState('')
  const [campCo7, setCampCo7] = useState('')
  const [campInsertedDate, setCampInsertedDate] = useState('')
  const [campReason, setCampReason] = useState('')
  const [campStory, setCampStory] = useState('')
  const [campRef, setCampRef] = useState('')
  const [modal, setModal] = useState({
    add: true,
  })
  const [verifyBvn, setVerifyBvn] = useState('')
  const [verifyBvnNo, setVerifyBvnNo] = useState('')
  const [verifyD, setVerifyD] = useState(false)
  const [verifyName, setVerifyName] = useState('Verify')
  const [verifyBvn2, setVerifyBvn2] = useState('')
  const [verifyBvnNo2, setVerifyBvnNo2] = useState('')
  const [verifyD2, setVerifyD2] = useState(false)
  const [verifyName2, setVerifyName2] = useState('Verify')
  const admin_idd = sessionStorage.getItem('admin_iid')

  useEffect(() => {
    axiosInstance
      .get( `full_campaign/${id}`)
      .then((res) => {
        console.log(res)
        setCampId(res.data.result[0].CampaignID)
        setCampTitle(res.data.result[0].title)
        setCampType(res.data.result[0].Campaign_Type)
        setCampEmail(res.data.result[0].email)
        setCampStartDate(res.data.result[0].start_date)
        setCampEndDate(res.data.result[0].end_date)
        setCampAmount(res.data.result[0].amount)
        setCampAccount(res.data.result[0].account_number)
        setCampStatus(res.data.result[0].admin_status)
        setCampApprovalDate(res.data.result[0].approval_dt)
        setCampBankName(res.data.result[0].bank_name)
        setCampBoardResolution(res.data.result[0].board_resolution)
        setCampBvn(res.data.result[0].bvn)
        setCampCac(res.data.result[0].cac_certificate)
        setCampCo7(res.data.result[0].co7_form)
        setCampInsertedDate(res.data.result[0].inserted_dt)
        setCampReason(res.data.result[0].reason)
        setCampRef(res.data.result[0].reference_letter)
        setCampStory(res.data.result[0].campaign_story)
        setCampBvn2(res.data.result[0].bvn_2)
      })
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(accountNo)
    try {
      const res = axios.post(
        WEB_BASE + 'approve_campaign',
        qs.stringify({
          campaign_reference: campId,
          admin_status: status,
          reason: uReason,
          admin_id: admin_idd,
          account_no: accountNo,
          account_name: accountName,
        }),
        {
          headers: {
            'x-api-key': '987655',
            'content-type': 'application/x-www-form-urlencoded',
          },
        }
      )
      console.log(res)
      alert('Campaign Approved Successfully')

      window.location.href = '/campaign'
    } catch (e) {
      console.log(e.response)
    }
  }
  const handleVerification = () => {
    setVerifyD(true)
    setVerifyName('Loading...')
    axios
      .post(WEB_BASE + 'bvn_confirmation', qs.stringify({ bvn: campBvn }), {
        headers: {
          'x-api-key': '987655',
          'content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then((res) => {
        console.log(res.data.result.personal_info.full_name)
        setVerifyBvn(res.data.result.personal_info.full_name)
        setVerifyBvnNo(res.data.result.personal_info.phone_number)
        setVerifyName('Verification Completed')
      })
      .catch((err) => {
        alert('Invalid BVN Number')
        setVerifyName('Verification Completed')
        setVerifyD(false)
      })
    // try{

    //    axios.post(WEB_BASE + 'bvn_confirmation',
    //   qs.stringify({bvn: campBvn, }),
    //    {headers: {'x-api-key': '987655', 'content-type': 'application/x-www-form-urlencoded' }});

    // }catch(e){
    //   console.log(e.response);
    // }
  }
  const handleVerification2 = () => {
    setVerifyD2(true)
    setVerifyName2('Loading...')
    axios
      .post(WEB_BASE + 'bvn_confirmation', qs.stringify({ bvn: campBvn2 }), {
        headers: {
          'x-api-key': '987655',
          'content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then((res) => {
        console.log(res.data.result.personal_info.full_name)
        setVerifyBvn2(res.data.result.personal_info.full_name)
        setVerifyBvnNo2(res.data.result.personal_info.phone_number)
        setVerifyName2('Verification Completed')
      })
      .catch((err) => {
        alert('Invalid BVN Number')
        setVerifyName2('Verification Completed')
        setVerifyD(false)
      })
  }

  return (
    <div>
      <Modal
        isOpen={modal.add}
        toggle={() => setModal({ add: true })}
        className="modal-dialog-centered "
        size="lg"
      >
        <ModalBody>
          <Link to="/campaign" className="close">
            <Icon name="cross-sm"></Icon>
          </Link>
          <div className="p-2">
            <h1 className="pb-3 text-center text-gray-500 title">
              {' '}
              {campType} Campaign
            </h1>

            {campType === 'Individual' ? (
              <div className="overflow-y-auto ">
                <h3 className="pb-3 "> Campaign ID : {campId}</h3>
                <h3 className="pb-3 ">Campaign Type : {campType}</h3>
                <h3 className="pb-3 "> Campaign Title : {campTitle}</h3>
                <h3 className="pb-3 "> Campaign Email : {campEmail}</h3>
                <h3 className="pb-3 ">
                  {' '}
                  Campaign Start Date : {campStartDate}
                </h3>
                <h3 className="pb-3 "> Campaign End Date : {campEndDate}</h3>
                <h3 className="pb-3 "> Campaign Amount : {campAmount}</h3>
                <h3 className="pb-3 ">
                  {' '}
                  Campaign Status :{' '}
                  {campStatus === '0' ? (
                    <span className="p-2 text-white bg-green-900 ">
                      Approved
                    </span>
                  ) : campStatus === '1' ? (
                    <span className="p-2 text-white bg-yellow-500 ">
                      Pending
                    </span>
                  ) : (
                    <span className="p-2 text-white bg-red-900 ">Rejected</span>
                  )}{' '}
                </h3>
                <h3 className="pb-3 "> Campaign reason : {campStory}</h3>
                <h6 className="pb-3 ">Reason : {campReason}</h6>
                <h6 className="pb-3 ">
                  Campaign Inserted date : {campInsertedDate}
                </h6>
                <h6 className="pb-3 ">
                  Campaign Approval Date : {campApprovalDate}
                </h6>
                <h6 className="pb-3 ">Campaign Bank Name : {campBankName}</h6>
                <h6 className="pb-3 ">
                  Campaign Account Number : {campAccount}
                </h6>
                <h6 className="pb-3 ">
                  Campaign BVN : {campBvn}{' '}
                  <span
                    onClick={handleVerification}
                    className="pl-2 text-blue-500 underline cursor-pointer hover:underline-offset-4"
                  >
                    {verifyName}{' '}
                  </span>
                </h6>
                {verifyD ? (
                  <div className="pt-3 pb-3 ">
                    <h6 className="pb-3 "> Name: {verifyBvn} </h6>
                    <h6 className="pb-3 ">Phone no: {verifyBvnNo} </h6>
                  </div>
                ) : null}

                <h5 className="mt-3 mb-3 text-center text-green-900 ">
                  {' '}
                  Update User Status
                </h5>
                <form onSubmit={handleSubmit} className="mt-4 row gy-4">
                  <Col md="12">
                    <FormGroup>
                      <label className="mb-1">Campaign Reference</label>
                      <input
                        className="bg-gray-100 rounded-md form-control input-round"
                        required
                        type="text"
                        value={campId}
                        disabled
                      />
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <label className="mb-1">Status</label>
                      <select
                        className="mb-3 bg-gray-100 rounded-md form-control"
                        value={status}
                        required
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        {campStatus === '0' ? (
                          <>
                            <option value="0">Approved</option>
                            <option value="1">Pending</option>
                            <option value="2">Rejected</option>
                          </>
                        ) : campStatus === '1' ? (
                          <>
                            <option value="1">Pending</option>
                            <option value="0">Approved</option>
                            <option value="2">Rejected</option>
                          </>
                        ) : (
                          <>
                            <option value="2">Rejected</option>
                            <option value="0">Approved</option>
                            <option value="1">Pending</option>
                          </>
                        )}
                      </select>
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <label className="mb-1">Reason</label>
                      <textarea
                        className="mb-3 bg-gray-100 rounded-md form-control"
                        value={uReason}
                        required
                        onChange={(e) => setuReason(e.target.value)}
                      ></textarea>
                    </FormGroup>
                  </Col>
                  {status === '0' ? (
                    <>
                      <Col md="12">
                        <FormGroup>
                          <label className="mb-1">Account Number</label>
                          <input
                            className="bg-gray-100 rounded-md form-control input-round"
                            value={accountNo}
                            onChange={(e) => setAccountNo(e.target.value)}
                            required
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="12">
                        <FormGroup>
                          <label className="mb-1">Account Name</label>
                          <input
                            className="bg-gray-100 rounded-md form-control input-round"
                            value={accountName}
                            onChange={(e) => setAccountName(e.target.value)}
                            required
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </>
                  ) : null}

                  <button
                    className="text-white bg-green-800 rounded-md form-control hover:bg-green-500"
                    type="submit"
                  >
                    Submit
                  </button>
                </form>
              </div>
            ) : campType === 'Corporate' ? (
              <div className="overflow-y-auto ">
                <h3 className="pb-3 "> Campaign ID : {campId}</h3>
                <h3 className="pb-3 ">Campaign Type : {campType}</h3>
                <h3 className="pb-3 "> Campaign Title : {campTitle}</h3>
                <h3 className="pb-3 "> Campaign Email : {campEmail}</h3>
                <h3 className="pb-3 ">
                  {' '}
                  Campaign Start Date : {campStartDate}
                </h3>
                <h3 className="pb-3 "> Campaign End Date : {campEndDate}</h3>
                <h3 className="pb-3 "> Campaign Amount : {campAmount}</h3>
                <h3 className="pb-3 ">
                  {' '}
                  Campaign Status :{' '}
                  {campStatus === '0' ? (
                    <span className="p-2 text-white bg-green-900 ">
                      Approved
                    </span>
                  ) : campStatus === '1' ? (
                    <span className="p-2 text-white bg-yellow-500 ">
                      Pending
                    </span>
                  ) : (
                    <span className="p-2 text-white bg-red-900 ">Rejected</span>
                  )}{' '}
                </h3>
                <h3 className="pb-3 "> Campaign reason : {campStory}</h3>
                <h6 className="pb-3 ">Reason : {campReason}</h6>
                <h6 className="pb-3 ">
                  Campaign Inserted date : {campInsertedDate}
                </h6>
                <h6 className="pb-3 ">
                  Campaign Approval Date : {campApprovalDate}
                </h6>
                <h6 className="pb-3 ">Campaign Bank Name : {campBankName}</h6>
                <h6 className="pb-3 ">
                  Campaign Account Number : {campAccount}
                </h6>
                <h6 className="pb-3 ">
                  Campaign BVN : {campBvn}{' '}
                  <span
                    onClick={handleVerification}
                    className="pl-2 text-blue-500 underline cursor-pointer hover:underline-offset-4"
                  >
                    {verifyName}{' '}
                  </span>
                </h6>
                {verifyD ? (
                  <div className="pt-3 pb-3 ">
                    <h6 className="pb-3 "> Name: {verifyBvn} </h6>
                    <h6 className="pb-3 ">Phone no: {verifyBvnNo} </h6>
                  </div>
                ) : null}
                <h6 className="pb-3 ">
                  Campaign BVN 2 : {campBvn2}{' '}
                  <span
                    onClick={handleVerification2}
                    className="pl-2 text-blue-500 underline cursor-pointer hover:underline-offset-4"
                  >
                    {verifyName2}{' '}
                  </span>
                </h6>
                {verifyD2 ? (
                  <div className="pt-3 pb-3 ">
                    <h6 className="pb-3 "> Name: {verifyBvn2} </h6>
                    <h6 className="pb-3 ">Phone no: {verifyBvnNo2} </h6>
                  </div>
                ) : null}
                <h6 className="pb-3 ">
                  Campaign CO7 form :{' '}
                  <a
                    href={`https://mosquepay.org/mosquepaynew/assets/campaign_docs/${campCo7}`}
                    className="text-blue-500 underline hover:underline-offset-4"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {' '}
                    View Document
                  </a>{' '}
                </h6>
                <h6 className="pb-3 ">
                  Campaign CAC :
                  <a
                    href={`https://mosquepay.org/mosquepaynew/assets/campaign_docs/${campCac}`}
                    className="text-blue-500 underline hover:underline-offset-4"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {' '}
                    View Document
                  </a>{' '}
                </h6>
                <h6 className="pb-3 ">
                  Campaign Reference Letter :{' '}
                  <a
                    href={`https://mosquepay.org/mosquepaynew/assets/campaign_docs/${campRef}`}
                    className="text-blue-500 underline hover:underline-offset-4"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {' '}
                    View Document
                  </a>{' '}
                </h6>

                <h5 className="mt-3 mb-3 text-center text-green-900 ">
                  {' '}
                  Update User Status
                </h5>
                <form onSubmit={handleSubmit} className="mt-4 row gy-4">
                  <Col md="12">
                    <FormGroup>
                      <label className="mb-1">Campaign Reference</label>
                      <input
                        className="bg-gray-100 rounded-md form-control input-round"
                        required
                        type="text"
                        value={campId}
                        disabled
                      />
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <label className="mb-1">Status</label>
                      <select
                        className="mb-3 bg-gray-100 rounded-md form-control"
                        value={status}
                        required
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        {campStatus === '0' ? (
                          <>
                            <option value="0">Approved</option>
                            <option value="1">Pending</option>
                            <option value="2">Rejected</option>
                          </>
                        ) : campStatus === '1' ? (
                          <>
                            <option value="1">Pending</option>
                            <option value="0">Approved</option>
                            <option value="2">Rejected</option>
                          </>
                        ) : (
                          <>
                            <option value="2">Rejected</option>
                            <option value="0">Approved</option>
                            <option value="1">Pending</option>
                          </>
                        )}
                      </select>
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <label className="mb-1">Reason</label>
                      <textarea
                        className="mb-3 bg-gray-100 rounded-md form-control"
                        value={uReason}
                        required
                        onChange={(e) => setuReason(e.target.value)}
                      ></textarea>
                    </FormGroup>
                  </Col>
                  {status === '0' ? (
                    <>
                      <Col md="12">
                        <FormGroup>
                          <label className="mb-1">Account Number</label>
                          <input
                            className="bg-gray-100 rounded-md form-control input-round"
                            value={accountNo}
                            onChange={(e) => setAccountNo(e.target.value)}
                            required
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="12">
                        <FormGroup>
                          <label className="mb-1">Account Name</label>
                          <input
                            className="bg-gray-100 rounded-md form-control input-round"
                            value={accountName}
                            onChange={(e) => setAccountName(e.target.value)}
                            required
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </>
                  ) : null}

                  <button
                    className="text-white bg-green-800 rounded-md form-control hover:bg-green-500"
                    type="submit"
                  >
                    Submit
                  </button>
                </form>
              </div>
            ) : campType === 'NGO' ? (
              <div className="overflow-y-auto ">
                <h3 className="pb-3 "> Campaign ID : {campId}</h3>
                <h3 className="pb-3 ">Campaign Type : {campType}</h3>
                <h3 className="pb-3 "> Campaign Title : {campTitle}</h3>
                <h3 className="pb-3 "> Campaign Email : {campEmail}</h3>
                <h3 className="pb-3 ">
                  {' '}
                  Campaign Start Date : {campStartDate}
                </h3>
                <h3 className="pb-3 "> Campaign End Date : {campEndDate}</h3>
                <h3 className="pb-3 "> Campaign Amount : {campAmount}</h3>
                <h3 className="pb-3 ">
                  {' '}
                  Campaign Status :{' '}
                  {campStatus === '0' ? (
                    <span className="p-2 text-white bg-green-900 ">
                      Approved
                    </span>
                  ) : campStatus === '1' ? (
                    <span className="p-2 text-white bg-yellow-500 ">
                      Pending
                    </span>
                  ) : (
                    <span className="p-2 text-white bg-red-900 ">Rejected</span>
                  )}{' '}
                </h3>
                <h3 className="pb-3 "> Campaign reason : {campStory}</h3>
                <h6 className="pb-3 ">Reason : {campReason}</h6>
                <h6 className="pb-3 ">
                  Campaign Inserted date : {campInsertedDate}
                </h6>
                <h6 className="pb-3 ">
                  Campaign Approval Date : {campApprovalDate}
                </h6>
                <h6 className="pb-3 ">Campaign Bank Name : {campBankName}</h6>
                <h6 className="pb-3 ">
                  Campaign Account Number : {campAccount}
                </h6>
                <h6 className="pb-3 ">
                  Campaign BVN : {campBvn}{' '}
                  <span
                    onClick={handleVerification}
                    className="pl-2 text-blue-500 underline cursor-pointer hover:underline-offset-4"
                  >
                    {verifyName}{' '}
                  </span>
                </h6>
                {verifyD ? (
                  <div className="pt-3 pb-3 ">
                    <h6 className="pb-3 "> Name: {verifyBvn} </h6>
                    <h6 className="pb-3 ">Phone no: {verifyBvnNo} </h6>
                  </div>
                ) : null}
                <h6 className="pb-3 ">
                  Campaign Reference Letter :{' '}
                  <a
                    href={`https://mosquepay.org/mosquepaynew/assets/campaign_docs/${campRef}`}
                    target="_blank"
                    className="text-blue-500 underline hover:underline-offset-4"
                    rel="noreferrer"
                  >
                    {' '}
                    View Document
                  </a>{' '}
                </h6>
                <h6 className="pb-3 ">
                  Campaign Board Resolution :{' '}
                  <a
                    href={`https://mosquepay.org/mosquepaynew/assets/campaign_docs/${campBoardResolution}`}
                    target="_blank"
                    className="text-blue-500 underline hover:underline-offset-4"
                    rel="noreferrer"
                  >
                    {' '}
                    View Document
                  </a>{' '}
                </h6>
                <h5 className="mt-3 mb-3 text-center text-green-900 ">
                  {' '}
                  Update User Status
                </h5>
                <form onSubmit={handleSubmit} className="mt-4 row gy-4">
                  <Col md="12">
                    <FormGroup>
                      <label className="mb-1">Campaign Reference</label>
                      <input
                        className="bg-gray-100 rounded-md form-control input-round"
                        required
                        type="text"
                        value={campId}
                        disabled
                      />
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <label className="mb-1">Status</label>
                      <select
                        className="mb-3 bg-gray-100 rounded-md form-control"
                        value={status}
                        required
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        {campStatus === '0' ? (
                          <>
                            <option value="0">Approved</option>
                            <option value="1">Pending</option>
                            <option value="2">Rejected</option>
                          </>
                        ) : campStatus === '1' ? (
                          <>
                            <option value="1">Pending</option>
                            <option value="0">Approved</option>
                            <option value="2">Rejected</option>
                          </>
                        ) : (
                          <>
                            <option value="2">Rejected</option>
                            <option value="0">Approved</option>
                            <option value="1">Pending</option>
                          </>
                        )}
                      </select>
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <label className="mb-1">Reason</label>
                      <textarea
                        className="mb-3 bg-gray-100 rounded-md form-control"
                        value={uReason}
                        required
                        onChange={(e) => setuReason(e.target.value)}
                      ></textarea>
                    </FormGroup>
                  </Col>
                  {status === '0' ? (
                    <>
                      <Col md="12">
                        <FormGroup>
                          <label className="mb-1">Account Number</label>
                          <input
                            className="bg-gray-100 rounded-md form-control input-round"
                            value={accountNo}
                            onChange={(e) => setAccountNo(e.target.value)}
                            required
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="12">
                        <FormGroup>
                          <label className="mb-1">Account Name</label>
                          <input
                            className="bg-gray-100 rounded-md form-control input-round"
                            value={accountName}
                            onChange={(e) => setAccountName(e.target.value)}
                            required
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </>
                  ) : null}

                  <button
                    className="text-white bg-green-800 rounded-md form-control hover:bg-green-500"
                    type="submit"
                  >
                    Submit
                  </button>
                </form>
              </div>
            ) : null}
          </div>
        </ModalBody>
      </Modal>
    </div>
  )
}
