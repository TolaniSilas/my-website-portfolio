import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import {
  FaReact,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaPython,
  FaGithub,
  FaLaptopCode,
} from "react-icons/fa";
import { SiTensorflow, SiPytorch, SiStreamlit, SiRender } from "react-icons/si";
import videoBg from "../assets/homepage-tech-video.mp4";
import AOS from "aos";
import "aos/dist/aos.css";

// Slideshow Component
const Slideshow = () => {
  const images = ["/images/silas1.png", "/images/silas2.png", "/images/silas3.png"];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-64 h-80 flex justify-center items-start">
      {/* Foreground Image */}
      <div className="relative w-64 h-80 rounded-lg overflow-hidden shadow-2xl transform -rotate-3 z-10">
        <img
          src={images[current]}
          alt="Osunba Silas"
          className="w-full h-full object-cover transition duration-700 ease-in-out"
        />
      </div>

      {/* Background Rectangle */}
      <div className="absolute top-6 left-6 w-64 h-80 bg-blue-500 rounded-lg transform rotate-6 shadow-xl z-0"></div>

      {/* Dots */}
      <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === current ? "bg-blue-600 scale-125" : "bg-gray-300 dark:bg-gray-600"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

const HomePage = () => {
  const [text] = useTypewriter({
    words: [
      "Data Scientist",
      "Technical Writer & Researcher",
      "Machine Learning Engineer",
      "AI Engineer",
      "Software Engineer",
    ],
    loop: {},
    typeSpeed: 80,
    deleteSpeed: 50,
    delaySpeed: 1800,
  });

  // Default filter category
  const [selectedCategory, setSelectedCategory] = useState("Languages");

  // Tech stack data (icons: use react-icons where available, otherwise fallback to SVG URLs)
  const techStack = {
    Languages: [
      { name: "Python", icon: <FaPython className="text-6xl" /> },
      { name: "JavaScript", icon: <FaJs className="text-6xl" /> },
      { name: "C++", icon: <img src="/logo-svg/cplusplus.svg" alt="C++" className="w-12 h-12" /> },
      { name: "HTML5", icon: <FaHtml5 className="text-6xl" /> },
      { name: "CSS3", icon: <FaCss3Alt className="text-6xl" /> },
      { name: "MATLAB", icon: <img src="/logo-svg/matlab.svg" alt="MATLAB" className="w-12 h-12" /> },
      { name: "PostgreSQL", icon: <img src="/logo-svg/postgresql.svg" alt="PostgreSQL" className="w-12 h-12" /> },
      { name: "MySQL", icon: <img src="/logo-svg/mysql.svg" alt="MySQL" className="w-12 h-12" /> },
    ],
    "Libraries & Frameworks": [
      { name: "React", icon: <FaReact className="text-6xl" /> },
      { name: "Node.js", icon: <img src="/logo-svg/nodejs.svg" alt="Node.js" className="w-12 h-12" /> },
      { name: "NumPy", icon: <img src="/logo-svg/numpy.svg" alt="NumPy" className="w-12 h-12" /> },
      { name: "pandas", icon: <img src="/logo-svg/pandas.svg" alt="pandas" className="w-12 h-12" /> },
      { name: "seaborn", icon: <img src="/logo-svg/seaborn.svg" alt="seaborn" className="w-12 h-12" /> },
      { name: "matplotlib", icon: <img src="/logo-svg/matplotlib.svg" alt="matplotlib" className="w-12 h-12" /> },
      { name: "scikit-learn", icon: <img src="/logo-svg/scikitlearn.svg" alt="scikit-learn" className="w-12 h-12" /> },
      { name: "langchain", icon: <img src="/logo-svg/langchain.svg" alt="langchain" className="w-12 h-12" onError={(e)=>{ e.currentTarget.onerror=null; e.currentTarget.src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chain/chain-original.svg'; }} /> },
      { name: "Flask", icon: <img src="/logo-svg/flask.svg" alt="Flask" className="w-12 h-12" /> },
      { name: "FastAPI", icon: <img src="/logo-svg/fastapi.svg" alt="FastAPI" className="w-12 h-12" /> },
      { name: "SQLAlchemy", icon: <img src="/logo-svg/sqlalchemy.svg" alt="SQLAlchemy" className="w-12 h-12" /> },
      { name: "Bootstrap CSS", icon: <img src="/logo-svg/bootstrap.svg" alt="Bootstrap" className="w-12 h-12" /> },
      { name: "Tailwind CSS", icon: <img src="/logo-svg/tailwind.svg" alt="Tailwind CSS" className="w-12 h-12" /> },
      { name: "TensorFlow", icon: <SiTensorflow className="text-5xl" /> },
      { name: "PyTorch", icon: <SiPytorch className="text-5xl" /> },
    ],
    "Tools & Platforms": [
      { name: "GitHub", icon: <FaGithub className="text-6xl" /> },
      { name: "Git", icon: <img src="/logo-svg/git.svg" alt="Git" className="w-12 h-12" /> },
      { name: "Docker", icon: <img src="/logo-svg/docker.svg" alt="Docker" className="w-12 h-12" /> },
      { name: "AWS", icon: <img src="/logo-svg/aws.svg" alt="AWS" className="w-12 h-12" /> },
      { name: "VS Code", icon: <FaLaptopCode className="text-6xl" /> },
      { name: "Streamlit", icon: <SiStreamlit className="text-5xl" /> },
      { name: "Render", icon: <SiRender className="text-5xl" /> },
      { name: "Microsoft Office Suite", icon: <img src="/logo-svg/msoffice.svg" alt="Microsoft Office" className="w-12 h-12" /> },
    ],
  };

  // ensure selectedCategory always exists (defensive)
  const filteredTechs = techStack[selectedCategory] || techStack.Languages;

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  return (
    <div className="flex flex-col gap-12 sm:gap-12 overflow-x-hidden">
      {/* Hero Section */}
      <section
        className="relative h-[90vh] sm:h-screen w-full overflow-hidden flex flex-col justify-center items-center text-center px-6"
        data-aos="fade-up"
      >
        <video
          src={videoBg}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        />

        <h1 className="text-4xl sm:text-6xl font-bold mb-4 text-white" data-aos="flip-left">
          Hi, I'm <span className="text-white">Osunba Silas</span> 👋
        </h1>

        {/* Animated Roles */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          {text}
          <Cursor cursorStyle="|" />
        </h2>

        {/* Tagline */}
        <p
          className="text-lg sm:text-2xl text-white mb-6 max-w-3xl"
          data-aos="fade-down-right"
        >
          I'm a result-driven engineer with a huge curiosity for all things research,
          innovation, data and machine learning! Optimizing solutions one gradient
          descent at a time... because why take steps when you can slide smoothly down
          the slope?
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4 flex-wrap justify-center" data-aos="slide-up">
          <Link
            to="/projects"
            className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            View Projects
          </Link>
          <Link
            to="/contact"
            className="bg-purple-600 border-purple-800 text-white hover:bg-purple-800 hover:text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Contact Me
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-0 transition-colors duration-300">
        <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-center" data-aos="slide-down">
          About Me
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Slideshow */}
          <div className="flex justify-center items-start" data-aos="zoom-in-up">
            <Slideshow />
          </div>

          {/* Story Text */}
          <div className="text-base sm:text-lg leading-relaxed space-y-6 mt-6 md:mt-0">
            <p data-aos="fade-left">
              Hi Mate, It's splendid to have you here. I'm{" "}
              <span className="font-semibold text-blue-500 dark:text-blue-400">Osunba Silas</span>, a resourceful,
              and result-driven engineer & researcher impelled by an unremitted pursuit of knowledge. I am an avid learner who is keen on exploring and learning new 
              things. I'm currently pursuing a BSc. degree in <span className="font-semibold text-blue-500 dark:text-blue-400">Electronic & Computer Engineering</span> at Lagos State University, on track to graduate with First Class Honors.
            </p>
            <p data-aos="fade-right">
              I have worked on and contributed to research aimed at transforming the status quo of knowledge in the field of machine learning and
              energy. I currently have three published papers - one in an international journal and two presented at an international conference.
            </p>
            <p data-aos="fade-left">
              I'm highly motivated by the drive to excel and the belief that great things can be achieved from even the smallest places.
              I have led impactful events, educational programs, and community outreach efforts as a result of my love for service and humanity. 
              I'm also an advocate of{" "} <span className="italic text-green-600">AI for Social Good</span>.
            </p>
            <p data-aos="fade-right">
              Outside academics and research, I love staying current with news on X, watching football games, learn about crypto, and playing snooker - you know,
              sometimes it's great to observe carefully before making that perfect shot 🎱.
            </p>

            {/* Buttons */}
            <div className="flex flex-row flex-wrap justify-center gap-4 sm:gap-6 mt-6" data-aos="slide-up">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border-blue-700 bg-blue-600 text-white rounded-lg hover:bg-blue-800"
              >
                Download Resume
              </a>
              <Link
                to="/contact"
                className="border border-gray-900 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-800"
              >
                Let's Connect
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Filterable Tech Stack Section */}
      <section className="bg-gray-300 dark:bg-gray-900 py-16 px-6 text-purple-800 transition-colors duration-500">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10 text-gray-900 dark:text-white">
            Tech Stack
          </h2>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {["Languages", "Libraries & Frameworks", "Tools & Platforms"].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-300 hover:bg-blue-500 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Tech Icons */}
          <div className="flex flex-wrap justify-center gap-10 sm:gap-12 text-purple-750 dark:text-blue-400">
            {filteredTechs.map((tech, index) => (
              <div 
              key={index}
              className="flex flex-col items-center justify-between w-28 h-32 sm:w-32 sm:h-36 transition-transform duration-300 hover:scale-110"
              data-aos="zoom-in"
              >
                <div className="flex items-center justify-center h-20 sm:h-24">
                  {tech.icon}
                  </div>
                  <p className="text-sm sm:text-base font-medium text-center text-gray-700 dark:text-gray-300">
                    {tech.name}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10" data-aos="slide-up">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Project 1 */}
            <div className="bg-blue-700 p-6 rounded-lg shadow hover:shadow-xl transition" data-aos="fade-right">
              <h3 className="text-xl font-semibold mb-2 text-[#05befa]">emPLE Web Application</h3>
              <p className="text-white mb-3">
                emPLE is a modern insurance company that sought a visually appealing, intuitive, and performance-driven web 
                platform to represent its brand and serve customers seamlessly. This project involved designing and 
                developing a responsive, aesthetically pleasing web application that reflects emPLE's people-centric 
                philosophy - “We help you get ready for tomorrow, today.”
              </p>
              <p>
                This platform simplifies how users explore insurance services while strengthening emPLE's digital presence. 
                It embodies the company's values; simplicity, accessibility, and trust, and offering customers a smooth, 
                engaging experience from first click to policy management.
              </p> <br></br>
              <Link to="/projects" className="text-amber-400 hover:underline">
                Learn More →
              </Link>
            </div>

            {/* Project 2 */}
            <div className="bg-blue-700 p-6 rounded-lg shadow hover:shadow-xl transition" data-aos="fade-left">
              <h3 className="text-xl font-semibold mb-2 text-[#05befa]">Automated Detection of Diabetic Retinopathy</h3>
              <p className="text-white mb-3">
                Diabetic Retinopathy (DR) is an eye disease triggered by diabetes, which may lead to blindness. To prevent 
                diabetic patients from becoming blind, early diagnosis and accurate detection of DR are vital. This immense 
                significance serves as the motivation for this work. 
              </p>
              <p>
                This application automates the early detection of DR using machine learning and computer vision. It analyzes 
                retinal fundus images to provide consistent and efficient screening results, addressing challenges in manual 
                diagnosis and limited access to ophthalmologists.
              </p> <br></br>
              <Link to="/projects" className="text-amber-400 hover:underline">
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="text-center py-16 px-6 bg-[#2b6dd4] purple-600 dark:bg-[#2b6dd4] text-white">
        <h2 className="text-3xl font-bold mb-6">Want to work together?</h2>
        <p className="mb-6 text-lg">
          I'm open to collaboration and contributions. Let's build something extraordinary together! 
        </p>
        <Link
          to="/contact"
          className="bg-white text-blue-600 hover:bg-gray-200 px-8 py-4 rounded-lg font-semibold transition"
        >
          Get in Touch
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
