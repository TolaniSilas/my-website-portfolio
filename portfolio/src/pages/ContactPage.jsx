import { useCallback, useRef, useState } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { 
  FaEnvelope, FaGithub, FaClock, FaLinkedin, 
  FaUser, FaTag, FaRegCommentDots, FaTelegramPlane 
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; // ✅ new X icon
import emailjs from "@emailjs/browser";

export default function Contact() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "osunba_silas", // ✅ EmailJS service ID
        "osunba_silas_template", // ✅ EmailJS template ID
        formRef.current,
        "ZO_6gkFmGFacWDao-" // ✅ EmailJS public key
      )
      .then(
        () => {
          setStatus("✅ Message sent successfully!");
          setLoading(false);
          formRef.current.reset();
        },
        (error) => {
          setStatus("❌ Failed to send. Try again.");
          setLoading(false);
          console.error(error);
        }
      );
  };

  return (
    <div className="relative min-h-screen bg-black text-white flex items-center justify-center px-6 py-20">
      {/* Background Particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: "#000" },
          fpsLimit: 120,
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" } },
            modes: { repulse: { distance: 100 } },
          },
          particles: {
            color: { value: "#ffffff" },
            links: { color: "#ffffff", distance: 150, enable: true, opacity: 0.2 },
            move: { enable: true, speed: 1 },
            number: { value: 50 },
            opacity: { value: 0.3 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 4 } },
          },
        }}
        className="absolute inset-0 -z-10"
      />

      {/* Wrapper */}
      <div className="max-w-6xl w-full">
        {/* Section Intro */}
        <div className="text-center mb-20 mt-10">
          <h2 className="text-4xl font-bold text-purple-500 mb-4">Get In Touch</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            I'm always interested in new opportunities and collaborations. 
            Let's create something amazing together!
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left: Contact Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Let's Connect</h3>
            <p className="mb-8 text-gray-300">
              Whether you have a project idea, want to collaborate, or just want to say
              hello, I'd love to hear from you. I typically respond within 24 hours.
            </p>

            {/* Info Cards */}
            <div className="space-y-6 lg:space-y-10">
              {/* Email */}
              <div className="flex items-center p-4 rounded-xl border border-gray-700 hover:border-purple-500 transition transform hover:-translate-y-2 hover:shadow-lg 
              duration-300 ease-in-out space-x-6">
                <FaEnvelope className="text-3xl text-purple-500" />
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p>osunbasilas@gmail.com</p>
                  <small className="text-gray-400">
                    Best for project inquiries and collaborations
                  </small>
                </div>
              </div>

              {/* GitHub */}
              <div className="flex items-center p-4 rounded-xl border border-gray-700 hover:border-purple-500 transition transform hover:-translate-y-2 hover:shadow-lg 
              duration-300 ease-in-out space-x-6">
                <FaGithub className="text-3xl text-purple-500" />
                <div>
                  <h4 className="font-semibold">GitHub</h4>
                  <p>github.com/TolaniSilas</p>
                  <small className="text-gray-400">
                    Code collaboration, versioning, and open source
                  </small>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="flex items-center p-4 rounded-xl border border-gray-700 hover:border-purple-500 transition transform hover:-translate-y-2 hover:shadow-lg 
              duration-300 ease-in-out space-x-6">
                <FaLinkedin className="text-3xl text-purple-500" />
                <div>
                  <h4 className="font-semibold">LinkedIn</h4>
                  <p>linkedin.com/in/osunbasilas/</p>
                  <small className="text-gray-400">
                    Professional networking and career updates
                  </small>
                </div>
              </div>

              {/* X (Twitter) */}
              <div className="flex items-center p-4 rounded-xl border border-gray-700 hover:border-purple-500 transition transform hover:-translate-y-2 hover:shadow-lg 
              duration-300 ease-in-out space-x-6">
                <FaXTwitter className="text-3xl text-purple-500" />
                <div>
                  <h4 className="font-semibold">X (formerly Twitter)</h4>
                  <p>@thaguymaxx</p>
                  <small className="text-gray-400">
                    Tech discussions and updates
                  </small>
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-center p-4 rounded-xl border border-gray-700 hover:border-purple-500 transition transform hover:-translate-y-2 hover:shadow-lg 
              duration-300 ease-in-out space-x-6">
                <FaClock className="text-3xl text-purple-500" />
                <div>
                  <h4 className="font-semibold">Availability</h4>
                  <small className="text-gray-400">
                    I'm available 24/7 to contribute to projects. Feel free to reach out!
                  </small>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-700 
                          w-full sm:max-w-full md:max-w-[600px] lg:max-w-[700px] mx-auto">
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>

            <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center bg-black border border-gray-700 rounded-xl 
                                  hover:border-purple-500 focus-within:ring-2 
                                  focus-within:ring-purple-500 transition">
                    <FaUser className="text-gray-500 ml-3" />
                    <input
                      type="text"
                      name="from_name"
                      placeholder="Your full name"
                      className="w-full p-3 bg-black rounded-xl focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center bg-black border border-gray-700 rounded-xl 
                                  hover:border-purple-500 focus-within:ring-2 
                                  focus-within:ring-purple-500 transition">
                    <FaEnvelope className="text-gray-500 ml-3" />
                    <input
                      type="email"
                      name="from_email"
                      placeholder="your.email@example.com"
                      className="w-full p-3 bg-black rounded-xl focus:outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center bg-black border border-gray-700 rounded-xl 
                                hover:border-purple-500 focus-within:ring-2 
                                focus-within:ring-purple-500 transition">
                  <FaTag className="text-gray-500 ml-3" />
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    className="w-full p-3 bg-black rounded-xl focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <div className="flex items-start bg-black border border-gray-700 rounded-xl 
                                hover:border-purple-500 focus-within:ring-2 
                                focus-within:ring-purple-500 transition">
                  <FaRegCommentDots className="text-gray-500 ml-3 mt-3" />
                  <textarea
                    name="message"
                    rows="5"
                    placeholder="Tell me about your project..."
                    className="w-full p-3 bg-black rounded-xl focus:outline-none"
                    required
                  ></textarea>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-start">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-xl font-semibold transition 
                  transform hover:-translate-y-1 hover:shadow-lg duration-300 ease-in-out">
                  {loading ? "Sending..." : (
                    <>
                      <span>Send Message</span>
                      <FaTelegramPlane className="text-white text-lg" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Status Message */}
            {status && <p className="mt-4 text-sm text-gray-400">{status}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
