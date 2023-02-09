import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar';
import { BsInfoSquareFill } from "react-icons/bs";
import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
import { BiChevronRight } from "react-icons/bi";
import Button from '../../Components/Button';
import { Link } from 'react-router-dom';
import { TOKEN_LINK, URL_LINK } from '../../Protected/Helpers';
import Loading from '../../Protected/Loading';

function Blog() {
    const [loading, setLoading] = useState(true)
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
        fetch(`${URL_LINK}/blog/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${TOKEN_LINK}`,
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


    useEffect(() => {
        const spin = setTimeout(() => {
            setLoading(false)
        }, 3000)

        return () => {
            clearTimeout(spin);
        };
    }, [])



    return (
        <>
            <Navbar />
            <div className="container mt-3">
                <Button title="Add Blog" link="/AddBlog" />
                <div className="row scroll-bhe">
                    <div className="col-12 scroll-ho">
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
                                    loading ? <Loading /> :
                                        data?.map((val, ind) => {
                                            const { _id, title, category, image, description, desc_list, data } = val;
                                            return (
                                                <tr key={ind}>
                                                    <th className='size-lg' scope="row"><BiChevronRight /></th>
                                                    <td className='size-lg'>{title.slice(0, 40)}.</td>
                                                    <td className='size-lg'>{category}</td>
                                                    <td className='size-lg'>{description.slice(0, 76)}.</td>
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