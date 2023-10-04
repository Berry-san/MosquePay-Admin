import React, { useEffect, useState } from 'react'

import axios from 'axios'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import { Spinner } from 'reactstrap'
import { WEB_BASE } from '../APIBase'
import axiosInstance from '../utils/axios'
export default function Setup() {
  const [password, setPassword] = useState('')
  const [passwordConfim, setPasswordConfirm] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const eemail = sessionStorage.getItem('email')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password == passwordConfim) {
      console.log(password, email)
      setLoading(true)
      axiosInstance
        .post(
          'activate_sheikh',
          qs.stringify({ email: email, password: password }),
          {
            headers: {
              'x-api-key': '987655',
              'content-type': 'application/x-www-form-urlencoded',
            },
          }
        )
        .then((res) => {
          console.log(res)
          navigate('/')
        })
        .catch((err) => {
          console.log(err)
          setError(err.data.message)
          setLoading(false)
        })
    } else {
      setError('Password does not match')
    }
  }
  useEffect(() => {
    setEmail(eemail)
  }, [eemail])

  return (
    <div>
      <Navbar />
      <div className="h-full pt-20">
        <div className="z-10 form-back">
          <div className="pt-10 text-center ">
            <h1 className="text-black ">Create Password </h1>
          </div>
          <div className="relative z-10 w-1/3 px-8 pt-1 pb-10 mx-auto my-2 bg-white rounded-md  min-w-fit drop-shadow-lg border-slate-900">
            <form onSubmit={handleSubmit}>
              <p className="text-center "> Activate your password</p>
              <div className="mt-10">
                <label className="text-black" htmlFor="email">
                  Email
                </label>
                <input
                  placeholder="Email"
                  id="user-email"
                  className="w-full p-3 bg-gray-100 form-control input-round"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </div>
              <div className="mt-10">
                <label className="text-black" htmlFor="password">
                  Password
                </label>
                <input
                  placeholder="Password"
                  id="user-pword"
                  className="w-full p-3 bg-gray-100 form-control input-round"
                  type="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
              </div>
              <div className="mt-10">
                <label className="text-black" htmlFor="password">
                  Confirm Password
                </label>
                <input
                  placeholder="Password"
                  id="user-pword"
                  className="w-full p-3 bg-gray-100 form-control input-round"
                  type="Password"
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  value={passwordConfim}
                  required
                />
              </div>
              {error && (
                <div className="pt-3 text-center text-red-600">{error}</div>
              )}

              <div className="mt-10">
                <button
                  type="submit"
                  className="w-full p-3 mb-3 text-white bg-green-600 rounded-md btn hover:bg-green-700 hover:text-slate-100"
                >
                  {loading ? (
                    <Spinner size="sm" color="light" />
                  ) : (
                    'Activate Password'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
