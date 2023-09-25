import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import qs from 'qs'
import { FormGroup } from 'reactstrap'
import { Col } from '../component/Component'
import { WEB_BASE } from '../APIBase'

export default function UpdateSheikh() {
  const navigate = useNavigate()

  const [sheikh_name, setSheikhName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { id } = useParams()
  useEffect(() => {
    axios
      .get(WEB_BASE + `get_sheikh/${id}`, {
        headers: { 'x-api-key': '987655' },
      })
      .then((res) => {
        console.log(res.data.result[0].email)
        setSheikhName(res.data.result[0].sheikh_name)
        setEmail(res.data.result[0].email)
        setPassword(res.data.result[0].popular_name)
      })
      .catch((err) => console.log(err))
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(sheikh_name, email, password)
    try {
      axios.post(
        WEB_BASE + `update_sheikh/${id}`,
        qs.stringify({
          sheikh_name: sheikh_name,
          email: email,
          popular_name: password,
        }),
        { headers: { 'x-api-key': '987655' } }
      )
      alert('Sheikh Updated Successfully')
      navigate('/sheikh')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="pt-10 mt-20">
      <div className=" ">
        <h3 className=" text-center text-green-800">
          {' '}
          Create Question Category
        </h3>
        <form onSubmit={handleSubmit}>
          <div className=" row w-3/4 min-w-fit mx-auto  ">
            <Col md="12">
              <FormGroup>
                <label>Name</label>
                <input
                  type="text"
                  value={sheikh_name}
                  onChange={(e) => setSheikhName(e.target.value)}
                  className=" form-control rounded-md  bg-gray-100 "
                />
              </FormGroup>
            </Col>
            <Col md="12">
              <FormGroup>
                <label className=" mt-3">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control rounded-md bg-gray-100 "
                />
              </FormGroup>
            </Col>
            <Col md="12">
              <FormGroup>
                <label className=" mt-3">Popular Name</label>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className=" form-control rounded-md  bg-gray-100 "
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
