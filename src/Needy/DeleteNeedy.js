import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import qs from 'qs'
import { Modal, ModalBody } from 'reactstrap'
import { WEB_BASE } from '../APIBase'
import { Icon } from '../component/Component'
import Cancel from '../images/x.svg'
import Check from '../images/ck.svg'

export default function DeleteNeedy() {
  let { id } = useParams()
  let { name } = useParams()

  const [modal, setModal] = useState({
    add: true,
  })

  const handleDelete = () => {
    try {
      const res = axios.post(
        WEB_BASE + 'delete_needy_category',
        qs.stringify({ Name: name, id: id }),
        {
          headers: {
            'x-api-key': '987655',
            'content-type': 'application/x-www-form-urlencoded',
          },
        }
      )
      console.log(res)
      window.location.href = '/needy'
      alert('Needy Campaign Deleted Successfully')
    } catch (e) {
      console.log(e.response)
      alert('Error in deleting needy campaign')
    }
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
          <Link to="/needy" className="close">
            <Icon name="cross-sm"></Icon>
          </Link>

          <h1 className=" text-center pt-3 pb-3">
            Are you sure you want to delete{' '}
            <span className=" uppercase">{name}</span>?
          </h1>

          <div className="flex justify-around mt-6">
            <Link to={`/needy`}>
              <button className=" bg-red-600  rounded-lg p-2 px-4 text-white">
                <img src={Cancel} alt="Cancel" className=" inline" />
                <span className=" inline"> No</span>
              </button>
            </Link>
            <form onSubmit={handleDelete}>
              <button className=" bg-green-600 rounded-lg p-2 px-4 text-white">
                <img src={Check} alt="Check" className=" inline" />
                <span className=" inline"> Yes</span>
              </button>
            </form>
          </div>
        </ModalBody>
      </Modal>
    </div>
  )
}
