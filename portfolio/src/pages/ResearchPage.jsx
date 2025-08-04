import React from "react";
import { FaFilePdf, FaGithub, FaExternalLinkAlt } from "react-icons/fa";

// Example research data
const researchItems = [
  {
    id: 1,
    title: "Modeling and Simulation of PEM Fuel Cells",
    description:
      "This study focuses on the performance modeling of Proton Exchange Membrane Fuel Cells (PEMFC) using MATLAB/Simulink.",
    link: "https://github.com/TolaniSilas/pemfc-research",
    type: "GitHub",
  },
  {
    id: 2,
    title: "Shear Stress and Thermal Distortion in Aluminium Rolling",
    description:
      "Finite element analysis of aluminium hot rolling process using ANSYS Workbench.",
    link: "/docs/shear-stress-thermal-distortion.pdf",
    type: "PDF",
  },
  {
    id: 3,
    title: "Expert Systems for Medical Diagnosis",
    description:
      "Development of a MATLAB-based expert system for diagnosing fever-related illnesses.",
    link: "/blog/expert-system-fever-diagnosis",
    type: "Article",
  },
];

const ResearchPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Page Header */}
      <header className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">My Research</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          I actively engage in academic and technical research in renewable energy systems,
          image processing, and intelligent systems. Below are some highlights of my work.
        </p>
      </header>

      {/* Research Items */}
      <div className="grid md:grid-cols-2 gap-8">
        {researchItems.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-xl transition"
          >
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {item.description}
            </p>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
            >
              {item.type === "PDF" && <FaFilePdf />}
              {item.type === "GitHub" && <FaGithub />}
              {item.type === "Article" && <FaExternalLinkAlt />}
              View {item.type}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResearchPage;
