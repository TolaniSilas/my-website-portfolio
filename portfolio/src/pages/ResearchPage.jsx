import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaExternalLinkAlt } from "react-icons/fa";

// ---- Slideshow Images ----
const labImages = [
  { src: "/images/lab1.jpeg", alt: "In the lab working on Amplitude and Frequency Modulation (AM & FM) experiment" },
  { src: "/images/lab2.jpeg", alt: "Team discussion during the lab research" },
  { src: "/images/result1.jpeg", alt: "Displaying the modulated FM signal" },
  { src: "/images/result2.jpeg", alt: "Analyzing the experimental results with the aid of an oscilloscope"},
];

// ---- Publications ----
const publications = [
  {
    citation:
      "Bakare, A. O., Seriki, K. T., Emmanuel, F. O., Osunba, S. T., Ayoigbala, S. E., & K. J. Oshile. Using Convolutional Neural Network for the Detection of Offshore and Onshore Oil Spills. Paper presented at the SPE Nigeria Annual International Conference and Exhibition, Lagos, Nigeria, August 2025.",
    link: "https://doi.org/10.2118/228732-MS",
  },
  {
    citation:
      "Kolade, O., Adeleke, V. A., Ojo, S. D., Osunba, S., Anifowose, O., and K. Abdul. Electric Vehicles vs. Biofuels: A Review of Decarbonization in Transportation. Paper presented at the SPE Nigeria Annual International Conference and Exhibition, Lagos, Nigeria, August 2025.",
    link: "https://doi.org/10.2118/228753-MS",
  },
  {
    citation:
      "Bakare, A. O., Seriki, K. T., & Osunba, S. M. (2025). Predicting Proton Exchange Membrane Fuel Cell Performance through Advanced Machine Learning Techniques: A Comparative Analysis of Ensemble Techniques. Scientia. Technology, Science and Society, 2(8), 73-86.",
    link: "https://doi.org/10.59324/stss.2025.2(8).07",
  },
];

const ResearchPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Initialize AOS
  useEffect(() => {
    AOS.init({duration: 1000, once: false});
  }, []);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % labImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dark:text-white">
      {/* Inline animation CSS for vertical float */}
      <style>{`
        @keyframes floatY {
          0% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0); }
        }
        /* apply to any element that should float up/down */
        .float-heading {
          animation: floatY 3.2s ease-in-out infinite;
        }
        /* Respect reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          .float-heading {
            animation: none !important;
          }
        }
      `}</style>

      {/* Hero Section (no gradient background) */}
      <header className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] mb-16 overflow-hidden flex items-center justify-center" data-aos="zoom-in-down">
        <img
          src="/images/robot-image.png"
          alt="Research Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Centered Text (floats up & down) */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-4 float-heading">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg mb-4">
            Research
          </h1>
          <p className="text-sm sm:text-lg lg:text-xl text-[#cbf20d] mb-3 font-semibold drop-shadow">
            Machine Learning | Energy | Data Science
          </p>
          <p className="max-w-2xl mx-auto text-sm sm:text-base lg:text-lg text-white drop-shadow-md">
            I'm on a mission of building machines that learn intelligently just as humans.
          </p>
          <div className="mt-6">
            <a
              href="https://scholar.google.com/citations?user=akIRrWwAAAAJ&hl=en"
              className="inline-flex items-center text-white hover:text-[#cbf20d] font-semibold underline text-sm sm:text-base transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Scholar <FaExternalLinkAlt className="ml-2" />
            </a>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <div className="max-w-6xl mx-auto px-6">
        {/* Voyage and Interests Section */}
        <section className="mb-16">
          <div className="flex justify-center mb-8" data-aos="slide-up">
            <h2 className="relative text-xl sm:text-2xl font-bold text-white bg-blue-900 px-6 sm:px-8 py-3 rounded-2xl shadow-lg text-center float-heading">
              Voyage and Interests
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-blue-400 rounded-full" />
            </h2>
          </div>

          <p data-aos="fade-right">
            Research, as the word implies, is the practical art of re-exploring what is already known or exploring the unknown. It may stem from
            sheer curiosity or intuition. It is a quest to discover how things can be improved or to find new and efficient ways of performing tasks.
            If you can find and sense the gap, why not try to fill it?
          </p>
          <br />

          {/* Slideshow */}
          <div className="relative w-full max-w-5xl mx-auto">
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] rounded-xl overflow-hidden" data-aos="slide-up">
              <img
                src={labImages[currentIndex].src}
                alt={labImages[currentIndex].alt}
                className="absolute inset-0 w-full h-full object-cover rounded-xl"
              />
            </div>

            {/* Caption */}
            <p className="mt-3 text-center text-sm text-gray-600 dark:text-gray-400">
              {labImages[currentIndex].alt}
            </p>

            {/* Dots */}
            <div className="mt-3 flex justify-center space-x-2">
              {labImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`w-3 h-3 rounded-full transition ${
                    index === currentIndex
                      ? "bg-blue-600 scale-125"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Journey & Interests Text */}
          <p className="mt-12" data-aos="fade-left">
            My research voyage started when I was in my third year as a student, where I had the opportunity to work as a Student Research
            Intern at the Department of Electronic & Computer Engineering, Lagos State University, under the supervision and guidance of Dr. M.A.
            Adedoyin. Her guidance paved the way for my discovery of professional research, which differs from merely exploring without
            proper documentation.
          </p>
          <br />
          <p data-aos="fade-right">
            My interests are predominantly in{" "} <span className="font-semibold text-blue-600">
            Machine Learning, Embodied AI, and Energy</span>. I want to build machines that learn efficiently and intelligently,
            integrate artificial intelligence into physical systems to enable them to interact with the physical world, and design energy-efficient
            systems that promote a net-zero and sustainable world.
          </p>
        </section>
      </div>
      
      {/* Publications */}
      <section className="w-full bg-gray-200 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-center mb-8" data-aos="slide-up">
            <h2 className="relative text-xl sm:text-2xl font-bold text-purple-600 bg-purple-100 px-6 sm:px-8 py-3 rounded-2xl shadow-lg text-center float-heading">
              Publications
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-purple-400 rounded-full" />
            </h2>
          </div>

          <ul
            className="space-y-6 list-disc list-outside text-left mx-auto max-w-4xl"
            data-aos="flip-left"
          >
            {publications.map((pub, idx) => (
              <li key={idx} className="text-purple-600 font-medium leading-relaxed">
                {pub.link ? (
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {pub.citation}
                  </a>
                ) : (
                  <span>{pub.citation}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

    </div>
  );
};

export default ResearchPage;
