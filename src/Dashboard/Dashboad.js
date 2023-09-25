import React, { useEffect, useState, useLayoutEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import Sidebar from '../Components/Sidebar'
import Header from '../Components/Header'
import classNames from 'classnames'
import Answer from '../Answer/Answer'
import Chart from '../Chart/Chart'
import Campaign from '../Campaign/Campaign'
import CampaignFull from '../Campaign/CampaignFull'
import Donation from '../Donation/Donation'
import DonationCreate from '../Donation/DonationCreate'
import CreateNeedy from '../Needy/CreateNeedy'
import Needy from '../Needy/Needy'
import UpdateNeedy from '../Needy/UpdateNeedy'
import CreateQuestion from '../Question/CreateQuestion'
import Question from '../Question/Question'
import Questions from '../Questions/Question'
import QuestionUpdate from '../Question/QuestionUpdate'
import CreateSheikh from '../Sheikh/CreateSheikh'
import Sheikh from '../Sheikh/Sheikh'
import UpdateSheikh from '../Sheikh/UpdateSheikh'
import User from '../User/User'
// import Footer from "../Footer/Footer";
import EmailSubscriber from '../EmailSubscriber/EmailSubscriber'
import SocialMedia from '../Social/SocialMedia'
import DeleteNeedy from '../Needy/DeleteNeedy'
import CampaignPayment from '../Campaign/CampaignPayment'
import Payments from '../Payments/Payments'
import QuestionsAdmin from '../Questions/QuestionsAdmin'
import QuestionApproval from '../Questions/QuestionApproval'
import QuestionDelete from '../Questions/QuestionDelete'
import Referral from '../Referral/Referral'
import ReferralDetails from '../Referral/ReferralDetails'
import ReferralCount from '../Referral/ReferralCount'
import Ramdan from '../Ramdan'
import Aboutus from '../Aboutus'
import Seminar from '../Seminar/Seminar'
import CampaignList from '../Campaign List/CampaignList'

const Layout = () => {
  //Sidebar
  const [mobileView, setMobileView] = useState()
  const [visibility, setVisibility] = useState(false)
  const [themeState] = useState({
    main: 'default',
    sidebar: 'dark',
    header: 'white',
    skin: 'light',
    // skin: 'light',
  })

  useEffect(() => {
    viewChange()
  }, [])

  // Stops scrolling on overlay
  useLayoutEffect(() => {
    if (visibility) {
      document.body.style.overflow = 'hidden'
      document.body.style.height = '100%'
    }
    if (!visibility) {
      document.body.style.overflow = 'auto'
      document.body.style.height = 'auto'
    }
  }, [visibility])

  // function to toggle sidebar
  const toggleSidebar = (e) => {
    e.preventDefault()
    // if (visibility === false) {
    //   setVisibility(true)
    // } else {
    //   setVisibility(false)
    // }
    setVisibility(!visibility)
  }

  useEffect(() => {
    document.body.className = `nk-body bg-lighter npc-default has-sidebar no-touch nk-nio-theme ${
      themeState.skin === 'dark' ? 'dark-mode' : ''
    }`
  }, [themeState.skin])

  // function to change the design view under 1200 px
  const viewChange = () => {
    // console.log(window.innerWidth)
    if (window.innerWidth < 1200) {
      setMobileView(true)
    } else {
      setMobileView(false)
      setVisibility(false)
    }
  }
  window.addEventListener('load', viewChange)
  window.addEventListener('resize', viewChange)

  const sidebarClass = classNames({
    'nk-sidebar-mobile': mobileView,
    'nk-sidebar-active': visibility && mobileView,
  })

  return (
    <React.Fragment>
      <div className="nk-app-root">
        <div className="nk-main">
          <Sidebar
            sidebarToggle={toggleSidebar}
            fixed
            mobileView={mobileView}
            theme={themeState.sidebar}
            className={sidebarClass}
          />
          {visibility && mobileView && (
            <div className="nk-sidebar-overlay" onClick={toggleSidebar}></div>
          )}
          <div className="nk-wrap">
            <Header
              sidebarToggle={toggleSidebar}
              setVisibility={setVisibility}
              fixed
              theme={themeState.header}
            />
            {sessionStorage.getItem('user_role') === 'admin' ? (
              <Routes>
                <Route path="/" element={<Chart />} />
                <Route path="/campaign" element={<Campaign />}>
                  <Route path=":id" element={<CampaignFull />} />
                  <Route
                    path="payment/:payment"
                    element={<CampaignPayment />}
                  />
                </Route>
                <Route path="/campaignList" element={<CampaignList />} />
                <Route path="/payments" element={<Payments />} />
                <Route path="/seminar" element={<Seminar />} />
                <Route path="/donation" element={<Donation />} />
                <Route path="/ramadan" element={<Ramdan />} />
                <Route path="/aboutus" element={<Aboutus />} />
                <Route path="/createdonation" element={<DonationCreate />} />
                <Route path="/createneedy" element={<CreateNeedy />} />
                <Route
                  path="/email-subscribers"
                  element={<EmailSubscriber />}
                />
                <Route path="/socialmedia" element={<SocialMedia />} />
                <Route path="/needy" element={<Needy />}>
                  <Route path=":id/:name" element={<DeleteNeedy />} />
                </Route>
                <Route path="/needyupdate/:id" element={<UpdateNeedy />} />
                <Route path="/createquestion" element={<CreateQuestion />} />
                <Route path="/question" element={<Question />} />
                <Route
                  path="/questionupdate/:id"
                  element={<QuestionUpdate />}
                />
                <Route path="/createsheikh" element={<CreateSheikh />} />
                <Route path="/sheikh" element={<Sheikh />} />
                <Route path="/sheikhupdate/:id" element={<UpdateSheikh />} />
                <Route path="/user" element={<User />} />
                <Route path="/que" element={<QuestionsAdmin />}>
                  <Route
                    path="questionapproval/:email/:ref"
                    element={<QuestionApproval />}
                  />
                  <Route path="delete/:id" element={<QuestionDelete />} />
                </Route>
                <Route path="/referralcount" element={<ReferralCount />} />
                <Route path="*" element={<Chart />} />
              </Routes>
            ) : sessionStorage.getItem('user_role') === 'sheikh' ? (
              <Routes>
                <Route path="/" element={<Questions />} />
                <Route path="/answer/:id" element={<Answer />} />
                <Route path="*" element={<Questions />} />
              </Routes>
            ) : sessionStorage.getItem('acc') === 'accountant' ? (
              <Routes>
                <Route path="/campaignreferral" element={<Referral />}>
                  <Route path=":details" element={<ReferralDetails />} />
                </Route>
                <Route path="*" element={<Referral />} />
              </Routes>
            ) : null}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
export default Layout
