import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const apiStateConstants = {
  initial: 'INITIAL',
  inprogress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Profile extends Component {
  state = {
    apiState: apiStateConstants.initial,
    profileDetails: {},
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiState: apiStateConstants.inprogress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const updatedData = {
      name: data.profile_details.name,
      profileImageUrl: data.profile_details.profile_image_url,
      shortBio: data.profile_details.short_bio,
    }
    if (response.ok === true) {
      this.setState({
        profileDetails: updatedData,
        apiState: apiStateConstants.success,
      })
    } else {
      this.setState({apiState: apiStateConstants.failure})
    }
  }

  onClickRetryButton = () => {
    this.getProfileDetails()
  }

  renderFailureProfile = () => (
    <div className="failure-container">
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccessProfile = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="success-container">
        <img src={profileImageUrl} alt="profile" className="profile-image" />
        <h1 className="profile-heading">{name}</h1>
        <p className="profile-description">{shortBio}</p>
      </div>
    )
  }

  render() {
    const {apiState} = this.state
    switch (apiState) {
      case apiStateConstants.inprogress:
        return this.renderLoadingView()
      case apiStateConstants.failure:
        return this.renderFailureProfile()
      case apiStateConstants.success:
        return this.renderSuccessProfile()
      default:
        return null
    }
  }
}
export default Profile
