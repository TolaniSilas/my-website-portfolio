import React, { useState, useEffect } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

// ---- Slideshow Images (add your lab pictures into /public/lab/ folder) ----
const labImages = [
  { src: "/lab/lab1.jpg", alt: "In the lab working on experiments" },
  { src: "/lab/lab2.jpg", alt: "Team discussion during lab research" },
  { src: "/lab/lab3.jpg", alt: "Testing experimental setup" },
  { src: "/lab/lab4.jpg", alt: "Analyzing results with instruments" },
];

// ---- Research Projects ----
const researchProjects = [
  {
    title:
      "Predicting Proton Exchange Membrane Fuel Cell Performance through Advanced Machine Learning Techniques: A Comparative Analysis of Ensemble Techniques",
    affiliation: "Engineering.Fit() Laboratory, Lagos State University",
    description:
      "Proton exchange membrane fuel cells (PEMFCs) are a key player in the conversion of hydrogen energy and are important for the realization of a clean society. However, their cost and performance have yet to meet the demand for widespread adoption. Therefore, this research aims to deepen our understanding of PEMFCs performance by exploring the complex association between different operational factors and the real part of impedance (z_real). The primary objective is to predict z_real based on a comprehensive set of input variables, utilizing advanced machine learning techniques. Unlike previous studies leveraging machine learning for similar predictions, this study undertook a rigorous comparative analysis of ensemble techniques.",
  },
  {
    title: "Using Convolutional Neural Network for the Detection of Offshore and Onshore Oil Spills",
    affiliation: "Engineering.Fit() Laboratory, Lagos State University",
    description:
      "Oil spills present significant environmental, economic, and health challenges, requiring effective and sophisticated monitoring and detection methods. Traditional techniques, such as field investigations and remote sensing, are expensive and often lack the speed and scalability required for real-time detection. This study proposes a novel approach for oil spill detection using convolutional neural networks (CNNs) deployed on edge devices, especially on mobile phones. Leveraging pre-trained models such as EfficientNet-Lite1, MobileNetV2, and ResNet50, the prediction layers were fine-tuned using domain-specific data. The EfficientNet-Lite1 model achieved the highest accuracy of 99.9%, followed closely by MobileNetV2 with 99.1%. Post-training optimization techniques, such as float16 quantization, were applied to reduce model size and optimize inference speed.",
  },
  {
    title: "Electric Vehicles vs. Biofuels: A Review of Decarbonization in Transportation",
    affiliation: "Lagos State University & Obafemi Awolowo University",
    description:
      "The transportation sector is one of the greatest contributors to global greenhouse gas emissions, making its decarbonization an imperative step toward achieving climate goals. This study conducts a comparative literature review of two major pathways to decarbonizing transportation: electric vehicles (EVs) and biofuels. This review evaluates these technologies across three dimensions: carbon savings, economic feasibility, and regional adoption. Findings indicate that EVs offer strong long-term benefits, especially when powered by renewable energy, but face current limitations such as battery production emissions, charging infrastructure development, and electricity grid dependency. In contrast, biofuels serve as a practical short-term option, particularly in areas with existing fuel-based vehicle systems, though they raise sustainability concerns related to land use and food supply.",
  },
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

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % labImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 dark:text-white">
      {/* Page Header */}
      <header className="text-center mb-16 pt-20">
        <h1 className="text-4xl font-bold mb-4">Research</h1>
        <p className="text-lg max-w-3xl mx-auto">
          Machine Learning | Energy | Data Science
        </p>
        <p className="mt-4 max-w-2xl mx-auto">
          I'm on a mission of building machines that learns intelligently just as humans.
        </p>
        <div className="mt-6">
          <a
            href="https://scholar.google.com/citations?user=akIRrWwAAAAJ&hl=en"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Scholar <FaExternalLinkAlt className="ml-2" />
          </a>
        </div>
      </header>

      {/* Lab Experience Slideshow */}
      <section className="mb-16">
        <div className="flex justify-center mb-8">
          <h2 className="relative text-2xl font-bold text-white bg-blue-600 px-8 py-3 rounded-2xl shadow-lg">
            My Research Journey and Interests
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-blue-400 rounded-full"></span>
          </h2>
        </div>

        <p>
          Research, as the word implies, is the practical art of re-exploring what has been previously known or unknown. This could result from sheer curiosity or intuition.
          It is a quest to discover how things can be improved or to find a new and efficient method of performing a task.
        </p> 
        <br />

        {/* Slideshow */}
        <div className="relative w-full max-w-4xl mx-auto">
          <img
            src={labImages[currentIndex].src}
            alt={labImages[currentIndex].alt}
            className="w-full h-80 object-cover rounded-xl shadow-lg transition duration-700"
          />
          <p className="mt-3 text-center text-sm text-gray-600 dark:text-gray-400">
            {labImages[currentIndex].alt}
          </p>

          {/* Dots */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {labImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition ${
                  index === currentIndex
                    ? "bg-blue-600 scale-125"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              ></button>
            ))}
          </div>
        </div>

        <p className="mt-12">
          My research journey started when I was in my third year as a student, where I had the opportunity to work as a Student Research Intern at the Department of
          Electronic & Computer Engineering, Lagos State University, under the supervision and guidance of Dr. M. A. Adedoyin. Her guidance paved the way for my discovery
          of professional research, which differs from merely exploring without proper documentation.
        </p>
        <br />
        <p>
          My interests are predominantly in{" "}
          <span className="font-semibold text-blue-600">Machine Learning, Embodied AI, and Energy</span>. I want to build machines that learn
          efficiently and intelligently, integrate artificial intelligence into physical systems to enable them to interact with the physical world, and design energy-efficient
          systems that promote a net-zero and sustainable world.
        </p>

        <h2 className="text-2xl font-bold mb-6 text-center mt-12">
          Lab Experience
        </h2>
      </section>

      {/* Research Projects */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Research Projects
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {researchProjects.map((proj, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="text-lg font-bold mb-2">{proj.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 italic">
                {proj.affiliation}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                {proj.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Publications */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Publications & Presentations
        </h2>
        <ul className="space-y-4 list-disc list-inside text-gray-700 dark:text-gray-300">
          {publications.map((pub, idx) => (
            <li key={idx}>
              {pub.link ? (
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {pub.citation}
                </a>
              ) : (
                <span>{pub.citation}</span>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ResearchPage;
