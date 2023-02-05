import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../../Components/Button'
import Navbar from '../../Components/Navbar'
import { URL_LINK } from '../../Protected/Helpers';

function ViewTestimonial() {
    const params = useParams()
    // console.log(params.id)
    const [store, setStore] = useState([])
    const { name, email, image, description, city, category } = store;
    // console.log(store)
    const getData = () => {
        let user = JSON.parse(localStorage.getItem('users'));
        let token = user.token;

        fetch(`${URL_LINK}/testimonial/${params.id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then((res) => res.json())
            .then((result) => {
                setStore(result.Testimonial_list)
        })
    }

    useEffect(() => {
        getData()
    },[])

    return (
        <>
            <Navbar />
            <div className="container mt-3">
                <Button title="Go to Back" link="/Testimonial" />
                <div className="row">
                    <div className="col-12">
                        <div className="view-content bg-dark">
                        <div className="input-image mb-4">
                                <img src={image} alt="" />
                            </div>
                            <div className="view-section contact-heading">
                                <h3>Name</h3>
                                <h4>{name}</h4>
                            </div>
                            <div className="view-section contact-heading">
                                <h3>City</h3>
                                <h4>{city}</h4>
                            </div>
                            <div className="view-section contact-heading">
                                <h3>Email</h3>
                                <h4>{email}</h4>
                            </div>
                            <div className="view-section contact-heading">
                                <h3>category</h3>
                                <h4>{category}</h4>
                            </div>
                            <div className="view-section contact-heading">
                                <h3>Description</h3>
                                <h4>{description}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewTestimonial