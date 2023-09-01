import {Component} from 'react'

import Loader from 'react-loader-spinner'

import {AiFillStar} from 'react-icons/ai'

import {FaMapMarkerAlt} from 'react-icons/fa'

import {IoIosBriefcase} from 'react-icons/io'

import Cookies from 'js-cookie'

import SimilarJobCard from '../SimilarJobCard'

import Header from '../Header'

import './index.css'

const apiStateConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inprogress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class JobItemCardDetails extends Component {
  state = {
    apiState: apiStateConstants.initial,
    jobCardDetails: {},
    skills: [],
    lifeAtCompany: {},
    similarJobs: [],
  }

  componentDidMount() {
    this.getJobCardDetails()
  }

  getUpdatedData = jobDetails => ({
    companyLogoUrl: jobDetails.company_logo_url,
    companyWebsiteUrl: jobDetails.company_website_url,
    employmentType: jobDetails.employment_type,
    id: jobDetails.id,
    jobDescription: jobDetails.job_description,
    location: jobDetails.location,
    packagePerAnnum: jobDetails.package_per_annum,
    rating: jobDetails.rating,
    title: jobDetails.title,
  })

  getJobCardDetails = async () => {
    this.setState({apiState: apiStateConstants.inprogress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const updatedJobCardDetails = this.getUpdatedData(data.job_details)
    const lifeAtCompanyDetails = data.job_details.life_at_company
    const updatedLifeAtCompanyDetails = {
      description: lifeAtCompanyDetails.description,
      imageUrl: lifeAtCompanyDetails.image_url,
    }
    const skillsDetails = data.job_details.skills

    const updatedSkills = skillsDetails.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    }))
    const similarJobDetails = data.similar_jobs
    const updatedsimilarJobDetails = similarJobDetails.map(eachSimilarJob => ({
      companyLogoUrl: eachSimilarJob.company_logo_url,
      employmentType: eachSimilarJob.employment_type,
      id: eachSimilarJob.id,
      jobDescription: eachSimilarJob.job_description,
      location: eachSimilarJob.location,
      rating: eachSimilarJob.rating,
      title: eachSimilarJob.title,
    }))
    if (response.ok === true) {
      this.setState({
        jobCardDetails: updatedJobCardDetails,
        skills: updatedSkills,
        lifeAtCompany: updatedLifeAtCompanyDetails,
        similarJobs: updatedsimilarJobDetails,
        apiState: apiStateConstants.success,
      })
    } else {
      this.setState({apiState: apiStateConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {jobCardDetails, skills, similarJobs, lifeAtCompany} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobCardDetails
    console.log(similarJobs)
    const {imageUrl, description} = lifeAtCompany
    return (
      <>
        <Header />
        <div className="background-details-container">
          <div className="details-card-container">
            <div className="card-top-container">
              <img
                src={companyLogoUrl}
                className="company-logo"
                alt="job details company logo"
              />
              <div className="top-text-container">
                <h1 className="title">{title}</h1>
                <div className="star-rating-container">
                  <AiFillStar className="star-rating" />
                  <p className="rating">{rating}</p>
                </div>
              </div>
            </div>
            <div className="card-middle-container">
              <div className="location-employmentType-container">
                <div className="location-container">
                  <FaMapMarkerAlt className="location-icon" />
                  <p className="location">{location}</p>
                </div>
                <div className="employment-type-container">
                  <IoIosBriefcase className="briefecase-icon" />
                  <p className="location">{employmentType}</p>
                </div>
              </div>
              <p className="packagePerAnnum">{packagePerAnnum}</p>
            </div>
            <hr className="horizontal-line" />
            <div className="description-container">
              <div className="description-visit-container">
                <h1 className="description-heading">Description</h1>
                <a
                  className="visit-container"
                  href={companyWebsiteUrl}
                  target="__blank"
                >
                  <p className="visit">Visit</p>
                </a>
              </div>
              <p className="description">{jobDescription}</p>
              <h1 className="skills-heading">Skills</h1>
              <ul className="skills-container">
                {skills.map(eachSkill => (
                  <li className="skill-item" key={eachSkill.name}>
                    <img
                      src={eachSkill.imageUrl}
                      className="skill-image"
                      alt={eachSkill.name}
                    />
                    <p className="skill-name">{eachSkill.name}</p>
                  </li>
                ))}
              </ul>
              <h1 className="life-at-company-heading">Life at Company</h1>
              <div className="description-image-container">
                <p className="description">{description}</p>
                <img
                  src={imageUrl}
                  className="description-image"
                  alt="life at company"
                />
              </div>
            </div>
          </div>
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <ul className="similar-jobs-container">
            {similarJobs.map(eachJob => (
              <SimilarJobCard key={eachJob.id} cardDetails={eachJob} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  OnClickRetryButton = () => {
    this.getJobCardDetails()
  }

  renderFailureView = () => (
    <>
      <Header />
      <div className="failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="failure-image"
        />
        <h1 className="failure-heading">Oops! Something Went Wrong </h1>
        <p className="failure-description">
          We cannot seem to find the page you are looking for
        </p>
        <button
          type="button"
          className="retry-button"
          onClick={this.OnClickRetryButton}
        >
          Retry
        </button>
      </div>
    </>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {apiState} = this.state
    switch (apiState) {
      case apiStateConstants.success:
        return this.renderSuccessView()
      case apiStateConstants.failure:
        return this.renderFailureView()
      case apiStateConstants.inprogress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}
export default JobItemCardDetails
