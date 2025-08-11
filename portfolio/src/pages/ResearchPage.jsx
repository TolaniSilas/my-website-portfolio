import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

const researchProjects = [
  {
    title: "Predicting Proton Exchange Membrane Fuel Cell Performance through Advanced Machine Learning Techniques: A Comparative Analysis of Ensemble Techniques",
    affiliation: "Engineering.Fit() Laboratory, Lagos State University",
    description: "Proton exchange membrane fuel cells (PEMFCs) are a key player in the conversion of hydrogen energy and are important for the realization of a clean society. However, their cost and performance have yet to meet the demand for widespread adoption. Therefore, this research aims to deepen our understanding of PEMFCs performance by exploring the complex association between different operational factors and the real part of impedance (z_real). The primary objective is to predict z_real based on a comprehensive set of input variables, utilizing advanced machine learning techniques. Unlike previous studies leveraging machine learning for similar predictions, this study undertook a rigorous comparative analysis of ensemble techniques. Ensemble techniques, well-known for their ability in improving predictive accuracy by combining multiple models, offer a promising possibility for achieving more robust predictions of z_real.",
  },
  {
    title: "Using Convolutional Neural Network for the Detection of Offshore and Onshore Oil Spills",
    affiliation: "Engineering.Fit() Laboratory, Lagos State University",
    description: "Oil spills presents significant environmental, economic, and health challenges, requiring effective and sophisticated monitoring and detection methods. Traditional techniques, such as field investigations and remote sensing, are expensive and often lack the speed and scalability required for real-time detection. This study proposes a novel approach for oil spill detection using convolutional neural networks (CNNs) deployed on edge devices, especially on mobile phones. Leveraging pre-trained models such as EfficientNet-Lite1, MobileNetV2, and ResNet50, the prediction layers were fine-tuned using domain-specific data. The EfficientNet-Lite1 model achieved the highest accuracy of 99.9%, followed closely by MobileNetV2 with 99.1%. Post-training optimization techniques, such as float16 quantization, were applied to reduce model size and optimize inference speed.",
  },
  {
    title: "Electric Vehicles vs. Biofuels: A Review of Decarbonization in Transportation",
    affiliation: "Lagos State University & Obafemi Awolowo University",
    description: "The transportation sector is one of the greatest contributors to global greenhouse gas emissions, making its decarbonization an imperative step toward achieving climate goals. This study conducts a comparative literature review of two major pathways to decarbonizing transportation: electric vehicles (EVs) and biofuels. This review evaluates these technologies across three dimensions: carbon savings, economic feasibility, and regional adoption. Findings indicate that EVs offer strong long-term benefits, especially when powered by renewable energy, but face current limitations such as battery production emissions, charging infrastructure development, and electricity grid dependency. In contrast, biofuels serve as a practical short-term option, particularly in areas with existing fuel-based vehicle systems, though they raise sustainability concerns related to land use and food supply.",
  },
];

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
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Page Header */}
      <header className="text-center mb-16 pt-20">
        <h1 className="text-4xl font-bold mb-4">Research</h1>
        <p className="text-lg max-w-3xl mx-auto">
          Machine Learning | Energy | Data Scientist
        </p>
        <p className="mt-4 max-w-2xl mx-auto">
          The need for clean energy and environmental sustainability are
          challenges facing the world. My focus lies in comprehending the
          conversion and storage of energy and applying this knowledge to
          develop innovative and environmentally sustainable solutions.
        </p>
        <div className="mt-4">
          <a
            href="https://scholar.google.com"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Scholar <FaExternalLinkAlt className="ml-2" />
          </a>
        </div>
      </header>

      {/* Research Projects */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Research Projects</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {researchProjects.map((proj, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold mb-2 text-gray-500 dark:text-gray-400">{proj.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 italic">
                {proj.affiliation}
              </p>
              <p className="text-gray-700 dark:text-gray-300">{proj.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Publications */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Publications & Presentations</h2>
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
