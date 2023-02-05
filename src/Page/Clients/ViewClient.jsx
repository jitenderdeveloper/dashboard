import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Button from '../../Components/Button';
import Navbar from '../../Components/Navbar';
import { URL_LINK } from '../../Protected/Helpers';

function ViewClient() {

    const params = useParams()
      
    const [data, setData] = useState([])
    // console.log(data)

    let user = JSON.parse(localStorage.getItem('users'))
    let token = user.token;

    const fethData = () => {
        fetch(`${URL_LINK}/client/${params.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => res.json())
            .then((result) => {
                setData(result.Client_list)
                // console.log(result)
            })
    }

    useEffect(() => {
        fethData()
    }, [])
    return (
        <>
            <Navbar />
            <div className="container mt-3">
                <Button title="Go to Back" link="/Client" />
                <div className="row">
                    <div className="col-12">
                        <div className="view-content bg-dark">
                            <div className="input-image mb-4">
                                <img src={data.logo} alt="" />
                            </div>
                            <div className="view-section">
                                <h3>{data.title}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewClient