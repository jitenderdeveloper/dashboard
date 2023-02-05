import React, { useEffect, useState } from 'react'

import Button from '../../Components/Button'
import Navbar from '../../Components/Navbar'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import { URL_LINK } from '../../Protected/Helpers';

function EditYoutube() {
    const params = useParams()

    const nevagite = useNavigate()

    const [title, setTitle] = useState("");
    const [video, setVideo] = useState("");
    const [description, setDescription] = useState("");

    const [store, setStore] = useState([]);
    // console.log('data ->', store)

    let user = JSON.parse(localStorage.getItem('users'));
    const token = user.token;

    const updategetData = () => {
        fetch(`${URL_LINK}/youtubelink/${params.id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then((rep) => rep.json())
            .then((result) => {
                // console.log('data ->', result)
                const fetchData = result.Youtubelink_list;
                const { title, video, description } = fetchData;
                setTitle(title)
                setVideo(video)
                setDescription(description)
            })
    }


    const UpdateHandler = () => {

        const dataStore = { title: title, video: video, description: description };
        if (!title || !video || !description) {
            toast.error('All field are required!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else {
            setStore([...store, dataStore])
            toast.success(`Youtube Link is Updated..`, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

            fetch(`${URL_LINK}/youtubelink/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataStore)
            }).then((rep) => rep.json())
                .then((result) => {
                    // console.log('data ->', result)
                    nevagite('/YoutubeChannel')
                })

        }
    }

    useEffect(() => {
        updategetData()
    }, [])

    return (
        <>
            <Navbar />
            <div className="container mt-3">
                <Button title="Go to Back" link="/Blog" />
                <div className="row">
                    <div className="col-12">
                        <div className="form_data">
                            <form action="">
                                <div className="input-image video-link mb-3">
                                    <iframe src={video}></iframe>
                                </div>
                                <div className="input-data">
                                    <label>Title</label>
                                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="form-control" />
                                </div>
                                <div className="input-data">
                                    <label>Upload Video</label>
                                    <input value={video} onChange={(e) => setVideo(e.target.value)} type="text" className="form-control" />
                                </div>
                                <div className="input-data input-textarea">
                                    <label>Description</label>
                                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} type='text' className="form-control" name="" id="" cols="30" rows="10"></textarea>
                                </div>

                                <div className="input-data">
                                    <button type='button' onClick={UpdateHandler} className='btn btn-dark'>Update Youtube Link</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default EditYoutube