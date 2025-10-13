import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import ai_mlBg from "../assets/ai-and-ml-video.mp4";
import sw_devBg from "../assets/software-dev-video.mp4";
import AOS from "aos";
import "aos/dist/aos.css";

// define the project data 
const projects = [
  {
    id: 1,
    title: "AI Chat Assistant",
    categories: ["AI & ML", "Backend Development"],
    description:
      "A conversational AI assistant that intelligently understands and responds to user prompts using advanced open-source LLM APIs. Designed for natural dialogue flow, contextual awareness, and seamless backend integration.",
    image: "/images/ai-chat-image.png",
    link: "https://github.com/TolaniSilas/LLM-ChatApp/",
  },
  {
    id: 2,
    title: "Loan Eligibility App",
    categories: ["Backend Development", "AI & ML", "Web Development"],
    description:
      "A machine learning web application developed for Dream Housing Finance to automate real-time loan eligibility assessments. It analyzes customer data, validates financial metrics, and predicts approval outcomes with high accuracy, streamlining decision-making for the company.",
    image: "/images/loan-eligibility.png",
    link: "https://dreamhousingfinance.onrender.com/",
  },
  {
    id: 3,
    title: "Portfolio Website",
    categories: ["Web Development"],
    description:
      "A visually engaging personal portfolio website that reflects my values, skills, and projects. Built with React.js and Tailwind CSS, it features dark mode, smooth animations, and a fully responsive design for optimal viewing across devices.",
    image: "/images/portfolio-image.png",
    link: "https://github.com/TolaniSilas/my-website-portfolio",
  },
  {
    id: 4,
    title: "Automated Detection of Diabetic Retinopathy",
    categories: ["AI & ML", "Web Development", "Backend Development"],
    description:
      "An AI-driven software system for early detection of Diabetic Retinopathy (DR) using deep learning and computer vision techniques. This project analyzes retinal fundus images to automate diagnosis, improving accuracy, speed, and accessibility of diabetic eye screening for ophthalmologists.",
    image: "/images/ai-as-a-doctor.png",
    link: "https://diabetic-retinopathy-web.streamlit.app/",
  },
  {
    id: 5,
    title: "emPLE Web Application",
    categories: ["Web Development", "Backend Development", "Featured"],
    description:
      "emPLE is a modern insurance web application built for a people-centric brand. It delivers a seamless and intuitive user experience, simplifying how customers explore and manage insurance services. Designed and developed with responsiveness, accessibility, and brand consistency at its core.",
    image: "/images/emple-image.png",
    link: "https://www.emple.group/",
  },
  {
    id: 6,
    title: "Improving Students’ Performance in Nigerian Schools",
    categories: ["AI & ML", "Featured"],
    description:
      "A data analytics and machine learning project designed to recover the key factors influencing students' performance in Nigerian schools. By analyzing survey, and assessment data of JAMB UTME, the model identifies students at risk, and recommends actionable interventions to enhance educational outcomes.",
    image: "/images/jamb-image.png",
    link: "https://github.com/TolaniSilas/Improving-Students-Performance-in-Nigerian-Schools-",
  },
];

// define the hero section background videos
const heroBackgrounds = [
  {
    id: 1,
    video: ai_mlBg,
    title: "AI & Machine Learning",
    subtitle:
      "I enable machines or systems to sense, reason, act, or adapt like a human",
  },
  {
    id: 2,
    video: sw_devBg,
    title: "Software Development",
    subtitle: "I build scalable, secure and robust software applications",
  },
];

const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Projects");
  const [currentHero, setCurrentHero] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [displayedSubtitle, setDisplayedSubtitle] = useState("");
  const [phase, setPhase] = useState("typingTitle");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // detect dark mode dynamically
  useEffect(() => {
    const html = document.documentElement;
    const observer = new MutationObserver(() => {
      setIsDarkMode(html.classList.contains("dark"));
    });
    observer.observe(html, { attributes: true, attributeFilter: ["class"] });
    setIsDarkMode(html.classList.contains("dark"));
    return () => observer.disconnect();
  }, []);

  const { title, subtitle, video } = heroBackgrounds[currentHero];

  // typewriter + video switch
  useEffect(() => {
    let timeout;
    let text = "";
    let subText = "";

    if (phase === "typingTitle") {
      let i = 0;
      timeout = setInterval(() => {
        text += title[i];
        setDisplayedText(text);
        i++;
        if (i === title.length) {
          clearInterval(timeout);
          setTimeout(() => setPhase("typingSubtitle"), 200);
        }
      }, 50);
    }

    if (phase === "typingSubtitle") {
      let j = 0;
      timeout = setInterval(() => {
        subText += subtitle[j];
        setDisplayedSubtitle(subText);
        j++;
        if (j === subtitle.length) {
          clearInterval(timeout);
          setTimeout(() => setPhase("switch"), 3000);
        }
      }, 40);
    }

    if (phase === "switch") {
      setDisplayedText("");
      setDisplayedSubtitle("");
      setCurrentHero((prev) => (prev + 1) % heroBackgrounds.length);
      setPhase("typingTitle");
    }

    return () => clearInterval(timeout);
  }, [phase, title, subtitle]);

  // updated filtering logic for multiple categories
  const filteredProjects =
    selectedCategory === "All Projects"
      ? projects
      : projects.filter((p) => p.categories.includes(selectedCategory));

  const categories = [
    "All Projects",
    "AI & ML",
    "Backend Development",
    "Web Development",
    "Featured",
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-700 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* hero section */}
      <div className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden bg-black">
        {/* crossfade videos */}
        <div className="absolute inset-0">
          <AnimatePresence>
            {heroBackgrounds.map(
              (bg, index) =>
                index === currentHero && (
                  <motion.video
                    key={bg.id}
                    src={bg.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                  />
                )
            )}
          </AnimatePresence>
        </div>

        <div
          className={`absolute inset-0 ${
            isDarkMode ? "bg-black/70" : "bg-black/60"
          }`}
        ></div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            {displayedText}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-2 bg-white ml-1 h-6 md:h-8"
            />
          </h1>
          <p className="text-gray-200 text-lg md:text-xl">
            {displayedSubtitle}
          </p>
        </div>
      </div>

      {/* stats section */}
      <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { value: "30+", label: "Projects Completed" },
          { value: "20+", label: "Technologies Used" },
          { value: "350+", label: "GitHub Commits" },
          { value: "8+", label: "Live Deployments" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            className={`text-center border rounded-2xl p-6 shadow-md transition-all duration-300 cursor-pointer ${
              isDarkMode
                ? "border-gray-700 bg-gray-900"
                : "border-gray-300 bg-gray-50"
            }`}
            whileHover={{
              y: -8,
              borderColor: "#2563eb",
              boxShadow: "0 0 15px rgba(37, 99, 235, 0.4)",
            }}
            data-aos="zoom-in"
            data-aos-duration="1100"
          >
            <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {stat.value}
            </h2>
            <p className="mt-2">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* filter buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-16 px-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === cat
                ? "bg-blue-600 text-white shadow-lg"
                : isDarkMode
                ? "bg-gray-800 text-gray-300 hover:bg-blue-500 hover:text-white"
                : "bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* define the projects grid */}
      <div className="max-w-6xl mx-auto px-6 grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <motion.div
            key={project.id}
            className={`group rounded-2xl overflow-hidden border shadow-md hover:shadow-xl transition-all duration-500 ${
              isDarkMode
                ? "bg-gray-900 border-gray-700"
                : "bg-white border-gray-200"
            }`}
            whileHover={{ y: -5 }}
            data-aos="fade-up"
            data-aos-duration="2000"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
                {project.title}
              </h3>
              <p className="mb-4">{project.description}</p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 dark:text-blue-400 font-medium hover:underline"
              >
                View Project →
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* cta section */}
      <motion.div
        className={`max-w-4xl mx-auto mt-24 mb-0 p-8 sm:p-10 rounded-2xl border shadow-lg text-center transition-all duration-500 ${
          isDarkMode
            ? "bg-gray-900 border-gray-700"
            : "bg-gray-50 border-gray-200"
        }`}
        whileHover={{
          y: -10,
          borderColor: "#2563eb",
          boxShadow: "0 0 20px rgba(37, 99, 235, 0.4)",
        }}
      >
        <FaGithub className="mx-auto text-5xl text-blue-600 dark:text-blue-400 mb-4" />
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-blue-600 dark:text-blue-400">
          Explore More Projects on GitHub
        </h2>
        <p className="mb-6 leading-relaxed px-2 sm:px-6">
          My projects cover data science, machine learning, backend development, and software engineering. Explore more of my projects and contributions.
        </p>
        <a
          href="https://github.com/TolaniSilas"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-xl font-semibold transition transform hover:-translate-y-1 hover:shadow-lg"
        >
          Visit My GitHub
        </a>
      </motion.div>
    </div>
  );
};

export default ProjectsPage;
