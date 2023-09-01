import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Profile from '../Profile'
import JobItemCard from '../JobItemCard'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStateConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inprogress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    apiState: apiStateConstants.initial,
    userInput: '',
    employmentTypeIdList: [],
    salaryRange: '',
    jobItemList: [],
  }

  componentDidMount = () => {
    this.getJobItemList()
  }

  getJobItemList = async () => {
    this.setState({apiState: apiStateConstants.inprogress})
    const {userInput, employmentTypeIdList, salaryRange} = this.state
    const employmentTypeIdString = employmentTypeIdList.join(',')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeIdString}&minimum_package=${salaryRange}&search=${userInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const updatedData = data.jobs.map(eachJob => ({
      companyLogoUrl: eachJob.company_logo_url,
      employmentType: eachJob.employment_type,
      id: eachJob.id,
      jobDescription: eachJob.job_description,
      location: eachJob.location,
      packagePerAnnum: eachJob.package_per_annum,
      rating: eachJob.rating,
      title: eachJob.title,
    }))
    if (response.ok === true) {
      this.setState({
        jobItemList: updatedData,
        apiState: apiStateConstants.success,
      })
    } else {
      this.setState({apiState: apiStateConstants.failure})
    }
  }

  onChangeUserInput = event => {
    this.setState({userInput: event.target.value})
  }

  onClickSearchButton = event => {
    event.preventDefault()
    this.getJobItemList()
  }

  renderSearchInput = () => (
    <div className="input-container">
      <input
        placeholder="search"
        type="search"
        className="user-input-text"
        onChange={this.onChangeUserInput}
      />
      <button
        type="button"
        data-testid="searchButton"
        className="search-icon-btn"
        onClick={this.onClickSearchButton}
      >
        <BsSearch className="search-icon" />
      </button>
    </div>
  )

  getJobItemsCards = () => {
    const {jobItemList} = this.state

    return (
      <ul className="job-card-container">
        {jobItemList.map(eachObject => (
          <JobItemCard jobcardDetails={eachObject} key={eachObject.id} />
        ))}
      </ul>
    )
  }

  renderNoJobsView = () => (
    <div className="nojobs-container">
      <img
        className="noJobs-image"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="nojobs-heading">No Jobs Found</h1>
      <p className="nojobs-description">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderSuccessView = () => {
    const {jobItemList} = this.state
    const isItems = jobItemList.length > 0
    return isItems ? this.getJobItemsCards() : this.renderNoJobsView()
  }

  onClickRetryButton = () => {
    this.getJobItemList()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something went wrong </h1>
      <p className="failure-description">
        We cannot seem to find page you are looking for.
      </p>
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

  renderJobItems = () => {
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

  onChangeSalaryRange = event => {
    this.setState({salaryRange: event.target.value}, this.getJobItemList)
  }

  onChangeEmploymentType = event => {
    const {employmentTypeIdList} = this.state
    const findElement = employmentTypeIdList.find(
      eachItem => eachItem === event.target.value,
    )
    if (findElement === undefined) {
      this.setState(
        prevState => ({
          employmentTypeIdList: [
            ...prevState.employmentTypeIdList,
            event.target.value,
          ],
        }),
        this.getJobItemList,
      )
    } else {
      const index = employmentTypeIdList.findIndex(
        eachItem => eachItem === event.target.value,
      )
      employmentTypeIdList.splice(index, 1)
      this.setState(
        {employmentTypeIdList: [...employmentTypeIdList]},
        this.getJobItemList,
      )
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="profile-filter-container">
            <div className="user-input-container-mobile">
              {this.renderSearchInput()}
            </div>
            <Profile />
            <hr className="horizontal-line" />
            <ul className="typeofemployment-container">
              <h1 className="type-of-employment">Type of Employment</h1>
              {employmentTypesList.map(eachType => {
                const {label, employmentTypeId} = eachType
                return (
                  <li className="employment-type-item" key={employmentTypeId}>
                    <input
                      type="checkbox"
                      className="checkbox"
                      id={employmentTypeId}
                      name={employmentTypeId}
                      value={employmentTypeId}
                      onChange={this.onChangeEmploymentType}
                    />
                    <label
                      htmlFor={employmentTypeId}
                      className="employment-type-label"
                    >
                      {label}
                    </label>
                  </li>
                )
              })}
            </ul>
            <hr className="horizontal-line" />
            <ul className="typeofemployment-container">
              <h1 className="type-of-employment">Salary Range</h1>
              {salaryRangesList.map(eachType => {
                const {label, salaryRangeId} = eachType
                return (
                  <li className="employment-type-item" key={salaryRangeId}>
                    <input
                      type="radio"
                      className="checkbox"
                      id={salaryRangeId}
                      name="salaryRange"
                      value={salaryRangeId}
                      onChange={this.onChangeSalaryRange}
                    />
                    <label
                      htmlFor={salaryRangeId}
                      className="employment-type-label"
                    >
                      {label}
                    </label>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="search-job-items-container">
            <div className="user-input-container-desktop">
              {this.renderSearchInput()}
            </div>
            {this.renderJobItems()}
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
