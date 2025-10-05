import { useCallback, useRef, useState, useEffect } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import {FaEnvelope, FaGithub, FaClock, FaLinkedin, FaUser, FaTag, FaRegCommentDots, FaTelegramPlane} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [subject, setSubject] = useState("");
  const [customSubject, setCustomSubject] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect dark mode toggle dynamically.
  useEffect(() => {
    const html = document.documentElement;
    const observer = new MutationObserver(() => {
      setIsDarkMode(html.classList.contains("dark"));
    });
    observer.observe(html, { attributes: true, attributeFilter: ["class"] });
    setIsDarkMode(html.classList.contains("dark"));
    return () => observer.disconnect();
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "osunba_silas",
        "osunba_silas_template",
        formRef.current,
        "ZO_6gkFmGFacWDao-"
      )
      .then(
        () => {
          setStatus("✅ Message sent successfully!");
          setLoading(false);
          formRef.current.reset();
          setSubject("");
          setCustomSubject("");
        },
        (error) => {
          setStatus("❌ Failed to send. Try again.");
          setLoading(false);
          console.error(error);
        }
      );
  };

  return (
    <div
      className={`relative min-h-screen flex items-center justify-center px-6 py-20 
      transition-colors duration-700 overflow-hidden
      ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}
    >
      {/* Background Particles */}
      <div className="absolute inset-0 -z-10">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: { color: { value: "transparent" } },
            fpsLimit: 120,
            interactivity: {
              events: { onHover: { enable: true, mode: "repulse" } },
              modes: { repulse: { distance: 100, duration: 0.4 } },
            },
            particles: {
              color: { value: isDarkMode ? "#cbf20d" : "#7c3aed" },
              links: {
                color: isDarkMode ? "#cbf20d" : "#7c3aed",
                distance: 150,
                enable: true,
                opacity: 0.4,
              },
              move: { enable: true, speed: 1, direction: "none", outModes: "out" },
              number: { value: 60, density: { enable: true, area: 800 } },
              opacity: { value: 0.5 },
              shape: { type: "circle" },
              size: { value: { min: 1, max: 4 } },
            },
            detectRetina: true,
          }}
        />
      </div>

      {/* Wrapper */}
      <div className="max-w-6xl w-full relative z-10">
        <div className="text-center mb-16 mt-14">
          <h2 className="text-4xl font-bold text-blue-600 mb-4">Get In Touch</h2>
          <p className="text-lg max-w-2xl mx-auto">
            I'm always open to exploring new opportunities and collaborations.
            Let's build something extraordinary together!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          
          {/* Left: Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Let's Connect</h3>
            <p className="mb-8">
              Whether you have a project proposal, a collaboration idea, or simply wish
              to connect, I'd be delighted to hear from you. I usually respond within
              24 hours.
            </p>

            <div className="space-y-6 lg:space-y-10">
              {/* Email */}
              <div className="flex items-center p-4 rounded-xl border border-gray-300 dark:border-gray-700 hover:border-blue-600 transition transform hover:-translate-y-2 hover:shadow-lg duration-300 ease-in-out space-x-6">
                <FaEnvelope className="text-3xl text-blue-600"/>
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p>osunbasilas@gmail.com</p>
                  <small className="text-gray-500 dark:text-gray-400">
                    Best for project inquiries and collaborations
                  </small>
                </div>
              </div>

              {/* GitHub */}
              <div className="flex items-center p-4 rounded-xl border border-gray-300 dark:border-gray-700 hover:border-blue-600 transition transform hover:-translate-y-2 hover:shadow-lg duration-300 ease-in-out space-x-6">
                <FaGithub className="text-3xl text-blue-600"/>
                <div>
                  <h4 className="font-semibold">GitHub</h4>
                  <p>github.com/TolaniSilas</p>
                  <small className="text-gray-500 dark:text-gray-400">
                    Code collaboration, versioning, and open source
                  </small>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="flex items-center p-4 rounded-xl border border-gray-300 dark:border-gray-700 hover:border-blue-600 transition transform hover:-translate-y-2 hover:shadow-lg duration-300 ease-in-out space-x-6">
                <FaLinkedin className="text-3xl text-blue-600"/>
                <div>
                  <h4 className="font-semibold">LinkedIn</h4>
                  <p>linkedin.com/in/osunbasilas/</p>
                  <small className="text-gray-500 dark:text-gray-400">
                    Professional networking and career updates
                  </small>
                </div>
              </div>

              {/* X (Twitter) */}
              <div className="flex items-center p-4 rounded-xl border border-gray-300 dark:border-gray-700 hover:border-blue-600 transition transform hover:-translate-y-2 hover:shadow-lg duration-300 ease-in-out space-x-6">
                <FaXTwitter className="text-3xl text-blue-600"/>
                <div>
                  <h4 className="font-semibold">X (formerly Twitter)</h4>
                  <p>@thaguymaxx</p>
                  <small className="text-gray-500 dark:text-gray-400">
                    Interesting tech discussions and updates
                  </small>
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-center p-4 rounded-xl border border-gray-300 dark:border-gray-700 hover:border-blue-600 transition transform hover:-translate-y-2 hover:shadow-lg duration-300 ease-in-out space-x-6">
                <FaClock className="text-3xl text-blue-600"/>
                <div>
                  <h4 className="font-semibold">Availability</h4>
                  <small className="text-gray-500 dark:text-gray-400">
                    I'm available around the clock for project collaborations.
                    Please don't hesitate to get in touch!
                  </small>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div
            className={`p-6 rounded-xl shadow-lg border transition-colors duration-500
            ${isDarkMode
              ? "bg-gray-900 border-gray-700"
              : "bg-gray-100 border-gray-300"
            } w-full sm:max-w-full md:max-w-[640px] lg:max-w-[740px] mx-auto`}
          >
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>

            <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium mb-2">Name *</label>
                  <div className="flex items-center bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-xl">
                    <FaUser className="text-gray-500 ml-3" />
                    <input
                      type="text"
                      name="from_name"
                      placeholder="Your full name"
                      className="w-full p-3 bg-transparent rounded-xl focus:outline-none text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <div className="flex items-center bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-xl">
                    <FaEnvelope className="text-gray-500 ml-3" />
                    <input
                      type="email"
                      name="from_email"
                      placeholder="your.email@gmail.com"
                      className="w-full p-3 bg-transparent rounded-xl focus:outline-none text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Subject Dropdown */}
              <div>
                <label className="block text-sm font-medium mb-2">Subject *</label>
                <div className="flex items-center bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-xl relative">
                  <FaTag className="text-gray-500 ml-3" />
                  <select
                    name="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-3 bg-transparent appearance-none rounded-xl focus:outline-none text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="Project Inquiry">Project Inquiry</option>
                    <option value="Collaboration Opportunity">Collaboration Opportunity</option>
                    <option value="Speaking Engagement">Speaking Engagement</option>
                    <option value="General Question">General Question</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Other">Other (Custom Subject)</option>
                  </select>
                </div>
              </div>

              {/* Custom Subject */}
              {subject === "Other" && (
                <div>
                  <label className="block text-sm font-medium mb-2">Custom Subject *</label>
                  <div className="flex items-center bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-xl">
                    <FaTag className="text-gray-500 ml-3" />
                    <input
                      type="text"
                      name="custom_subject"
                      placeholder="Enter your custom subject"
                      className="w-full p-3 bg-transparent rounded-xl focus:outline-none text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      value={customSubject}
                      onChange={(e) => setCustomSubject(e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}

              {/* Message */}
              <div>
                <label className="block text-sm font-medium mb-2">Message *</label>
                <div className="flex items-start bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-xl">
                  <FaRegCommentDots className="text-gray-500 ml-3 mt-3" />
                  <textarea
                    name="message"
                    rows="5"
                    placeholder="Tell me about your project, research, or any questions you may have..."
                    className="w-full p-3 bg-transparent rounded-xl focus:outline-none text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    required
                  ></textarea>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-start">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-xl font-semibold transition transform hover:-translate-y-1 hover:shadow-lg duration-300 ease-in-out"
                >
                  {loading ? "Sending..." : (
                    <>
                      <span>Send Message</span>
                      <FaTelegramPlane className="text-white text-lg" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {status && (
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">{status}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
