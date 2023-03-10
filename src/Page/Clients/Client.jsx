import React, { useEffect, useState } from 'react'
import { AiFillEdit, AiTwotoneDelete } from 'react-icons/ai';
import { BiChevronRight } from 'react-icons/bi';
import { BsInfoSquareFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Button from '../../Components/Button';
import Navbar from '../../Components/Navbar';
import { TOKEN_LINK, URL_LINK } from '../../Protected/Helpers';
import Loading from '../../Protected/Loading';


function Client() {

    const [loading, setLoading] = useState(true)
    const [store, setStore] = useState([])
    // console.log(store)

    const DeleteHandler = (id) => {
        fetch(`${URL_LINK}/client/${id}`, {
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
                <Button title="Add Client" link="/AddClient" />
                <div className="row scroll-bhe">
                    <div className="col-12 scroll-ho">
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
                                    loading ? <Loading /> :
                                    store.map((val, ind) => {
                                        const { _id, title, logo } = val;
                                        return (
                                            <tr key={ind}>
                                                <th className='size-lg ' scope="row"><BiChevronRight/></th>
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