import React, { useEffect, useState } from 'react'
import Button from '../../Components/Button'
import Navbar from '../../Components/Navbar'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import { TOKEN_LINK, URL_LINK } from '../../Protected/Helpers';
import { Editor } from '@tinymce/tinymce-react';

function EditBlog() {

    const params = useParams()

    const nevagite = useNavigate()

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [desc_list, setDesc_list] = useState("");
    const [description, setDescription] = useState("");

    const [store, setStore] = useState([]);
    // console.log('data ->', store)

    const updategetData = () => {
        fetch(`${URL_LINK}/blog/${params._id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${TOKEN_LINK}`,
                'Content-Type': 'application/json'
            }
        }).then((rep) => rep.json())
            .then((result) => {
                // console.log('data ->', result.Blog_List)
                const fetchData = result.Blog_List;
                const { title, category, image, description, desc_list } = fetchData;
                setTitle(title)
                setCategory(category)
                setImage(image)
                setDescription(description)
                setDesc_list(desc_list)
            })
    }


    const UpdateHandler = () => {

        const dataStore = { title: title, category: category, image: image, description: description, desc_list: desc_list };
        if (!title || !category || !image || !description || !desc_list) {
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
            toast.success(`Blog is Added..`, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

            fetch(`${URL_LINK}/blog/${params._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${TOKEN_LINK}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataStore)
            }).then((rep) => rep.json())
                .then((result) => {
                    // console.log('data ->', result)
                    nevagite('/Blog')
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
                                <div className="input-image mb-3">
                                    <img src={image} alt="" />
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
                                    <input value={image} onChange={(e) => setImage(e.target.value)} type="text" className="form-control" />
                                </div>
                                <div className="input-data input-textarea">
                                    <label>Short Description</label>
                                    <input value={desc_list} onChange={(e) => setDesc_list(e.target.value)} type="text" className="form-control" />
                                </div>
                                <div className="input-data input-textarea">
                                    <label>Description</label>
                                    <Editor
                                        textareaName="content"
                                        initialValue="description"
                                        value={description}
                                        onEditorChange={(newText) => setDescription(newText)}
                                        init={{
                                            height: 500,
                                            menubar: false,
                                            plugins: [
                                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                            ],
                                            toolbar: 'undo redo | blocks | ' +
                                                'bold italic forecolor | alignleft aligncenter ' +
                                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                                'removeformat | help',
                                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                        }}
                                    />
                                </div>

                                <div className="input-data">
                                    <button type='button' onClick={UpdateHandler} className='btn btn-dark'>Update Blog</button>
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

export default EditBlog