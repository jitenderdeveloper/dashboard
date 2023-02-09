import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../Components/Button';

import { TOKEN_LINK, URL_LINK } from '../../Protected/Helpers';

function EditClient() {

    const params = useParams()
    // console.log(params.id)

    const nevagite = useNavigate()

    const [title, setTitle] = useState("");
    const [logo, setLogo] = useState("");

    const [store, setStore] = useState([]);
    // console.log('data ->', store)

    const EditClientHandler = () => {

        const dataStore = { title: title, logo: logo };
        if (!title || !logo) {
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
            toast.success(`Client is Updated..`, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

            fetch(`${URL_LINK}/client/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${TOKEN_LINK}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataStore)
            }).then((rep) => rep.json())
                .then((result) => {
                    // console.log('data ->', result)
                    nevagite('/Client')
                })

        }
    }

    const fethData = () => {
        fetch(`${URL_LINK}/client/${params.id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${TOKEN_LINK}`,
                'Content-Type': 'application/json'
            }
        }).then((rep) => rep.json())
            .then((result) => {
                let data = result.Client_list;
                // console.log(data)
                setTitle(data.title)
                setLogo(data.logo)
            })
    }

    useEffect(() => {
        fethData()
    },[])

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
                                        !logo ? <img src="../../assets/image/welcome/svg" alt="" /> : <img src={logo} alt="" />
                                    }

                                </div>
                                <div className="input-data">
                                    <label>Title</label>
                                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="form-control" />
                                </div>
                                <div className="input-data">
                                    <label>Upload Image</label>
                                    <input onChange={(e) => setLogo(e.target.value)} type="text" className="form-control" />
                                </div>
                                <div className="input-data">
                                </div>

                                <div className="input-data">
                                    <button type='button' onClick={EditClientHandler} className='btn btn-dark'>Updated Client</button>
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

export default EditClient