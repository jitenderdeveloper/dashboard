import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../../Components/Button'
import Navbar from '../../Components/Navbar'
import { URL_LINK } from '../../Protected/Helpers'

function ViewContact() {
    const params = useParams()

    const [data, setData] = useState([])

    let user = JSON.parse(localStorage.getItem('users'))
    let token = user.token;
    const getData = () => {
        fetch(`${URL_LINK}/contact/${params.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => res.json())
            .then((result) => {
                setData(result.Contact_list)
        })
    }

    useEffect(() => {
        getData()
    },[])
    return (
        <>
            <Navbar />
            <div className="container mt-3">
                <Button title="Go to Back" link="/Contact" />
                <div className="row">
                    <div className="col-12">
                        <div className="view-content bg-dark">
                            <div className="view-section contact-heading">
                                <h3>Name</h3>
                                <h4>{data.name}</h4>
                            </div>
                            <div className="view-section contact-heading">
                                <h3>Eamil</h3>
                                <h4>{data.email}</h4>
                            </div>
                            <div className="view-section contact-heading">
                                <h3>Location</h3>
                                <h4>{data.location}</h4>
                            </div>
                            <div className="view-section contact-heading">
                                <h3>Subscribe</h3>
                                <h4>{data.subscribe}</h4>
                            </div>
                            <div className="view-section contact-heading">
                                <h3>Comment</h3>
                                <h4>{data.comment}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewContact