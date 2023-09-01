import {Link, withRouter} from 'react-router-dom'

import {AiFillHome} from 'react-icons/ai'

import {IoIosBriefcase} from 'react-icons/io'

import {FiLogOut} from 'react-icons/fi'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const {history} = props

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const onClickWebsiteLogo = () => {
    history.replace('/')
  }

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <button
          type="button"
          className="website-logo-button"
          onClick={onClickWebsiteLogo}
        >
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              className="website-logo"
              alt="website logo"
            />
          </Link>
        </button>
        <ul className="nav-menu-desktop">
          <Link to="/" className="nav-link">
            <li>Home</li>
          </Link>
          <Link to="/jobs" className="nav-link">
            <li>Jobs</li>
          </Link>
        </ul>
        <button
          type="button"
          className="logout-desktop-btn"
          onClick={onClickLogout}
        >
          Logout
        </button>
        <ul className="nav-menu-mobile">
          <Link to="/" className="nav-link-mobile">
            <li>
              <AiFillHome />
            </li>
          </Link>
          <Link to="/jobs" className="nav-link-mobile">
            <li>
              <IoIosBriefcase />
            </li>
          </Link>
          <li className="logout-mobile-btn">
            <button
              type="button"
              className="logout-mobile-btn"
              onClick={onClickLogout}
            >
              <FiLogOut className="icons" />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}
export default withRouter(Header)
