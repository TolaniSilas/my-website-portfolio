import React from 'react';
import NavBar from './NavBar';


const Header = () => {
    return (
        <header>
            <div>
                <a href="/" aria-label="Go to Homepage">
                    <img src="https://flowbite.com/docs/images/logo.svg" alt="Logo" />
                    <span>Osunba Silas</span>
                </a>
            </div>
            <NavBar />
            <div>
                <span>|</span>
                <a href="https://github.com/TolaniSilas" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" width="20" height="20" />
                </a>
                <a href="https://www.linkedin.com/in/osunbasilas/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="LinkedIn" width="20" height="20" />
                </a>
                <a href="https://x.com/thaguymaxx" target="_blank" rel="noopener noreferrer" aria-label="X">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg" alt="X" width="20" height="20" />
                </a>        
            </div>
        </header>
    )
}


export default Header;