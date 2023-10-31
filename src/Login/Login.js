import React, { useState } from 'react'
import axios from 'axios'
import qs from 'qs'
import Navbar from '../Components/Navbar'
import { Icon } from '../component/Component'
import { Spinner } from 'reactstrap'
import { WEB_BASE } from '../APIBase'
import { showErrorToast } from '../component/utils/alert'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axiosInstance from '../utils/axios'

export default function Login() {
  // const [user, setUser] = useState('');
  const [passcode, setPasscode] = useState('')
  const [passState, setPassState] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    //console.log(password,  email, name)
    axiosInstance
      .post('back_login', qs.stringify({ email: email, password: passcode }))
      .then((res) => {
        // console.log(res.data)
        // alert(res.data.message)

        if (res.data.message === 'Login Successful') {
          const newname = res.data.user_details[0].sheikh_Name
          const role = res.data.user_details[0].user_type
          const sheikh_id = res.data.user_details[0].Sheikh_ID
          const admin_id = res.data.user_details[0].Admin_id
          const admin_name = res.data.user_details[0].Admin_Fullname
          const email = res.data.user_details[0].email
          const accountant = res.data.user_details[0].user_type
          //set session

          sessionStorage.setItem('username', newname)
          sessionStorage.setItem('user_role', role)
          sessionStorage.setItem('sheikh_id', sheikh_id)
          sessionStorage.setItem('admin_iid', admin_id)
          sessionStorage.setItem('acc', accountant)
          sessionStorage.setItem('admin_name', admin_name)
          sessionStorage.setItem('email', email)

          if (res.data.user_details[0].password_status === '1') {
            window.location.href = '/setup'
          } else {
            window.location.href = '/'
          }
          toast.success(res.data.message)
        } else {
          setError(res.data.message)
          setLoading(false)
          // showErrorToast(res.data.message)
          toast.error(res.data.message)
          console.log()
        }
      })
      .catch((err) => {
        setLoading(false)
        // showErrorToast(err.message)
        toast.error(err.message)
      })
  }
  return (
    <div>
      <Navbar />
      <ToastContainer
        theme="colored"
        bodyClassName={() => 'flex text-white items-center'}
      />

      <div className="h-full pt-20">
        <div className="z-10 w-screen form-back">
          <div className="pt-10 text-center ">
            <h1 className="text-black ">Login</h1>
          </div>
          <div className="relative z-10 w-1/3 px-8 pt-1 pb-10 mx-auto my-2 bg-white rounded-md min-w-fit drop-shadow-lg border-slate-900">
            <form onSubmit={handleSubmit}>
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
                <label className="text-black" htmlFor="email">
                  Password
                </label>
                <div className="form-control-wrap">
                  <a
                    href="#password"
                    onClick={(ev) => {
                      ev.preventDefault()
                      setPassState(!passState)
                    }}
                    className={`form-icon lg form-icon-right passcode-switch ${
                      passState ? 'is-hidden' : 'is-shown'
                    }`}
                  >
                    <Icon name="eye" className="passcode-icon icon-show"></Icon>

                    <Icon
                      name="eye-off"
                      className="passcode-icon icon-hide"
                    ></Icon>
                  </a>
                  <input
                    type={passState ? 'text' : 'password'}
                    id="password"
                    name="passcode"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Enter your Password"
                    className={`form-control-lg bg-gray-100 form-control ${
                      passcode ? 'is-hidden' : 'is-shown'
                    }`}
                  />
                </div>
              </div>
              {/* {error && (
                <div className="pt-3 text-center text-red-600">{error}</div>
              )} */}

              <div className="mt-10">
                <button
                  type="submit"
                  className="flex justify-center w-full p-3 mb-3 text-white bg-green-600 rounded-md text-md btn hover:bg-green-700 hover:text-slate-100"
                >
                  {loading ? <Spinner size="sm" color="light" /> : 'Login'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
