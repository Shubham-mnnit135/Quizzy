import React from "react";
import "./Footer.css";
import { FaFacebook, FaInstagram, FaTelegram, FaTwitter } from "react-icons/fa";
const Footer = () => {
    return (
        <div className="footer">
            <FaFacebook className='icons'/>
            <FaTwitter className='icons'/>
            <FaInstagram className='icons'/>
            <FaTelegram className='icons'/>
        </div>
    )
}

export default Footer;