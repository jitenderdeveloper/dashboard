import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar';
import { BsInfoSquareFill } from "react-icons/bs";
import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
import Button from '../../Components/Button';
import { Link } from 'react-router-dom';
import { URL_LINK } from '../../Protected/Helpers';

function Product() {
    const [data, setData] = useState([])
    // console.log(data)

    const productData = () => {
        fetch(`${URL_LINK}/product`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        }).then((rep) => rep.json())
            .then((result) => { setData(result.Product_List) })
    }


    const DeleteHandler = (id) => {
        let user = JSON.parse(localStorage.getItem('users'));
        const token = user.token;
        fetch(`${URL_LINK}/product/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }).then((rep) => rep.json())
            .then((item) => {
                productData()
            })
    }



    useEffect(() => {
        productData()
    }, [])



    return (
        <>
            <Navbar />
            <div className="container mt-3">
                <Button title="Add Product" link="/AddProduct" />
                <div className="row">
                    <div className="col-12">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">S.No</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Project Link</th>
                                    <th scope="col">Product Image</th>
                                    <th scope="col">Others</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((val, ind) => {
                                        const { _id, title, category, description, logo, link, price} = val;
                                        return (
                                            <tr key={ind}>
                                                <th scope="row">1</th>
                                                <td>{title}</td>
                                                <td className='price-se'>{price}</td>
                                                <td>{category}</td>
                                                <td>{description.slice(0,75)}</td>
                                                <td>{link.slice(0,16)}</td>

                                                <td className='img-td size-lg'>
                                                    <img src={logo} alt="" />
                                                </td>
                                                <td className='icon-curd size-lg'>
                                                    <Link to={`/EditProduct/${_id}`} type='button' title='Edit'><span className='icon'><AiFillEdit /></span> </Link>
                                                    <a type='button' title='Delete' onClick={() => DeleteHandler(_id)}><span className='icon'><AiTwotoneDelete /></span></a>
                                                    <Link to={`/ViewProduct/${_id}`} type='button' title='View'><span className='icon'><BsInfoSquareFill /></span></Link>
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

export default Product