import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar';
import { BsInfoSquareFill } from "react-icons/bs";
import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
import Button from '../../Components/Button';
import { Link } from 'react-router-dom';
import { URL_LINK } from '../../Protected/Helpers';

function Blog() {
    const [data, setData] = useState([])
    // console.log(data)

     const blogData = () => {
        fetch(`${URL_LINK}/blog`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        }).then((rep) => rep.json())
            .then((result) => { setData(result.Blog_List) })
    }


    const DeleteHandler = (id) => {
        let user = JSON.parse(localStorage.getItem('users'));
        const token = user.token;
        fetch(`${URL_LINK}/blog/${id}`, {
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
                <Button title="Add Blog" link="/AddBlog" />
                <div className="row">
                    <div className="col-12">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">S.No</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Short List</th>
                                    <th scope="col">Blog Image</th>
                                    <th scope="col">Others</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data?.map((val, ind) => {
                                        // console.log(val)
                                        const { _id, title, category, image, description, desc_list, data } = val;
                                        return (
                                            <tr key={ind}>
                                                <th className='size-lg' scope="row">1</th>
                                                <td className='size-lg'>{title.slice(0,40)}.</td>
                                                <td className='size-lg'>{category}</td>
                                                <td className='size-lg'>{description.slice(0,76)}.</td>
                                                <td className='size-lg'>{desc_list}</td>

                                                <td className='img-td size-lg'>
                                                    <img src={image} alt="" />
                                                </td>
                                                <td className='icon-curd size-lg'>
                                                    <Link to={`/EditBlog/${_id}`} type='button' title='Edit'><span className='icon'><AiFillEdit /></span> </Link>
                                                    <a type='button' title='Delete' onClick={() => DeleteHandler(_id)}><span className='icon'><AiTwotoneDelete /></span></a>
                                                    <Link to={`/ViewBlog/${_id}`} type='button' title='View'><span className='icon'><BsInfoSquareFill /></span></Link>
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

export default Blog