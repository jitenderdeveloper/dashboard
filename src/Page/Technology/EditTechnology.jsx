import React, { useEffect, useState } from 'react'
import Button from '../../Components/Button'
import Navbar from '../../Components/Navbar'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import { TOKEN_LINK, URL_LINK } from '../../Protected/Helpers';

function EditTechnology() {

    const params = useParams()

    const nevagite = useNavigate()

    const [title, setTitle] = useState("");
    const [icon, setIcon] = useState("");
    const [description, setDescription] = useState("");

    const [store, setStore] = useState([]);
    // console.log('data ->', store)

    const updategetData = () => {
        fetch(`${URL_LINK}/technology/${params.id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${TOKEN_LINK}`,
                'Content-Type': 'application/json'
            }
        }).then((rep) => rep.json())
            .then((result) => {
                // console.log('data ->', result.Technology_list)
                const fetchData = result.Technology_list;
                const { title, icon, description } = fetchData;
                setTitle(title)
                setIcon(icon)
                setDescription(description)
            })
    }


    const UpdateHandler = () => {

        const dataStore = { title: title, icon: icon, description: description };
        if (!title || !icon || !description) {
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
            toast.success(`Technology is Added..`, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

            fetch(`${URL_LINK}/technology/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${TOKEN_LINK}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataStore)
            }).then((rep) => rep.json())
                .then((result) => {
                    // console.log('data ->', result)
                    nevagite('/Technology')
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
                <Button title="Go to Back" link="/Technology" />
                <div className="row">
                    <div className="col-12">
                        <div className="form_data">
                            <form action="">
                                <div className="input-image mb-3">
                                    <img src={icon} alt="" />
                                </div>
                                <div className="input-data">
                                    <label>Title</label>
                                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="form-control" />
                                </div>
                                <div className="input-data">
                                    <label>Upload Image</label>
                                    <input value={icon} onChange={(e) => setIcon(e.target.value)} type="text" className="form-control" />
                                </div>
                                <div className="input-data input-textarea">
                                    <label>Description</label>
                                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} type='text' className="form-control" name="" id="" cols="30" rows="10"></textarea>
                                </div>

                                <div className="input-data">
                                    <button type='button' onClick={UpdateHandler} className='btn btn-dark'>Update Technology</button>
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

export default EditTechnology