import React from 'react'
import Button from '../../../Component/Button/button'

const Dashboard = () => {

  return (
    <div>
      <h3>AMS DASHBOARD</h3>
      <p>Work On Progress</p>
      <span>
        Please continue checking other ui pages
      </span>
      <Button text={"Go to Assets"} linkUrl={"/assets"}/>
    </div>
  )
}

export default Dashboard