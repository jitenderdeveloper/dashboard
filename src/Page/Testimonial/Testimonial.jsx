import React, { useEffect, useState } from 'react'
import { AiTwotoneDelete } from 'react-icons/ai';
import { BiChevronRight } from 'react-icons/bi';
import { BsInfoSquareFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
import { TOKEN_LINK, URL_LINK } from '../../Protected/Helpers';
import Loading from '../../Protected/Loading';

function Testimonial() {

    const [loading, setLoading] = useState(true)
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
        fetch(`${URL_LINK}/testimonial/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${TOKEN_LINK}`,
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
                <div className="row scroll-bhe">
                    <div className="col-12 scroll-ho">
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
                                    loading ? <Loading /> :
                                    data.map((val, ind) => {
                                        const { _id, name, city, description, email, image, category } = val;
                                        return (
                                            <tr key={ind}>
                                                <th className='size-lg' scope="row"><BiChevronRight/></th>
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