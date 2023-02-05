import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
        <div className="container-fluid p-0 bg-home">
            <div className="row">
                <div className="col-12">
                    <div className="home-container">
                        <Link to="/Login">Login Now</Link>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Home