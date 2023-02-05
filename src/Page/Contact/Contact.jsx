import React, { useEffect, useState } from 'react'
import { AiFillEdit, AiTwotoneDelete } from 'react-icons/ai';
import { BsInfoSquareFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
import { URL_LINK } from '../../Protected/Helpers';


function Contact() {
    const [store, setStore] = useState([])
    // console.log(store)

    let user = JSON.parse(localStorage.getItem('users'));
    let token = user.token;

    const DeleteHandler = (id) => {
        fetch(`${URL_LINK}/contact/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then((res) => res.json())
            .then((result) => {
                fetchData()
            })
    }

    const fetchData = () => {
        fetch(`${URL_LINK}/contact`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => res.json())
            .then((result) => {
                setStore(result.Contact_list)
                // console.log(result)
            })
    }

    useEffect(() => {
        fetchData()
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
                                    <th scope="col">Email</th>
                                    <th scope="col">Comments</th>
                                    <th scope="col">Location</th>
                                    <th scope="col">Subscribe</th>
                                    <th scope="col">Others</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    store.map((val, ind) => {
                                        const { _id, name, email, location, subscribe, comment} = val;
                                        return (
                                            <tr key={ind}>
                                                <th className='size-lg' scope="row">1</th>
                                                <td className='size-lg'>{name}</td>
                                                <td className='size-lg'>{email}</td>
                                                <td className='size-lg'>{comment.slice(0,76)}.</td>
                                                <td className='size-lg'>{location}</td>
                                                <td className='size-lg'>{subscribe}</td>
                                                <td className='icon-curd size-lg'>
                                                    <a type='button' title='Delete' onClick={() =>DeleteHandler(_id)}><span className='icon'><AiTwotoneDelete /></span></a>
                                                    <Link to={`/ViewContact/${_id}`} type='button' title='View'><span className='icon'><BsInfoSquareFill /></span></Link>
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


export default Contact