import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../../Components/Button'
import Navbar from '../../Components/Navbar'
import { URL_LINK } from '../../Protected/Helpers'

function ViewBlog() {
    const params = useParams()

    const [data, setData] = useState([])
    // console.log(data)

    let user = JSON.parse(localStorage.getItem('users'))
    let token = user.token;
    const fethData = () => {
        fetch(`${URL_LINK}/blog/${params._id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => res.json())
            .then((result) => {
                setData(result.Blog_List)
            })
    }
    
    useEffect(() => {
        fethData()
    }, [])
    return (
        <>
            <Navbar />
            <div className="container mt-3">
                <Button title="Go to Back" link="/Blog" />
                <div className="row">
                    <div className="col-12">
                        <div className="view-content bg-dark">
                            <div className="input-image mb-4">
                                <img src={data.image} alt="" />
                            </div>
                            <div className="view-section">
                                <h3>{data.title}</h3>
                            </div>
                            <div className="view-section">
                                <h4>{data.desc_list}</h4>
                            </div>
                            <div className="view-section">
                                <h5>{data.description}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewBlog