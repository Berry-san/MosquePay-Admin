// import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import './App.css'
// import Dashboard from './Dashboard/Dashboad'
// import Login from './Login/Login'
// import Setup from './Setup/Setup'
// import Logout from './logout'

// import React from 'react'

// // const Logout = React.lazy(() => import('./logout'))

// class App extends React.Component {
//   constructor(props) {
//     super(props)
//     var email = sessionStorage.getItem('email')

//     if (email === null) {
//       this.loggedIn = false
//     } else {
//       this.loggedIn = true
//       setTimeout(this.logout, 1800000)
//     }
//   }

//   // logout() {
//   //   sessionStorage.removeItem('email')
//   //   this.loggedIn = false
//   //   window.location.href = '/login'
//   // }
//   render() {
//     return this.loggedIn === true ? (
//       <div>
//         <BrowserRouter>
//           <Routes>
//             <Route path="/setup" element={<Setup />} />
//             <Route path="/logout" element={<Logout />} />
//             <Route path="*" element={<Dashboard />} />
//           </Routes>
//         </BrowserRouter>
//       </div>
//     ) : (
//       <div>
//         <BrowserRouter>
//           <Routes>
//             <Route path="/login" element={<Login />} />
//             <Route path="*" element={<Login />} />
//           </Routes>
//         </BrowserRouter>
//       </div>
//     )
//   }
// }

// export default App
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './Dashboard/Dashboad'
import Login from './Login/Login'
import Setup from './Setup/Setup'
import Logout from './logout'

import React, { useState, useEffect } from 'react'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const email = sessionStorage.getItem('email')
    if (email !== null) {
      setLoggedIn(true)
      setTimeout(logout, 1800000)
    }
  }, [])

  const logout = () => {
    sessionStorage.removeItem('email')
    setLoggedIn(false)
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {loggedIn ? (
            <>
              <Route path="/setup" element={<Setup />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="*" element={<Dashboard />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Login />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
