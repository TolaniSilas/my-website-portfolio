const Footer = () => {
    return (
        <footer className="bg-white dark:bg-gray-900 rounded-lg shadow-sm m-2 sm:m-4 transition-colors duration-300">
            <div className="w-full max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-center">
                <p className="text-xs sm:text-sm text-gray-600 text-center dark:text-gray-400">
                    © 2025 Developed with Love by{" "}
                    <a href="/" className="hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                        Osunba Silas™
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;