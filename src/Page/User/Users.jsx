import React, { useEffect, useState } from 'react'
import { AiFillEdit, AiTwotoneDelete } from 'react-icons/ai';
import { BiChevronRight } from 'react-icons/bi';
import { BsInfoSquareFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Button from '../../Components/Button';
import Navbar from '../../Components/Navbar';
import { TOKEN_LINK, URL_LINK } from '../../Protected/Helpers';
import Loading from '../../Protected/Loading';


function Users() {

    const [loading, setLoading] = useState(true)

    const [store, setStore] = useState([])
    // console.log(store)

    // const DeleteHandler = (id) => {
    //     fetch(`${URL_LINK}/technology/${id}`, {
    //         method: 'DELETE',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${token}`
    //         },
    //     }).then((res) => res.json())
    //         .then((result) => {
    //             fetchData()
    //         })
    // }

    const fetchData = () => {
        fetch(`${URL_LINK}/user/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TOKEN_LINK}`
            }
        }).then((res) => res.json())
            .then((result) => {
                setStore(result.user_list)
                // console.log(result.user_list)
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
                <Button title="Add User" link="/Signup" />
                <div className="row scroll-bhe">
                    <div className="col-12 scroll-ho">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">S.No</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Others</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loading ? <Loading /> :
                                    store.map((val, ind) => {
                                        return (
                                            <tr key={ind}>
                                                <th className='size-lg ' scope="row"><BiChevronRight/></th>
                                                <td className='size-lg'>{ val.username}</td>
                                                <td className='size-lg'>{val.email}</td>
                                                <td className='icon-curd size-lg'>
                                                    <Link to='' type='button' title='Edit'><span className='icon'><AiFillEdit /></span> </Link>
                                                    <a type='button' title='Delete'><span className='icon'><AiTwotoneDelete /></span></a>
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

export default Users