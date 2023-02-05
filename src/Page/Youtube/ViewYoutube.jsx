import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Button from '../../Components/Button';
import Navbar from '../../Components/Navbar';
import { URL_LINK } from '../../Protected/Helpers';

function ViewYoutube() {
    const params = useParams()

    const [data, setData] = useState([])
    // console.log(data)

    let user = JSON.parse(localStorage.getItem('users'))
    let token = user.token;
    const fethData = () => {
        fetch(`${URL_LINK}/youtubelink/${params.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => res.json())
            .then((result) => {
                setData(result.Youtubelink_list)
            })
    }

    useEffect(() => {
        fethData()
    }, [])
    return (
        <>
            <Navbar />
            <div className="container mt-3">
                <Button title="Go to Back" link="/YoutubeChannel" />
                <div className="row">
                    <div className="col-12">
                        <div className="view-content bg-dark">
                            <div className="input-image video-link mb-3">
                                <iframe src={data.video}></iframe>
                            </div>
                            <div className="view-section contact-heading">
                                <h3>Title</h3>
                                <h4>{data.title}</h4>
                            </div>
                            <div className="view-section contact-heading">
                                <h3>Description</h3>
                                <h4>{data.description}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewYoutube