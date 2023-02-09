import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../../Components/Button'
import Navbar from '../../Components/Navbar'
import { TOKEN_LINK, URL_LINK } from '../../Protected/Helpers'

function ViewBlog() {
    const params = useParams()

    const [data, setData] = useState([])
    // console.log(data)

    const fethData = () => {
        fetch(`${URL_LINK}/blog/${params._id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TOKEN_LINK}`
            }
        }).then((res) => res.json())
            .then((result) => {
                setData(result.Blog_List)
            })
    }

    useEffect(() => {
        fethData()
    }, [])

    const body = data.description;
    return (
        <>
            <Navbar />
            <div className="container mt-3">
                <Button title="Go to Back" link="/Blog" />
                <div className="row">
                    <div className="col-12">
                        <div className="view-content bg-dark">
                            <div className="input-image mb-4">
                                <img src={data.image} alt="" />
                            </div>
                            <div className="view-section contact-heading">
                                <h3>Title</h3>
                                <h4>{data.title}</h4>
                            </div>
                            <div className="view-section contact-heading">
                                <h3>Short Description</h3>
                                <h4>{data.desc_list}</h4>
                            </div>
                            <div className="view-section contact-heading">
                                <h3>Description</h3>
                                {/* <h5>{data.description}</h5> */}
                                <div dangerouslySetInnerHTML={{ __html: body }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewBlog