import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import qs from 'qs'
import { FormGroup } from 'reactstrap'
import { Col } from '../component/Component'
import { WEB_BASE } from '../APIBase'

export default function QuestionUpdate() {
  const [category, setCategory] = useState('')
  const { id } = useParams()
  const [description, setDescription] = useState('')

  const navigate = useNavigate()

  let admin_idd = sessionStorage.getItem('admin_iid')
  useEffect(() => {
    axios
      .get(WEB_BASE + `single_question_category/${id}`, {
        headers: { 'x-api-key': '987655' },
      })
      .then((res) => {
        setCategory(res.data.result[0].category)
        setDescription(res.data.result[0].description)
      })
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      axios.post(
        WEB_BASE + `update_question_category/${id}`,
        qs.stringify({
          category: category,
          description: description,
          admin_id: admin_idd,
        }),
        { headers: { 'x-api-key': '987655' } }
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
    <div className=" mt-20">
      <div className=" ">
        <h3 className=" text-center text-green-800">
          {' '}
          Create Question Category
        </h3>
        <form onSubmit={handleSubmit}>
          <div className=" row w-3/4 min-w-fit mx-auto  ">
            <Col md="12">
              <FormGroup>
                <label>Question</label>
                <input
                  type="text"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className=" w-full mb-3 p-3 rounded-md input-round bg-gray-100 "
                />
              </FormGroup>
            </Col>
            <Col md="12">
              <FormGroup>
                <label className=" mt-3">Description</label>
                <input
                  type="text"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className=" w-full mb-3 p-3 rounded-md input-round bg-gray-100 "
                />
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
