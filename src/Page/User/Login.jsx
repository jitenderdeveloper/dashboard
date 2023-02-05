import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {

  const navigate = useNavigate();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [store, setStore] = useState([])
  // console.log("login data ->", store);
  const LoginHandler = () => {
    if (!username || !password) {
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
      const data = { username: username, password: password };
      setStore([...store, data])
      toast.success(`Welcome ${username} on Dashboard..`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      fetch('http://localhost:8000/user/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then((result) => result.json())
        .then((item) => {
          localStorage.setItem('users', JSON.stringify(item))
          navigate('/Dashboard')
        })
    }
  }

  // useEffect(() =>{



  // },[])

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="login-form">
              <form className='form-data'>
                <h3 className='mb-4 text-center'>LOGIN</h3>
                <div className="form-outline mb-4">
                  <label className="form-label">Username</label>
                  <input type="email" onChange={(e) => setUsername(e.target.value)} className="form-control" />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label">Password</label>
                  <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" />
                </div>
                <div className="row mb-4">
                  <div className="col font-change">
                    <a href="#!">Forgot password?</a>
                  </div>
                </div>
                <button type="button" onClick={LoginHandler} className="btn btn-primary btn-block mb-4">Sign in</button>
                <div className="text-center">
                  <p className='font-change'>Not a member? <a href="#!">Sign Up</a></p>
                  <p className='font-change'>or sign up with:</p>
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

export default Login