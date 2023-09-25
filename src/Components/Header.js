import React from 'react'
import classNames from 'classnames'
import Toggle from './Toggle'
import Logo from './Logo'
import userSvg from '../assets/svgs/User.svg'

const Header = ({ fixed, theme, className, setVisibility, ...props }) => {
  const headerClass = classNames({
    'nk-header': true,
    'nk-header-fixed': fixed,
    [`is-light`]: theme === 'white',
    [`is-${theme}`]: theme !== 'white' && theme !== 'light',
    [`${className}`]: className,
  })
  return (
    <div className={headerClass}>
      <div className="container-fluid">
        <div className="nk-header-wrap">
          <div className="nk-menu-trigger d-xl-none ml-n1">
            <Toggle
              className="nk-nav-toggle nk-quick-nav-icon d-xl-none ml-n1"
              icon="menu"
              click={props.sidebarToggle}
            />
          </div>
          <div className="nk-header-brand d-xl-none">
            <Logo />
          </div>
          <div className="flex items-center nk-header-tools">
            <div>
              <img
                src={userSvg}
                alt="questions"
                className="p-1 rounded-full w-11 h-11"
              />
            </div>
            {sessionStorage.getItem('user_role') === 'admin' ? (
              <span className="block font-semibold text-green-700 rounded-lg ">
                {' '}
                Welcome, {sessionStorage.getItem('admin_name')}
              </span>
            ) : sessionStorage.getItem('user_role') === 'sheikh' ? (
              <span className="block p-2 text-white bg-green-700 rounded-lg ">
                {' '}
                Salam alaykum, {sessionStorage.getItem('username')}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Header
