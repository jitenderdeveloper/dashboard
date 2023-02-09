import React, { useEffect, useState } from "react";
import { BiChevronsDown } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {

    const nevigate = useNavigate();
    let user = JSON.parse(localStorage.getItem("users"));
    // console.log(user.username);
    function LogoutHandler() {
        localStorage.clear();
        nevigate("/Login");
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-dark sticky-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src="../assets/image/wizard-logo.svg" alt="" />
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <BiChevronsDown />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/Dashboard">Dashboard</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/Blog">Blogs</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/Client">Client</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/Contact">Contact</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/Testimonial">Testimonials</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/YoutubeChannel">Youtube Channel</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/Product">Products</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/Technology">Technology</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/Users">Users</NavLink>
                            </li>
                        </ul>
                        <ul className="profile-section">
                            <li className="nav-item dropdown profile-section">
                                <a className="nav-link dropdown-toggle hidden-arrow d-flex align-items-center" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {user && user.username}
                                    <img
                                        src="https://mdbootstrap.com/img/Photos/Avatars/img (31).jpg"
                                        className="rounded-circle"
                                        height="22"
                                        alt=""
                                        loading="lazy"
                                    />
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Settings
                                        </a>
                                    </li>
                                    {user ? (
                                        <li>
                                            <button
                                                type="button"
                                                className="dropdown-item bg-danger"
                                                onClick={LogoutHandler}
                                            >
                                                Logout
                                            </button>
                                        </li>
                                    ) : (
                                        ""
                                    )}
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
