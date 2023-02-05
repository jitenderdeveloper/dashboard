import React from 'react'
import { FadeLoader } from 'react-spinners';



function Loading() {
    return (
        <>
            <div className="loader">
                <h4>Loading</h4>
                <FadeLoader
                    color="#00B0FF"
                    aria-label="Loading Spinner"
                />
            </div>
        </>
    )
}

export default Loading