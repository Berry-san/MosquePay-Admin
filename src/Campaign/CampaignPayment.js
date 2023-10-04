import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

import { Modal, ModalBody } from 'reactstrap'
import { WEB_BASE } from '../APIBase'
import { Icon } from '../component/Component'
import axiosInstance from '../utils/axios'

export default function CampaignPayment() {
  const [payments, setPayment] = useState([])
  const [modal, setModal] = useState({
    add: true,
  })
  let { payment } = useParams()

  useEffect(() => {
    axiosInstance
      .get(`campaign_recent_donation/${payment}`)
      .then((res) => {
        setPayment(res.data.result)
      })
  })
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
          <table className="w-full text-center table-auto">
            <thead>
              <tr className="tb-tnx-head border-y-2">
                <th className="border-2">Name</th>
                <th className="border-2">Amount</th>
                <th className="border-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((pay) => {
                return (
                  <tr className="tb-tnx-item">
                    <td className="border-2">{pay.names}</td>
                    <td className="border-2">{pay.amount}</td>
                    <td className="border-2">{pay.date}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {payments.length === 0 ? (
            <p className="text-center text-red-800 ">No Payments made yet</p>
          ) : null}
        </ModalBody>
      </Modal>
    </div>
  )
}
