import React, { useEffect, useState } from 'react'
import { AiFillEdit, AiTwotoneDelete } from 'react-icons/ai';
import { BiChevronRight } from 'react-icons/bi';
import { BsInfoSquareFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
import { TOKEN_LINK, URL_LINK } from '../../Protected/Helpers';
import Loading from '../../Protected/Loading';


function Contact() {
    const [loading, setLoading] = useState(true)
    const [store, setStore] = useState([])
    // console.log(TOKEN_LINK)


    const DeleteHandler = (id) => {
        fetch(`${URL_LINK}/contact/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TOKEN_LINK}`
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
                'Authorization': `Bearer ${TOKEN_LINK}`,
                'Content-Type': 'application/json',
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
                                    <th scope="col">Email</th>
                                    <th scope="col">Comments</th>
                                    <th scope="col">Location</th>
                                    <th scope="col">Subscribe</th>
                                    <th scope="col">Others</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loading ? <Loading /> :
                                    store?.map((val, ind) => {
                                        const { _id, name, email, location, subscribe, comment } = val;
                                        return (
                                            <tr key={ind}>
                                                <th className='size-lg' scope="row"><BiChevronRight /></th>
                                                <td className='size-lg'>{name}</td>
                                                <td className='size-lg'>{email}</td>
                                                <td className='size-lg'>{comment}</td>
                                                <td className='size-lg'>{location}</td>
                                                <td className='size-lg'>{subscribe}</td>
                                                <td className='icon-curd size-lg'>
                                                    <a type='button' title='Delete' onClick={() => DeleteHandler(_id)}><span className='icon'><AiTwotoneDelete /></span></a>
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