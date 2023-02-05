import React, { useEffect, useState } from 'react'
import { AiFillEdit, AiTwotoneDelete } from 'react-icons/ai'
import { BsInfoSquareFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import Button from '../../Components/Button'
import Navbar from '../../Components/Navbar'
import { URL_LINK } from '../../Protected/Helpers'

function Youtube() {
    const [data, setData] = useState([])
    console.log(data)

    const blogData = () => {
        fetch(`${URL_LINK}/youtubelink`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        }).then((rep) => rep.json())
            .then((result) => { setData(result.Youtubelink_list) })
    }


    const DeleteHandler = (id) => {
        let user = JSON.parse(localStorage.getItem('users'));
        const token = user.token;
        fetch(`${URL_LINK}/youtubelink/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }).then((rep) => rep.json())
            .then((item) => {
                blogData()
            })
    }



    useEffect(() => {
        blogData()
    }, [])



    return (
        <>
            <Navbar />
            <div className="container mt-3">
                <Button title="Add Youtube Link" link="/AddYoutube" />
                <div className="row">
                    <div className="col-12">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">S.No</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Video</th>
                                    <th scope="col">Others</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((val, ind) => {
                                        return (
                                            <tr key={ind}>
                                                <th className='size-lg' scope="row">1</th>
                                                <td className='size-lg'>{val.title.slice(0,38)}.</td>
                                                <td className='size-lg'>{val.description.slice(0, 75)}</td>
                                                <td className='size-lg img-td'>
                                                    <iframe src={val.video}></iframe>
                                                </td>

                                                <td className='icon-curd size-lg'>
                                                    <Link to={`/EditYoutube/${val._id}`} type='button' title='Edit'><span className='icon'><AiFillEdit /></span> </Link>
                                                    <a type='button' title='Delete' onClick={() => DeleteHandler(val._id)}><span className='icon'><AiTwotoneDelete /></span></a>
                                                    <Link to={`/ViewYoutube/${val._id}`} type='button' title='View'><span className='icon'><BsInfoSquareFill /></span></Link>
                                                    {/* <a href="" title='View'><span className='icon'><BsInfoCircleFill /></span></a> */}
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

export default Youtube