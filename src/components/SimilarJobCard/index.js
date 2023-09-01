import {AiFillStar} from 'react-icons/ai'

import {FaMapMarkerAlt} from 'react-icons/fa'

import {IoIosBriefcase} from 'react-icons/io'

import './index.css'

const SimilarJobCard = props => {
  const {cardDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = cardDetails
  return (
    <li className="similarjob-card-container">
      <div className="card-top-container">
        <img
          src={companyLogoUrl}
          className="company-logo"
          alt="similar job company logo"
        />
        <div className="top-text-container">
          <h1 className="title">{title}</h1>
          <div className="star-rating-container">
            <AiFillStar className="star-rating" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-card-description">Description</h1>
      <p className="similar-description">{jobDescription}</p>
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
    </li>
  )
}
export default SimilarJobCard
