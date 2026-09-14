"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import {
  FaClock,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaRegCommentDots,
  FaTag,
  FaTelegramPlane,
  FaUser,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import emailjs from "@emailjs/browser";
import { useTheme } from "../context/theme";

export default function ContactPage() {
  const { isDark } = useTheme();
  const formRef = useRef<HTMLFormElement>(null);
  const [engineReady, setEngineReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [subject, setSubject] = useState("");
  const [customSubject, setCustomSubject] = useState("");

  useEffect(() => {
    void initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setEngineReady(true));
  }, []);

  const sendEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formRef.current) return;
    setLoading(true);

    emailjs
      .sendForm("osunba_silas", "osunba_silas_template", formRef.current, "ZO_6gkFmGFacWDao-")
      .then(
        () => {
          setStatus("Message sent successfully.");
          setLoading(false);
          formRef.current?.reset();
          setSubject("");
          setCustomSubject("");
        },
        () => {
          setStatus("Failed to send. Please try again.");
          setLoading(false);
        },
      );
  };

  const particleColor = isDark ? "#c4a574" : "#0f766e";

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-28">
      {engineReady && (
        <div className="absolute inset-0 -z-10">
          <Particles
            id="tsparticles"
            options={{
              background: { color: { value: "transparent" } },
              fpsLimit: 120,
              interactivity: {
                events: { onHover: { enable: true, mode: "repulse" } },
                modes: { repulse: { distance: 100, duration: 0.4 } },
              },
              particles: {
                color: { value: particleColor },
                links: {
                  color: particleColor,
                  distance: 150,
                  enable: true,
                  opacity: 0.35,
                },
                move: { enable: true, speed: 1, direction: "none", outModes: "out" },
                number: { value: 50, density: { enable: true, width: 800, height: 800 } },
                opacity: { value: 0.45 },
                shape: { type: "circle" },
                size: { value: { min: 1, max: 3 } },
              },
              detectRetina: true,
            }}
          />
        </div>
      )}

      <div className="relative z-10 w-full max-w-6xl">
        <div className="mb-16 text-center">
          <p className="section-kicker">Contact</p>
          <h2 className="section-title mb-4">Get in Touch</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted dark:text-muted-dark">
            Open to opportunities, collaborations, and conversations. I usually respond within 24 hours.
          </p>
        </div>

        <div className="grid items-start gap-16 md:grid-cols-2">
          <div>
            <h3 className="font-display mb-4 text-2xl">Let&apos;s connect</h3>
            <p className="mb-8 text-muted dark:text-muted-dark">
              Whether you have a project proposal, a collaboration idea, or simply wish to connect,
              I&apos;d be glad to hear from you.
            </p>
            <div className="space-y-5">
              {[
                {
                  icon: FaEnvelope,
                  title: "Email",
                  body: "osunbasilas@gmail.com",
                  note: "Best for project inquiries and collaborations",
                },
                {
                  icon: FaGithub,
                  title: "GitHub",
                  body: "github.com/TolaniSilas",
                  note: "Code, versioning, and open source",
                },
                {
                  icon: FaLinkedin,
                  title: "LinkedIn",
                  body: "linkedin.com/in/osunbasilas/",
                  note: "Professional networking",
                },
                {
                  icon: FaXTwitter,
                  title: "X",
                  body: "@thaguymaxx",
                  note: "Tech discussions and updates",
                },
                {
                  icon: FaClock,
                  title: "Availability",
                  body: "Open for collaboration",
                  note: "Please don't hesitate to get in touch.",
                },
              ].map((item) => (
                <div key={item.title} className="card-surface flex items-center space-x-5 p-4">
                  <item.icon className="text-2xl text-accent dark:text-gold" />
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p>{item.body}</p>
                    <small className="text-muted dark:text-muted-dark">{item.note}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-surface w-full p-6 sm:p-8">
            <h3 className="font-display mb-6 text-2xl">Send a message</h3>
            <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="from_name" className="mb-2 block text-sm font-medium">Name *</label>
                  <div className="flex items-center rounded-xl border border-line bg-canvas dark:border-line-dark dark:bg-canvas-dark">
                    <FaUser className="ml-3 text-muted" />
                    <input
                      type="text"
                      id="from_name" name="from_name"
                      placeholder="Your full name"
                      className="w-full rounded-xl bg-transparent p-3 outline-none placeholder:text-muted"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="from_email" className="mb-2 block text-sm font-medium">Email *</label>
                  <div className="flex items-center rounded-xl border border-line bg-canvas dark:border-line-dark dark:bg-canvas-dark">
                    <FaEnvelope className="ml-3 text-muted" />
                    <input
                      type="email"
                      id="from_email" name="from_email"
                      placeholder="your.email@gmail.com"
                      className="w-full rounded-xl bg-transparent p-3 outline-none placeholder:text-muted"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="mb-2 block text-sm font-medium">Subject *</label>
                <div className="flex items-center rounded-xl border border-line bg-canvas dark:border-line-dark dark:bg-canvas-dark">
                  <FaTag className="ml-3 text-muted" />
                  <select
                    id="subject" name="subject"
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                    className="w-full appearance-none rounded-xl bg-transparent p-3 outline-none"
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

              {subject === "Other" && (
                <div>
                  <label htmlFor="custom_subject" className="mb-2 block text-sm font-medium">Custom Subject *</label>
                  <div className="flex items-center rounded-xl border border-line bg-canvas dark:border-line-dark dark:bg-canvas-dark">
                    <FaTag className="ml-3 text-muted" />
                    <input
                      type="text"
                      id="custom_subject" name="custom_subject"
                      placeholder="Enter your custom subject"
                      className="w-full rounded-xl bg-transparent p-3 outline-none placeholder:text-muted"
                      value={customSubject}
                      onChange={(event) => setCustomSubject(event.target.value)}
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium">Message *</label>
                <div className="flex items-start rounded-xl border border-line bg-canvas dark:border-line-dark dark:bg-canvas-dark">
                  <FaRegCommentDots className="mt-3 ml-3 text-muted" />
                  <textarea
                    id="message" name="message"
                    rows={5}
                    placeholder="Tell me about your project, research, or question..."
                    className="w-full rounded-xl bg-transparent p-3 outline-none placeholder:text-muted"
                    required
                  />
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn-primary">
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <FaTelegramPlane />
                  </>
                )}
              </button>
            </form>
            {status && <p role="status" className="mt-4 text-sm text-muted dark:text-muted-dark">{status}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
