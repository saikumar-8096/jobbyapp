import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = props => {
  const {history} = props
  const onClickFindJobsBtn = () => {
    history.replace('/jobs')
  }

  return (
    <>
      <Header />
      <div className="banner-container">
        <div className="text-container">
          <h1 className="banner-heading">Find the job That Fits Your Life</h1>
          <p className="banner-description">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your ability and potential.
          </p>
          <Link to="/jobs">
            <button
              type="button"
              className="find-jobs-btn"
              onClick={onClickFindJobsBtn}
            >
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home
