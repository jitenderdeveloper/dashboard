import React from 'react'
import { Link } from 'react-router-dom'

function Button(props) {
    return (
        <>
            <div className="row mb-4">
                <div className="col-12">
                    <Link type='button' className='btn btn-dark btn-edit' to={props.link}>{props.title}</Link>
                </div>
            </div>
        </>
    )
}

export default Button