import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import qs from 'qs'
import { FormGroup } from 'reactstrap'
import { Col } from '../component/Component'
import { WEB_BASE } from '../APIBase'

export default function UpdateNeedy() {
  const { id } = useParams()

  const navigate = useNavigate()
  const [needyName, setNeedyName] = useState('')
  const [needyDescription, setNeedyDescription] = useState('')

  useEffect(() => {
    axios
      .get(WEB_BASE + `single_needycategory/${id}`, {
        headers: { 'x-api-key': '987654' },
      })
      .then((res) => {
        console.log(res.data.result)
        setNeedyName(res.data.result[0].category)
        setNeedyDescription(res.data.result[0].description)
      })
      .catch((err) => console.log(err))
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(needyName, needyDescription)
    try {
      axios.post(
        WEB_BASE + `update_needy_category/${id}`,
        qs.stringify({ category: needyName, description: needyDescription }),
        { headers: { 'x-api-key': '987654' } }
      )
      alert('Needy details Updated Successfully')
      navigate('/needy')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className=" mt-28">
      <div className=" ">
        <h3 className=" text-center text-green-800">
          {' '}
          Create Question Category
        </h3>
        <form onSubmit={handleSubmit}>
          <div className=" row w-3/4 min-w-fit mx-auto  ">
            <Col md="12">
              <FormGroup>
                <label>Category Name</label>
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
                  className=" block w-full mb-3 p-3 rounded-md input-round bg-gray-100 "
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
