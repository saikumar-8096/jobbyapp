import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'

import {FaMapMarkerAlt} from 'react-icons/fa'

import {IoIosBriefcase} from 'react-icons/io'

import './index.css'

const JobItemCard = props => {
  const {jobcardDetails} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobcardDetails
  console.log(id)
  return (
    <Link to={`/jobs/${id}`} className="link-container">
      <li className="jobItem-card-container">
        <div className="card-top-container">
          <img
            src={companyLogoUrl}
            className="company-logo"
            alt="company logo"
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
          <h1 className="packagePerAnnum">{packagePerAnnum}</h1>
        </div>
        <hr className="horizontal-line" />
        <div className="description-container">
          <h1 className="description-heading">Description</h1>
          <p className="description">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}
export default JobItemCard
