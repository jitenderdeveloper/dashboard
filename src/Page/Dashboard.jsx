import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import DashboardJson from '../Json/DashboardJson';

function Dashboard() {
    return (
        <>
            <Navbar />
            <div className="container mt-3 mb-3">
                <div className="row">
                    {
                        DashboardJson.map((val, ind) => {
                            return (
                                <div key={ind} className="col-lg-3 col-md-3 col-12 mb-4">
                                    <Link to={val.link}>
                                        <div className="inner-dash">
                                            <h5>{val.title}</h5>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Dashboard;