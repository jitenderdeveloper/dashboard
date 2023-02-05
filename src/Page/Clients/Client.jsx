import React, { useEffect, useState } from 'react'
import { AiFillEdit, AiTwotoneDelete } from 'react-icons/ai';
import { BsInfoSquareFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Button from '../../Components/Button';
import Navbar from '../../Components/Navbar';
import { URL_LINK } from '../../Protected/Helpers';


function Client() {

    const [store, setStore] = useState([])
    // console.log(store)
    let user = JSON.parse(localStorage.getItem('users'));
    let token = user.token;

    const DeleteHandler = (id) => {
        fetch(`${URL_LINK}/client/${id}`, {
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
        fetch(`${URL_LINK}/client`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json())
            .then((result) => {
                setStore(result.Client_list)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <Navbar />
            <div className="container mt-3">
                <Button title="Add Client" link="/AddClient" />
                <div className="row">
                    <div className="col-12">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">S.No</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Logo</th>
                                    <th scope="col">Others</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    store.map((val, ind) => {
                                        const { _id, title, logo } = val;
                                        return (
                                            <tr key={ind}>
                                                <th className='size-lg ' scope="row">1</th>
                                                <td className='size-lg client-si'>{title}</td>
                                                <td className='img-td size-lg '>
                                                    <img src={logo} alt="" />
                                                </td>
                                                <td className='icon-curd size-lg'>
                                                    <Link to={`/EditClient/${_id}`} type='button' title='Edit'><span className='icon'><AiFillEdit /></span> </Link>
                                                    <a type='button' title='Delete' onClick={() => DeleteHandler(_id)}><span className='icon'><AiTwotoneDelete /></span></a>
                                                    <Link to={`/ViewClient/${_id}`} type='button' title='View'><span className='icon'><BsInfoSquareFill /></span></Link>
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

export default Client