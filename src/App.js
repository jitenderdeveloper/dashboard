import React, { useEffect, useState } from "react";
import { Route, Router, Routes } from "react-router-dom";
import AddBlog from "./Page/Blog/AddBlog";
import Blog from "./Page/Blog/Blog";
import EditBlog from "./Page/Blog/EditBlog";
import ViewBlog from "./Page/Blog/ViewBlog";

import AddClient from "./Page/Clients/AddClient";
import Client from "./Page/Clients/Client";
import EditClient from "./Page/Clients/EditClient";
import ViewClient from "./Page/Clients/ViewClient";

import Contact from "./Page/Contact/Contact";
import ViewContact from "./Page/Contact/ViewContact";

import Testimonial from "./Page/Testimonial/Testimonial";
import ViewTestimonial from "./Page/Testimonial/ViewTestimonial";

import YoutubeChannel from "./Page/Youtube/YoutubeChannel";
import AddYoutube from "./Page/Youtube/AddYoutube";
import EditYoutube from "./Page/Youtube/EditYoutube";
import ViewYoutube from "./Page/Youtube/ViewYoutube";

import Technology from "./Page/Technology/Technology";
import AddTechnology from "./Page/Technology/AddTechnology";
import EditTechnology from "./Page/Technology/EditTechnology";
import ViewTechnology from "./Page/Technology/ViewTechnology";


import Product from "./Page/Product/Product";
import AddProduct from "./Page/Product/AddProduct";
import EditProduct from "./Page/Product/EditProduct";
import ViewProduct from "./Page/Product/ViewProduct";

import Signup from "./Page/User/Signup";
import Login from "./Page/User/Login";
import Users from "./Page/User/Users";

import Loading from "./Protected/Loading";
import Dashboard from "./Page/Dashboard";
import Home from "./Page/Home";
import PageNotFound from "./Protected/PageNotFound";
import Protected from "./Protected/Protected";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {loading ? <Loading /> :

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="*" exact={true} element={<PageNotFound />} />

          <Route path="/Login" element={<Protected ProtectRoute={Login} />} />
          <Route path="/Signup" element={<Protected ProtectRoute={Signup} />} />
          <Route path="/Users" element={<Protected ProtectRoute={Users} />} />

          <Route path="/Dashboard" element={<Protected ProtectRoute={Dashboard} />} />

          <Route path="/Blog" element={<Protected ProtectRoute={Blog} />} />
          <Route path="/AddBlog" element={<Protected ProtectRoute={AddBlog} />} />
          <Route path="/EditBlog/:_id" element={<Protected ProtectRoute={EditBlog} />} />
          <Route path="/ViewBlog/:_id" element={<Protected ProtectRoute={ViewBlog} />} />

          <Route path="/Client" element={<Protected ProtectRoute={Client} />} />
          <Route path="/AddClient" element={<Protected ProtectRoute={AddClient} />} />
          <Route path="/EditClient/:id" element={<Protected ProtectRoute={EditClient} />} />
          <Route path="/ViewClient/:id" element={<Protected ProtectRoute={ViewClient} />} />

          <Route path="/Contact" element={<Protected ProtectRoute={Contact} />} />
          <Route path="/ViewContact/:id" element={<Protected ProtectRoute={ViewContact} />} />

          <Route path="/Testimonial" element={<Protected ProtectRoute={Testimonial} />} />
          <Route path="/ViewTestimonial/:id" element={<Protected ProtectRoute={ViewTestimonial} />} />

          <Route path="/YoutubeChannel" element={<Protected ProtectRoute={YoutubeChannel} />} />
          <Route path="/AddYoutube" element={<Protected ProtectRoute={AddYoutube} />} />
          <Route path="/EditYoutube/:id" element={<Protected ProtectRoute={EditYoutube} />} />
          <Route path="/ViewYoutube/:id" element={<Protected ProtectRoute={ViewYoutube} />} />

          <Route path="/Product" element={<Protected ProtectRoute={Product} />} />
          <Route path="/AddProduct" element={<Protected ProtectRoute={AddProduct} />} />
          <Route path="/EditProduct/:id" element={<Protected ProtectRoute={EditProduct} />} />
          <Route path="/ViewProduct/:id" element={<Protected ProtectRoute={ViewProduct} />} />

          <Route path="/Technology" element={<Protected ProtectRoute={Technology} />} />
          <Route path="/AddTechnology" element={<Protected ProtectRoute={AddTechnology} />} />
          <Route path="/EditTechnology/:id" element={<Protected ProtectRoute={EditTechnology} />} />
          <Route path="/ViewTechnology/:id" element={<Protected ProtectRoute={ViewTechnology} />} />


        </Routes>


      }
    </>
  );
}

export default App;
