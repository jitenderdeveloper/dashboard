import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../../Components/Button'
import Navbar from '../../Components/Navbar'
import { URL_LINK } from '../../Protected/Helpers';

function ViewProduct() {
    const params = useParams()
    // console.log(params.id)
    const [store, setStore] = useState([])
    const { title, category, description, logo, link, price} = store;
    // console.log(store)
    const getData = () => {
        let user = JSON.parse(localStorage.getItem('users'));
        let token = user.token;

        fetch(`${URL_LINK}/product/${params.id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then((res) => res.json())
            .then((result) => {
                setStore(result.Product_List)
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
                                <img src={logo} alt="" />
                            </div>
                            <div className="view-section contact-heading">
                                <h3>Title</h3>
                                <h4>{title}</h4>
                            </div>
                            <div className="view-section contact-heading">
                                <h3>Price</h3>
                                <h4>{price}</h4>
                            </div>
                            <div className="view-section contact-heading">
                                <h3>Category</h3>
                                <h4>{category}</h4>
                            </div>
                            <div className="view-section contact-heading">
                                <h3>Link</h3>
                                <h4>{link}</h4>
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

export default ViewProduct