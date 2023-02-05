import React, { useEffect, useState } from 'react'
import Button from '../../Components/Button'
import Navbar from '../../Components/Navbar'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import { URL_LINK } from '../../Protected/Helpers';


function EditProduct() {
    const params = useParams()
    // console.log("params data ->",params.id)

    const nevagite = useNavigate()

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [logo, setLogo] = useState("");
    const [price, setPrice] = useState("");
    const [link, setLink] = useState("");
    const [description, setDescription] = useState("");

    const [store, setStore] = useState([]);
    // console.log('data ->', store)

    let user = JSON.parse(localStorage.getItem('users'));
    const token = user.token;

    const AddProductHandler = () => {

        const dataStore = { title: title, category: category, logo: logo, description: description, price: price, link: link };
        if (!title || !category || !logo || !description || !price || !link) {
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
            toast.success(`Product is Added..`, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

            fetch(`${URL_LINK}/product/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataStore)
            }).then((rep) => rep.json())
                .then((result) => {
                    // console.log('data ->', result)
                    nevagite('/Product')
                })

        }
    }

    const UpdateData = () => {
        fetch(`${URL_LINK}/product/${params.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => res.json())
            .then((result) => {
                let prData = result.Product_List;
                const { title, price, logo, link, description, category } = prData;
                setTitle(title)
                setPrice(price)
                setLogo(logo)
                setLink(link)
                setDescription(description)
                setCategory(category)
            })
    }

    useEffect(() => {
        UpdateData()
    }, [])


    return (
        <>
            <Navbar />
            <div className="container mt-3">
                <Button title="Go to Back" link="/Product" />
                <div className="row">
                    <div className="col-12">
                        <div className="form_data">
                            <form action="">
                                <div className="input-image mb-3">
                                    {
                                        !logo ? <img src=".././assets/image/welcome/svg" alt="" /> : <img src={logo} alt="" />
                                    }

                                </div>
                                <div className="input-data">
                                    <label>Title</label>
                                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="form-control" />
                                </div>
                                <div className="input-data">
                                    <label>Category</label>
                                    <input value={category} onChange={(e) => setCategory(e.target.value)} type="text" className="form-control" />
                                </div>
                                <div className="input-data">
                                    <label>Upload Image</label>
                                    <input value={logo} onChange={(e) => setLogo(e.target.value)} type="text" className="form-control" />
                                </div>
                                <div className="input-data">
                                    <label>Price</label>
                                    <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" className="form-control" />
                                </div>
                                <div className="input-data">
                                    <label>Product Link</label>
                                    <input value={link} onChange={(e) => setLink(e.target.value)} type="text" className="form-control" />
                                </div>
                                <div className="input-data input-textarea">
                                    <label>Description</label>
                                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} type='text' className="form-control" name="" id="" cols="30" rows="10"></textarea>
                                </div>

                                <div className="input-data">
                                    <button type='button' onClick={AddProductHandler} className='btn btn-dark'>Add Product</button>
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

export default EditProduct