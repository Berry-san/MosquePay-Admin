import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import qs from 'qs'
import { FormGroup } from 'reactstrap'
import { Col } from '../component/Component'
import { WEB_BASE } from '../APIBase'
import axiosInstance from '../utils/axios'

export default function QuestionUpdate() {
  const [category, setCategory] = useState('')
  const { id } = useParams()
  const [description, setDescription] = useState('')

  const navigate = useNavigate()

  let admin_idd = sessionStorage.getItem('admin_iid')
  useEffect(() => {
    axiosInstance
      .get(`single_question_category/${id}`)
      .then((res) => {
        setCategory(res.data.result[0].category)
        setDescription(res.data.result[0].description)
      })
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      axiosInstance.post(
         `update_question_category/${id}`,
        qs.stringify({
          category: category,
          description: description,
          admin_id: admin_idd,
        }),
      )
      alert('Question Updated Successfully')
      navigate('/question')
      setCategory('')
      setDescription('')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="mt-20 ">
      <div className="">
        <h3 className="text-center text-green-800 ">
          {' '}
          Create Question Category
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="w-3/4 mx-auto  row min-w-fit">
            <Col md="12">
              <FormGroup>
                <label>Question</label>
                <input
                  type="text"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 mb-3 bg-gray-100 rounded-md  input-round"
                />
              </FormGroup>
            </Col>
            <Col md="12">
              <FormGroup>
                <label className="mt-3 ">Description</label>
                <input
                  type="text"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 mb-3 bg-gray-100 rounded-md  input-round"
                />
              </FormGroup>
            </Col>
            <button
              className="mt-4 text-white bg-green-800 rounded-md  form-control hover:bg-green-500"
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
