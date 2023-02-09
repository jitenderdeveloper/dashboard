import React, { useEffect, useState } from 'react'
import { AiFillEdit, AiTwotoneDelete } from 'react-icons/ai'
import { BiChevronRight } from 'react-icons/bi'
import { BsInfoSquareFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import Button from '../../Components/Button'
import Navbar from '../../Components/Navbar'
import { TOKEN_LINK, URL_LINK } from '../../Protected/Helpers'
import Loading from '../../Protected/Loading'

function Youtube() {

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    // console.log(data)

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
        fetch(`${URL_LINK}/youtubelink/${id}`, {
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
                <Button title="Add Youtube Link" link="/AddYoutube" />
                <div className="row scroll-bhe">
                    <div className="col-12 scroll-ho">
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
                                    loading ? <Loading /> :
                                        data.map((val, ind) => {
                                            return (
                                                <tr key={ind}>
                                                    <th className='size-lg' scope="row"><BiChevronRight /></th>
                                                    <td className='size-lg'>{val.title.slice(0, 38)}.</td>
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