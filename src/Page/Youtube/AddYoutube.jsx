import React, { useState } from 'react'
import Button from '../../Components/Button';
import Navbar from '../../Components/Navbar';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { TOKEN_LINK, URL_LINK } from '../../Protected/Helpers';

function AddYoutube() {

    const nevagite = useNavigate()

    const [title, setTitle] = useState("");
    const [video, setVideo] = useState("");
    const [description, setDescription] = useState("");

    const [store, setStore] = useState([]);
    // console.log('data ->', store)
    const AddBlogHandler = () => {

        const dataStore = { title: title, video: video, description: description };
        if (!title || !video || !description ) {
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
            toast.success(`Youtube link is Added..`, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

            fetch(`${URL_LINK}/youtubelink`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${TOKEN_LINK}`,
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


    return (
        <>
            <Navbar />
            <div className="container mt-3 mb-3">
                <Button title="Go to Back" link="/YoutubeChannel" />
                <div className="row">
                    <div className="col-12">
                        <div className="form_data">
                            <form action="">
                                <div className="input-image video-link mb-3">
                                    {
                                        !video ? <iframe src='https://www.youtube.com/embed/K-rMrlBVcF0'></iframe> :<iframe src={video}></iframe>
                                    }

                                </div>
                                <div className="input-data">
                                    <label>Title</label>
                                    <input onChange={(e) => setTitle(e.target.value)} type="text" className="form-control" />
                                </div>
                                <div className="input-data">
                                    <label>Upload Video Link</label>
                                    <input onChange={(e) => setVideo(e.target.value)} type="text" className="form-control" />
                                </div>
                                <div className="input-data input-textarea">
                                    <label>Description</label>
                                    <textarea onChange={(e) => setDescription(e.target.value)} type='text' className="form-control" name="" id="" cols="30" rows="10"></textarea>
                                </div>

                                <div className="input-data">
                                    <button type='button' onClick={AddBlogHandler} className='btn btn-dark'>Add Youtube Link</button>
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

export default AddYoutube