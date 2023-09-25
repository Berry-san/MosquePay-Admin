import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import qs from 'qs'
import { FormGroup } from 'reactstrap'
import { Col } from '../component/Component'
import { WEB_BASE } from '../APIBase'

export default function CreateNeedy() {
  const [needyName, setNeedyName] = useState('')
  const [needyDescription, setNeedyDescription] = useState('')
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(needyName, needyDescription)
    try {
      const res = axios.post(
        WEB_BASE + 'create_needy_category',
        qs.stringify({ category: needyName, description: needyDescription }),
        {
          headers: {
            'x-api-key': '987655',
            'content-type': 'application/x-www-form-urlencoded',
          },
        }
      )
      console.log(res)
      alert('Needy Campaign Created Successfully')
      navigate('/needy')
    } catch (e) {
      console.log(e.response)
      alert('Error in creating needy campaign')
    }
  }

  return (
    <div className=" mt-28  md:mt-28">
      <div className=" ">
        <h3 className=" text-center text-green-800">
          {' '}
          Create Question Category
        </h3>
        <form onSubmit={handleSubmit}>
          <div className=" row w-3/4 min-w-fit mx-auto  ">
            <Col md="12">
              <FormGroup>
                <label> Needy name</label>
                <input
                  required
                  type="text"
                  name="name"
                  value={needyName}
                  onChange={(e) => setNeedyName(e.target.value)}
                  className=" w-full mb-3 p-3 rounded-md input-round bg-gray-100 "
                />
              </FormGroup>
            </Col>
            <Col md="12">
              <FormGroup>
                <label className=" mt-3">Description</label>
                <textarea
                  required
                  name="description"
                  value={needyDescription}
                  onChange={(e) => setNeedyDescription(e.target.value)}
                  className=" form-control rounded-md  bg-gray-100 "
                ></textarea>
              </FormGroup>
            </Col>
            <button
              className="  form-control  mt-4 rounded-md text-white  bg-green-800 hover:bg-green-500"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
