import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import qs from 'qs'
import { FormGroup, Modal, ModalBody } from 'reactstrap'
import { WEB_BASE } from '../APIBase'
import { Icon, Col } from '../component/Component'
import axiosInstance from '../utils/axios'
import Editor from '../component/Editor'

export default function EditCampaign() {
  let { id } = useParams()

  const [uReason, setuReason] = useState('')
  const [campId, setCampId] = useState('')
  const [campTitle, setCampTitle] = useState('')
  const [campType, setCampType] = useState('')
  const [campEmail, setCampEmail] = useState('')
  const [campStartDate, setCampStartDate] = useState('')
  const [campEndDate, setCampEndDate] = useState('')
  const [campAmount, setCampAmount] = useState('')
  const [campStory, setCampStory] = useState('')
  const [campRef, setCampRef] = useState('')
  const [modal, setModal] = useState({
    add: true,
  })

  const admin_idd = sessionStorage.getItem('admin_iid')

  useEffect(() => {
    axiosInstance.get(`full_campaign/${id}`).then((res) => {
      setCampId(res.data.result[0].CampaignID)
      setCampTitle(res.data.result[0].title)
      setCampType(res.data.result[0].Campaign_Type)
      setCampEmail(res.data.result[0].email)
      setCampStartDate(res.data.result[0].start_date)
      setCampEndDate(res.data.result[0].end_date)
      setCampAmount(res.data.result[0].amount)
      setCampRef(res.data.result[0].reference_letter)
      setCampStory(res.data.result[0].campaign_story)
    })
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()

    try {
      axiosInstance.post(
        'update_campaigns',
        qs.stringify({
          email: campEmail,
          campaign_reference: campId,
          amount: campAmount,
          campaign_story: campStory,
          title: campTitle,
          start_date: campStartDate,
          end_date: campEndDate,
        })
      )
      toast.success('Campaign Approved Successfully')

      window.location.href = '/campaign'
      setModal({ add: false })
    } catch (e) {
      toast.error(e.response)
    }
  }

  return (
    <div>
      <ToastContainer
        theme="colored"
        bodyClassName={() => 'flex text-white items-center'}
      />
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
                {/* <h3 className="pb-3 "> Campaign reason : {campStory}</h3> */}
                <h5 className="mt-3 mb-3 text-center text-green-900 ">
                  {' '}
                  Edit Campaign
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
                      <label className="mb-1">Email</label>
                      <input
                        className="bg-gray-100 rounded-md form-control input-round"
                        value={campEmail}
                        onChange={(e) => setCampEmail(e.target.value)}
                        required
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <label className="mb-1">Campaign Title</label>
                      <input
                        className="bg-gray-100 rounded-md form-control input-round"
                        value={campTitle}
                        onChange={(e) => setCampTitle(e.target.value)}
                        required
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <label className="mb-1">Campaign Story</label>
                      <Editor
                        value={campStory}
                        onChange={(value) => setCampStory(value)}
                      />
                    </FormGroup>
                  </Col>
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
