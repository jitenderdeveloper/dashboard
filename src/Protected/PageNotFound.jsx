import React from 'react'
import { Link } from 'react-router-dom';

function PageNotFound() {
    return (
        <>
            <div className="container-fluid p-0 bg-home">
                <div className="row">
                    <div className="col-12">
                        <div className="home-container error">
                            <Link to="/">Back to Home</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PageNotFound;