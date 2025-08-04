import React from "react";
import { Link } from "react-router-dom";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { FaReact, FaJs, FaHtml5, FaCss3Alt, FaPython } from "react-icons/fa";
import { SiTensorflow, SiPytorch } from "react-icons/si";

const HomePage = () => {
  const [text] = useTypewriter({
    words: [
      "Data Scientist",
      "Technical Writer",
      "Machine Learning Engineer & Researcher",
      "AI Engineer",
      "Software Engineer",
    ],
    loop: {},
    typeSpeed: 80,
    deleteSpeed: 50,
    delaySpeed: 1800,
  });

  return (
    <div className="flex flex-col gap-24 overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-[80vh] flex flex-col justify-center items-center text-center px-6 pt-32 sm:pt-40">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4">
          Hi, I'm{" "}
          <span className="text-blue-600 dark:text-blue-400">Osunba Silas</span>{" "}
          👋
        </h1>

        {/* Animated Roles */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          {text}
          <Cursor cursorStyle="|" />
        </h2>

        {/* Tagline */}
        <p className="text-lg sm:text-2xl text-gray-600 dark:text-gray-300 mb-6 max-w-3xl">
          I'm a result-driven engineer with a huge curiosity for all things
          research, innovation, data and machine learning! Optimizing solutions
          one gradient descent at a time... because why take steps when you can
          slide smoothly down the slope?
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4 flex-wrap justify-center">
          <Link
            to="/projects"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            View Projects
          </Link>
          <Link
            to="/contact"
            className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Contact Me
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Custom Image Layout */}
          <div className="relative flex justify-center">
            {/* Background Rectangle */}
            <div className="absolute top-6 left-6 w-64 h-80 bg-blue-500 rounded-lg transform rotate-6 shadow-xl"></div>
            {/* Foreground Image */}
            <div className="relative w-64 h-80 rounded-lg overflow-hidden shadow-2xl transform -rotate-3">
              <img
                src="/profile.jpg" // 👉 replace with your own image in /public
                alt="Osunba Silas"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Side - Text */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center md:text-left">
              About Me
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              Hi, I’m <span className="font-semibold">Osunba Silas</span>, a
              result-driven engineer with a passion for{" "}
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                data science, machine learning, and software innovation
              </span>
              . I enjoy transforming complex challenges into elegant solutions.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              With expertise in React, Python, TensorFlow, and PyTorch, I thrive
              at the intersection of research and real-world applications—
              optimizing solutions one gradient descent at a time 🚀.
            </p>
            <div className="flex gap-4 mt-6 justify-center md:justify-start">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Download Resume
              </a>
              <Link
                to="/contact"
                className="border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Let’s Connect
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Tech Stack</h2>
          <div className="flex flex-wrap justify-center gap-12 text-5xl text-blue-600 dark:text-blue-400">
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
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-2">Project One</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                A short description about your project goes here. Highlight the
                tools used and the impact of the work.
              </p>
              <Link to="/projects" className="text-blue-600 hover:underline">
                Learn More →
              </Link>
            </div>

            {/* Project 2 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-2">Project Two</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Another impactful project description goes here. Make it
                concise, engaging, and clear.
              </p>
              <Link to="/projects" className="text-blue-600 hover:underline">
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="text-center py-16 px-6 bg-blue-600 dark:bg-blue-700 text-white">
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
