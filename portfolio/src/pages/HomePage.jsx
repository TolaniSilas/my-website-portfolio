import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { FaReact, FaJs, FaHtml5, FaCss3Alt, FaPython } from "react-icons/fa";
import { SiTensorflow, SiPytorch } from "react-icons/si";
import videoBg from "../assets/blue-digital-programming.3840x2160.mp4";

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
              index === current
                ? "bg-blue-600 scale-125"
                : "bg-gray-300 dark:bg-gray-600"
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

  return (
    <div className="flex flex-col gap-12 sm:gap-12 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[90vh] sm:h-screen w-full overflow-hidden flex flex-col justify-center items-center text-center px-6">
        <video src={videoBg} autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover -z-10" />


        <h1 className="text-4xl sm:text-6xl font-bold mb-4 text-white">
          Hi, I'm {" "}
          <span className="text-white ">Osunba Silas</span>{" "}
          👋
        </h1>

        {/* Animated Roles */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          {text}
          <Cursor cursorStyle="|" />
        </h2>

        {/* Tagline */}
        <p className="text-lg sm:text-2xl text-white mb-6 max-w-3xl">
          I'm a result-driven engineer with a huge curiosity for all things research, innovation, data and machine learning! Optimizing solutions
          one gradient descent at a time... because why take steps when you can slide smoothly down the slope?
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4 flex-wrap justify-center">
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
        <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-center">
          About Me
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Slideshow */}
          <div className="flex justify-center items-start">
            <Slideshow />
          </div>

          {/* Story Text */}
          <div className="text-base sm:text-lg leading-relaxed space-y-6 mt-6 md:mt-0">
            <p>
              Hi Mate, It's splendid to have you here. I'm{" "} <span className="font-semibold text-blue-500 dark:text-blue-400">Osunba Silas</span>, a resourceful,
              and result-driven engineer & researcher impelled by an unremitted pursuit of knowledge. I am an avid learner who is keen on exploring and learning new 
              things. I'm currently pursuing a BSc. degree in <span className="font-semibold text-blue-500 dark:text-blue-400">Electronic & Computer Engineering</span> at Lagos State University, on track to graduate with First Class Honors.
            </p>
            <p>
              I have worked on and contributed to research aimed at transforming the status quo of knowledge in the field of machine learning and
              energy. I currently have three published papers - one in an international journal and two presented at an international conference.
            </p>
            <p>
              I'm highly motivated by the drive to excel and the belief that great things can be achieved from even the smallest places.
              I have led impactful events, educational programs, and community outreach efforts as a result of my love for service and humanity. 
              I'm also an advocate of{" "} <span className="italic text-green-600">AI for Social Good</span>.
            </p>
            <p>
              Outside academics and research, I love staying current with news on X, watching football games, learn about crypto, and playing snooker - you know,
              sometimes it’s great to observe carefully before making that perfect shot 🎱.
            </p>

            {/* Buttons */}
            <div className="flex flex-row flex-wrap justify-center gap-4 sm:gap-6 mt-6">
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

      {/* Skills Section */}
      





      <section className="bg-gray-300 dark:bg-gray-900 py-16 px-6 text-purple-800">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Tech Stack</h2>
          <div className="flex flex-wrap justify-center gap-12 text-5xl text-purple-750 dark:text-blue-400">
            <FaReact title="React" />
            <FaJs title="JavaScript" />
            <FaHtml5 title="HTML5" />
            <FaCss3Alt title="CSS3" />
            <FaPython title="Python" />
            <SiTensorflow title="TensorFlow" />
            <SiPytorch title="PyTorch" />
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Project 1 */}
            <div className="bg-blue-700 p-6 rounded-lg shadow hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-2">Project One</h3>
              <p className="text-white">
                A short description about your project goes here. Highlight the
                tools used and the impact of the work.
              </p>
              <Link to="/projects" className="text-amber-400 hover:underline">
                Learn More →
              </Link>
            </div>

            {/* Project 2 */}
            <div className="bg-blue-700 p-6 rounded-lg shadow hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-2">Project Two</h3>
              <p className="text-white">
                Another impactful project description goes here. Make it
                concise, engaging, and clear.
              </p>
              <Link to="/projects" className="text-amber-400 hover:underline">
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="text-center py-16 px-6 bg-purple-600 dark:bg-purple-700 text-white">
        <h2 className="text-3xl font-bold mb-6">Want to work together?</h2>
        <p className="mb-6 text-lg">
          Let's collaborate and build something amazing with data, AI, and
          software engineering.
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
