import React, { useEffect, useState } from 'react'
import axios from 'axios'
import UserChart from './UserChart'
import { Link } from 'react-router-dom'
import CampaignChart from './CampaignChart'
import questionMark from '../assets/svgs/Question.svg'
import sheikhSvg from '../assets/svgs/Sheikh.svg'
import User from '../assets/svgs/User.svg'
import fridayDon from '../assets/svgs/fridayDonations.svg'
// import questionMark from '../assets/svgs/Question.svg'
import Content from '../Layout/Content/Content'
import { Block } from '../component/Component'
import { WEB_BASE } from '../APIBase'

export default function Chart() {
  const [question, setQuestion] = useState('')
  const [needy, setNeedy] = useState('')
  const [sheikh, setSheikh] = useState('')
  const [fridayDonation, setFridayDonation] = useState('')
  const [totalAmount, setTotalAmount] = useState('')
  const [totalUsers, setTotalUsers] = useState('')

  useEffect(() => {
    axios
      .get(WEB_BASE + 'count_question_category', {
        headers: { 'x-api-key': '987654' },
      })
      .then((res) => {
        setQuestion(res.data.result[0].Number_of_question_Category)
      })
      .catch((err) => console.log(err))

    axios
      .get(WEB_BASE + 'count_needy_category', {
        headers: { 'x-api-key': '987654' },
      })
      .then((res) => {
        setNeedy(res.data.result[0].Number_of_Needy_category)
      })
      .catch((err) => console.log(err))

    axios
      .get(WEB_BASE + 'count_sheikh', { headers: { 'x-api-key': '987654' } })
      .then((res) => {
        setSheikh(res.data.result[0].Number_of_Sheikh)
      })
      .catch((err) => console.log(err))

    axios
      .get(WEB_BASE + 'friday_donation', { headers: { 'x-api-key': '987654' } })
      .then((res) => {
        setFridayDonation(res.data.result[0].Number_of_Friday_donation)
      })
      .catch((err) => console.log(err))

    axios
      .get(
        'https://mosquepay.org/mosquepayapi/v1/api/campaigns_total_donation',
        {
          headers: { 'x-api-key': '987654' },
        }
      )
      .then((res) => {
        setFridayDonation(res.data.result[0].Number_of_Friday_donation)
        console.log(fridayDon)
      })
      .catch((err) => console.log(err))
  }, [])

  const digits = async () => {
    try {
      const res = await axios.get(
        `https://mosquepay.org/mosquepayapi/v1/api/campaigns_total_donation`,
        {
          headers: { 'x-api-key': '987654' },
        }
      )
      // console.log(res.data.total_number_of_user)
      setTotalAmount(res.data.total_amount[0].amount)
      setTotalUsers(res.data.total_number_of_user[0].Txn_count)
    } catch (error) {
      console.error(error)
    }
  }
  digits()
  return (
    <div className="container mt-20 mb-5 h-fit ">
      <div className="mt-2">
        <p className="text-2xl text-center">Analytics</p>
        <div className="flex flex-col p-4 mx-auto max-w-screen-2xl md:p-6 2xl:p-10">
          <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-y-6 md:gap-x-6 xl:grid-cols-4 2xl:gap-x-8">
            <div className="px-8 py-6 bg-white border rounded-md shadow-md border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
              <Link to="/question">
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="bg-green-200 rounded-full">
                    <img
                      src={questionMark}
                      alt="questions"
                      className="w-10 h-10 p-2 rounded-full"
                    />
                  </div>
                  <div className="w-full text-5xl font-bold text-black dark:text-white">
                    <span className="block w-full text-center text-green-900 truncate">
                      {totalAmount}
                    </span>
                  </div>
                  <h2 className="text-base text-center text-slate-500">
                    Total Amount Donated
                  </h2>
                </div>
              </Link>
            </div>
            <div className="px-8 py-6 bg-white border rounded-md shadow-md border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
              <Link to="/needy">
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="bg-green-200 rounded-full">
                    <img
                      src={User}
                      alt="questions"
                      className="w-10 h-10 p-1 rounded-full"
                    />
                  </div>
                  <div className="w-full text-5xl font-bold text-black dark:text-white">
                    <span className="block w-full text-center text-green-900 truncate">
                      {totalUsers}
                    </span>
                  </div>
                  <h2 className="text-base text-center text-slate-500">
                    Total Users
                  </h2>
                </div>
                {/* <h2 className="text-center ">Needy Category</h2>
                <div className="w-full ">
                  <span className="block w-full p-2 mt-12 text-center text-white bg-green-900 rounded-md ">
                    {needy}
                  </span>
                </div> */}
              </Link>
            </div>
            <div className="px-8 py-6 bg-white border rounded-md shadow-md border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
              <Link to="/sheikh">
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="bg-green-200 rounded-full">
                    <img
                      src={sheikhSvg}
                      alt="questions"
                      className="p-1 rounded-full w-11 h-11"
                    />
                  </div>
                  <div className="w-full text-5xl font-bold text-black dark:text-white">
                    <span className="block w-full text-center text-green-900 ">
                      {sheikh}
                    </span>
                  </div>
                  <h2 className="text-base text-center text-slate-500">
                    Sheikh
                  </h2>
                </div>
                {/* <h2 className="text-center ">Sheikh</h2>
                <div className="w-full ">
                  <span className="block w-full p-2 mt-12 text-center text-white bg-green-900 rounded-md ">
                    {sheikh}
                  </span>
                </div> */}
              </Link>
            </div>
            <div className="px-8 py-6 bg-white border rounded-md shadow-md border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
              <Link to="/donation">
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="bg-green-200 rounded-full">
                    <img
                      src={fridayDon}
                      alt="questions"
                      className="p-1 rounded-full w-11 h-11"
                    />
                  </div>
                  <div className="w-full text-5xl font-bold text-black dark:text-white">
                    <span className="block w-full text-center text-green-900 ">
                      {fridayDonation}
                    </span>
                  </div>
                  <h2 className="text-base text-center text-slate-500">
                    Friday Donation
                  </h2>
                </div>
                {/* <h2 className="text-center ">Friday Donation</h2>
                <div className="w-full">
                  <span className="block w-full p-2 mt-12 text-center text-white bg-green-900 rounded-md ">
                    {fridayDonation}
                  </span>
                </div> */}
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-12 mt-4 gap-y-4 gap-x-4 md:mt-6 md:gap-x-6 2xl:mt-8 2xl:gap-x-8">
            <div className="col-span-12 px-5 pt-8 pb-5 bg-white border rounded-md shadow-md border-stroke shadow-default dark:border-strokedark dark:bg-boxdark sm:px-8 xl:col-span-8">
              <Link to="/user">
                <div className="bg-white ">
                  <div className="object-contain max-h-full min-w-full">
                    <UserChart />
                  </div>
                </div>
              </Link>
            </div>
            <div className="flex flex-col items-center justify-center col-span-12 p-8 bg-white border rounded-md shadow-md border-stroke shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
              <Link to="/campaign">
                <div>
                  <CampaignChart />
                </div>
              </Link>
            </div>
          </div>
        </div>
        {/* <div className="">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-8">
                <Link to="/question">
                  <div className="w-full h-full p-5 bg-white rounded-md shadow-md">
                    <h2 className="text-center ">Questions Category</h2>
                    <div className="w-full m-2 ">
                      {' '}
                      <h3 className="text-center "> </h3>
                      <span className="block w-full p-2 mt-12 text-center text-white bg-green-900 rounded-md ">
                        {question}
                      </span>
                    </div>
                  </div>
                </Link>
                <Link to="/needy">
                  <div className="w-full h-full p-5 bg-white rounded-md shadow-md">
                    <h2 className="text-center ">Needy Categories</h2>
                    <div className="w-full m-2 ">
                      {' '}
                      <h3 className="text-center "> </h3>
                      <span className="block w-full p-2 mt-12 text-center text-white bg-green-900 rounded-md ">
                        {needy}
                      </span>
                    </div>
                  </div>
                </Link>
                <Link to="/sheikh">
                  <div className="w-full h-full p-5 bg-white rounded-md shadow-md">
                    <h2 className="text-center ">Sheikh</h2>
                    <div className="w-full m-2 ">
                      {' '}
                      <h3 className="text-center "> </h3>
                      <span className="block w-full p-2 mt-12 text-center text-white bg-green-900 rounded-md ">
                        {sheikh}
                      </span>
                    </div>
                  </div>
                </Link>
                <Link to="/donation">
                  <div className="w-full h-full p-5 bg-white rounded-md shadow-md">
                    <h2 className="text-center ">Friday Donation</h2>
                    <div className="w-full m-2 ">
                      {' '}
                      <h3 className="text-center "> </h3>
                      <span className="block w-full p-2 mt-12 text-center text-white bg-green-900 rounded-md ">
                        {fridayDonation}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="grid grid-cols-12 gap-4 mt-4 md:mt-6 md:gap-6 2xl:mt-8 2xl:gap-8">
                <Link to="/user">
                  <div className="w-full h-full p-2 bg-white rounded-md shadow-md">
                    <div className="object-contain max-h-full min-w-full">
                      <UserChart />
                    </div>
                  </div>
                </Link>
                <Link to="/campaign">
                  <div className="w-full h-full p-5 bg-white rounded-md shadow-md">
                    <div className="object-contain max-h-full min-w-full">
                      <CampaignChart />
                    </div>
                  </div>
                </Link>
              </div>
            </div> */}
      </div>
    </div>
  )
}

// // Whole page
// ;<div className="p-4 mx-auto max-w-screen-2xl md:p-6 2xl:p-10">
// // Grid rows
//   <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-8">
// // One Grid
//     <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">

//       <div className="flex justify-end h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
//         svg
//       </div>
//       <div className="flex flex-col items-center justify-center">
//         <h4 class="text-title-md font-bold text-black dark:text-white">
//           $3.456K
//         </h4>
//         <span class="text-sm font-medium">Total views</span>
//       </div>
//     </div>
//   </div>
//   <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5"></div>
// </div>
