import React, { useEffect, useState } from 'react'
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsInfoSquareFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
import { URL_LINK } from '../../Protected/Helpers';

function Testimonial() {

    const [data, setData] = useState([])

    const fethData = () => {
        fetch(`${URL_LINK}/testimonial`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => res.json())
            .then((result) => {
                setData(result.Testimonial_list)
            })
    }


    const DeleteHandler = (id) => {
        let user = JSON.parse(localStorage.getItem('users'));
        let token = user.token;

        fetch(`${URL_LINK}/testimonial/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }).then((res) => res.json())
            .then((result) => {
                fethData()
            })
    }



    useEffect(() => {
        fethData()
    }, [])
    return (
        <>
            <Navbar />
            <div className="container mt-3">
                <div className="row">
                    <div className="col-12">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">S.No</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">City</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Others</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((val, ind) => {
                                        const { _id, name, city, description, email, image, category } = val;
                                        return (
                                            <tr key={ind}>
                                                <th className='size-lg' scope="row">1</th>
                                                <td className='size-lg'>{name}</td>
                                                <td className='size-lg'>{city}</td>
                                                <td className='size-lg'>{description}</td>
                                                <td className='size-lg'>{email}</td>
                                                <td className='img-td size-lg'>
                                                    <img src={image} alt="" />
                                                </td>
                                                <td className='size-lg'>{category}</td>
                                                <td className='icon-curd size-lg'>
                                                    <a type='button' title='Delete' onClick={() => DeleteHandler(_id)}><span className='icon'><AiTwotoneDelete /></span></a>
                                                    <Link to={`/ViewTestimonial/${_id}`} type='button' title='View'><span className='icon'><BsInfoSquareFill /></span></Link>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Testimonial