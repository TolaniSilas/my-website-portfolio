import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { FaReact, FaJs, FaHtml5, FaCss3Alt, FaPython } from "react-icons/fa";
import { SiTensorflow, SiPytorch } from "react-icons/si";

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
    <div className="flex flex-col gap-8 sm:gap-12 overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-[70vh] sm:min-h-[80vh] flex flex-col justify-center items-center text-center px-6 pt-4 sm:pt-16 lg:pt-24">
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
      <section className="max-w-6xl mx-auto px-6 py-0">
        <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-center">
          About Me
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Slideshow */}
          <div className="flex justify-center items-start">
            <Slideshow />
          </div>

          {/* Story Text */}
          <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-6 mt-6 md:mt-0">
            <p>
              Hi Mate, It's splendid to have you here. I'm{" "}
              <span className="font-semibold">Osunba Silas</span>, a resourceful,
              passionate, and result-driven engineer & researcher impelled by an
              unremitted pursuit of knowledge — I am on my voyage to being a
              polymath. I am an avid learner who is keen on exploring and
              learning new things within and beyond the horizon. I'm currently
              pursuing a BSc. degree in Electronic & Computer Engineering at
              Lagos State University, on track to graduate with First Class
              Honors.
            </p>
            <p>
              I have worked on and contributed to research aimed at transforming
              the status quo of knowledge in the fields of machine learning and
              energy. I currently have three published papers — one in an
              international journal and two presented at conferences — and I’m
              continuously seeking opportunities to expand and extend knowledge.
            </p>
            <p>
              I'm highly motivated by the drive to excel and the belief that
              great things can be achieved from even the smallest places. I
              strongly believe excellence should be cultivated as a lifestyle —
              the way we live, abide, and adhere to. I have volunteered in
              impactful and educational initiatives. I am the Co-Founder of{" "}
              <span className="font-semibold">Inspire The Students Initiative</span>,
              aimed at empowering undergraduate students at Lagos State
              University.
            </p>
            <p>
              I have served and led in various capacities, including as President
              and Vice President of the{" "}
              <span className="font-semibold">Society of Petroleum Engineers,
              Lagos State University</span> for 2023/2024 and 2024/2025
              respectively. I have led impactful events, educational programs,
              and community outreach efforts as a result of my love for service
              and humanity. I'm also an advocate of{" "}
              <span className="italic">AI for Social Good</span>.
            </p>
            <p>
              Outside academics and research, I love staying current with news on
              X, watching football games, and playing snooker — you know,
              sometimes it’s great to observe carefully before making that
              perfect shot 🎱.
            </p>

            {/* Buttons */}
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
