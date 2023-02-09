import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Protected(props) {
    const { ProtectRoute } = props;
    const History = useNavigate()

    useEffect(() => {
        let storage = localStorage.getItem('users');
        if (!storage) {
            History('/Login');
        } else {
            History('/Dashboard');
        }
    }, []);

    return (
        <>
            <ProtectRoute />
        </>
    )
}

export default Protected