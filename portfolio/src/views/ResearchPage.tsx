"use client";

import { publications } from "../data/publications";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaExternalLinkAlt } from "react-icons/fa";
import labphoto1 from "../assets/images/lab1.webp";
import labphoto2 from "../assets/images/lab2.webp";
import labresult1 from "../assets/images/result1.webp";
import labresult2 from "../assets/images/result2.webp";
import robotimage from "../assets/images/robot-image.webp";

const labImages = [
  { src: labphoto1.src, alt: "In the lab working on Amplitude and Frequency Modulation (AM & FM) experiment" },
  { src: labphoto2.src, alt: "Team discussion during the lab research" },
  { src: labresult1.src, alt: "Displaying the modulated FM signal" },
  { src: labresult2.src, alt: "Analyzing the experimental results with the aid of an oscilloscope" },
];

const ResearchPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % labImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <header
        className="relative mb-16 flex h-[60vh] w-full items-center justify-center overflow-hidden sm:h-[70vh] lg:h-[80vh]"
        data-aos="zoom-in-down"
      >
        <img src={robotimage.src} alt="Research Hero" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-canvas-dark/65" />
        <div className="relative z-10 flex flex-col items-center px-6 text-center">

          <h1 className="font-display mb-4 text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">
            Research
          </h1>
          <p className="mb-3 text-sm font-medium text-gold sm:text-lg">
            Machine Learning · Energy · Data Science
          </p>
          <p className="mx-auto max-w-2xl text-sm text-white/85 sm:text-base lg:text-lg">
            Building machines that learn intelligently, the way people do.
          </p>
          <a
            href="https://scholar.google.com/citations?user=akIRrWwAAAAJ&hl=en"
            className="mt-6 inline-flex items-center text-sm font-semibold text-white underline decoration-gold/70 underline-offset-4 hover:text-gold sm:text-base"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Scholar <FaExternalLinkAlt className="ml-2 text-xs" />
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6">
        <section className="mb-16">

          <h2 className="section-title mb-8 text-center" data-aos="fade-up">
            Voyage and Interests
          </h2>
          <p className="mb-8 text-muted dark:text-muted-dark" data-aos="fade-right">
            Research is the practical art of re-exploring what is known, or exploring the unknown. It may
            stem from curiosity or intuition — a quest to improve how things work, or to find more efficient
            ways of doing them. If you can sense the gap, why not try to fill it?
          </p>

          <div className="relative mx-auto w-full max-w-5xl">
            <div
              className="relative h-[300px] overflow-hidden rounded-2xl sm:h-[400px] md:h-[500px] lg:h-[550px]"
              data-aos="fade-up"
            >
              <img
                src={labImages[currentIndex].src}
                alt={labImages[currentIndex].alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <p className="mt-3 text-center text-sm text-muted dark:text-muted-dark">
              {labImages[currentIndex].alt}
            </p>
            <div className="mt-3 flex justify-center space-x-2">
              {labImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    index === currentIndex ? "scale-125 bg-accent" : "bg-line dark:bg-line-dark"
                  }`}
                />
              ))}
            </div>
          </div>

          <p className="mt-12 text-muted dark:text-muted-dark" data-aos="fade-left">
            My research voyage began in my third year as a student intern in the Department of Electronic
            & Computer Engineering at Lagos State University, under Dr. M.A. Adedoyin. Her guidance
            introduced me to professional research — exploration with rigorous documentation.
          </p>
          <p className="mt-6 text-muted dark:text-muted-dark" data-aos="fade-right">
            My interests are predominantly in{" "}
            <span className="font-semibold text-accent dark:text-gold">
              Autonomous Systems, Robot Learning, Embodied AI, and Trustworthy AI
            </span>
            . I want to build machines that learn efficiently and integrate intelligence into physical
            systems that interact with the world.
          </p>
        </section>
      </div>

      <section className="w-full border-y border-line bg-surface py-16 dark:border-line-dark dark:bg-surface-dark">
        <div className="mx-auto max-w-6xl px-6">

          <h2 className="section-title mb-10 text-center">Publications</h2>
          <ul className="mx-auto max-w-4xl space-y-6" data-aos="fade-up">
            {publications.map((pub) => (
              <li key={pub.link} className="card-surface p-6 text-sm leading-relaxed sm:text-base">
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink transition hover:text-accent dark:text-ink-dark dark:hover:text-gold"
                >
                  {pub.citation}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ResearchPage;
