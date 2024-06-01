import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";
// import "./Layout.css"
const Layout = () => {
    const location = useLocation();
    const isQuizPage = location.pathname === '/protected/quiz-page';
    return (
        <>
            {!isQuizPage && <Navbar/>}
            <Outlet/>
            {!isQuizPage && <Footer/>}
        </>
    )
}

export default Layout;