import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar';
import { BsInfoSquareFill } from "react-icons/bs";
import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
import Button from '../../Components/Button';
import { Link } from 'react-router-dom';
import { TOKEN_LINK, URL_LINK } from '../../Protected/Helpers';
import { BiChevronRight } from 'react-icons/bi';
import Loading from '../../Protected/Loading';

function Product() {

    const [loading, setLoading] = useState(true)
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
        fetch(`${URL_LINK}/product/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${TOKEN_LINK}`,
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
                <Button title="Add Product" link="/AddProduct" />
                <div className="row scroll-bhe">
                    <div className="col-12 scroll-ho">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">S.No</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Project Link</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Logo</th>
                                    <th scope="col">Others</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loading ? <Loading /> :
                                    data.map((val, ind) => {
                                        const { _id, title, category, description, image, logo, link, price} = val;
                                        return (
                                            <tr key={ind}>
                                                <th scope="row"><BiChevronRight/></th>
                                                <td>{title}</td>
                                                <td className='price-se'>{price}</td>
                                                <td>{category}</td>
                                                <td>{description.slice(0,75)}</td>
                                                <td>{link.slice(0,16)}</td>

                                                <td className='img-td size-lg'>
                                                    <img src={image} alt="" />
                                                </td>
                                                
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