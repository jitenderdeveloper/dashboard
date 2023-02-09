// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';


// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { TOKEN_LINK, URL_LINK } from '../../Protected/Helpers';



// function checkPassword(newPassword, confirmP) {
//     if (newPassword == confirmP) {
//         return true
//     }
//     return false
// }

// function Signup() {

//     const nevigate = useNavigate()

//     const [username, setUsername] = useState('')
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [Cpassword, setCPassword] = useState('')

//     const [store, setStore] = useState([])
//     // console.log("Signup data ->", store);

//     const SignupHandler = () => {
//         if (!username && !email && !password && !Cpassword) {
//             toast.error('All field are required!', {
//                 position: "top-right",
//                 autoClose: 1000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "colored",
//             });
//             return

//         } else if (!checkPassword(password, Cpassword)) {
//             toast.error('Password not matched!', {
//                 position: "top-right",
//                 autoClose: 1000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "colored",
//             });

//             return;
//         }else {
//             const items = { username: username, email: email, checkPassword };
//             setStore([...store, items])
//             toast.success(`Hey ${username} Signup..`, {
//                 position: "top-right",
//                 autoClose: 1000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "colored",
//             });

//             fetch(`${URL_LINK}/user/signup`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Accept': 'application/json',
//                     'Authorization': `Bearer ${TOKEN_LINK}`,
//                 },
//                 body: JSON.stringify(items)
//             }).then((result) => result.json())
//                 .then((data) => {
//                     console.log("data signup->", data);
//                     // nevigate('/Dashboard')
//                 })

//         }

//     }


//     return (
//         <>
//             <div className="container">
//                 <div className="row">
//                     <div className="col-12">
//                         <div className="login-form">
//                             <form className='form-data signup-data'>
//                                 <h3 className='mb-4 text-center'>SIGNUP</h3>
//                                 <div className="form-outline mb-4">
//                                     <label className="form-label">Username</label>
//                                     <input type="email" onChange={(e) => setUsername(e.target.value)} className="form-control" />
//                                 </div>

//                                 <div className="form-outline mb-4">
//                                     <label className="form-label">Email</label>
//                                     <input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" />
//                                 </div>

//                                 <div className="form-outline mb-4">
//                                     <label className="form-label">Password</label>
//                                     <input type="email" onChange={(e) => setPassword(e.target.value)} className="form-control" />
//                                 </div>

//                                 <div className="form-outline mb-4">
//                                     <label className="form-label">Confirm Password</label>
//                                     <input type="password" onChange={(e) => setCPassword(e.target.value)} className="form-control" />
//                                 </div>
//                                 <button type="button" onClick={SignupHandler} className="btn btn-primary btn-block mb-4">Sign Up</button>
//                                 <div className="text-center">
//                                     <p className='font-change'>Not a member? <a href="#!">Sign in</a></p>
//                                     <p className='font-change'>or sign up with:</p>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <ToastContainer />
//         </>
//     )
// }

// export default Signup