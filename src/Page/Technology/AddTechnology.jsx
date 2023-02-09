import React, { useState } from 'react'
import Navbar from '../../Components/Navbar'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Button from '../../Components/Button';

import { TOKEN_LINK, URL_LINK } from '../../Protected/Helpers';

function AddTechnology() {

    const nevagite = useNavigate()

    const [title, setTitle] = useState("");
    const [icon, setIcon] = useState("");
    const [description, setDescription] = useState("");

    const [store, setStore] = useState([]);
    // console.log('data ->', store)

    const AddTechnologyHandler = () => {

        const dataStore = { title: title, icon: icon, description:description };
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

            fetch(`${URL_LINK}/technology`, {
                method: 'POST',
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

    return (
        <>
            <Navbar />
            <div className="container mt-3">
                <Button title="Go to Back" link="/Client" />
                <div className="row">
                    <div className="col-12">
                        <div className="form_data">
                            <form action="">
                                <div className="input-image mb-3">
                                    {
                                        !icon ? <img src="../../assets/image/welcome/svg" alt="" /> : <img src={icon} alt="" />
                                    }

                                </div>
                                <div className="input-data">
                                    <label>Title</label>
                                    <input onChange={(e) => setTitle(e.target.value)} type="text" className="form-control" />
                                </div>
                                <div className="input-data">
                                    <label>Upload Image</label>
                                    <input onChange={(e) => setIcon(e.target.value)} type="text" className="form-control" />
                                </div>
                                <div className="input-data input-textarea">
                                    <label>Description</label>
                                    <textarea onChange={(e) => setDescription(e.target.value)} type='text' className="form-control" name="" id="" cols="30" rows="10"></textarea>
                                </div>

                                <div className="input-data">
                                    <button type='button' onClick={AddTechnologyHandler} className='btn btn-dark'>Add Client</button>
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

export default AddTechnology