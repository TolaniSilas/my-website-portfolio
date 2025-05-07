import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav aria-label="Main Navigation">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/projects">Projects</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/research">Research</Link></li>
                <li><button>Contact Me</button></li>
            </ul>
        </nav>
    );
};


export default NavBar;