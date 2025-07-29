import React, { useState, useEffect, useRef } from "react";
import "./styles.css";
import { motion } from "framer-motion";
import {
  FaHtml5,
  FaMobileAlt,
  FaDatabase,
  FaServer,
  FaPhp
} from "react-icons/fa";
import emailjs from "@emailjs/browser";

export default function App() {
  const [dark, setDark] = useState(true);
  const formRef = useRef();
  const [visibleSkills, setVisibleSkills] = useState(false);

  // === SKILLS ===
  const skills = [
    {
      category: "Front-End",
      stack: "HTML / CSS",
      details: "Bootstrap / Tailwind / Sass",
      level: 95,
      icon: <FaHtml5 />
    },
    {
      stack: "JavaScript",
      details: "React / Vue / Angular / Next / Three.js",
      level: 95
    },
    {
      category: "Back-End",
      stack: "PHP",
      details: "Laravel / Symfony / Yii",
      level: 90,
      icon: <FaPhp />
    },
    {
      stack: "Node.js",
      details: "Express / Nest / Fastify",
      level: 95
    },
    {
      category: "Databases",
      stack: "SQL & NoSQL",
      details: "MySQL / PostgreSQL / MongoDB / Firebase",
      level: 85,
      icon: <FaDatabase />
    },
    {
      category: "DevOps",
      stack: "CI/CD & Cloud",
      details: "Docker / Kubernetes / AWS / Azure",
      level: 60,
      icon: <FaServer />
    },
    {
      category: "Mobile",
      stack: "JavaScript & Dart",
      details: "React Native / Flutter",
      level: 80,
      icon: <FaMobileAlt />
    }
  ];

  // === PROJECTS ===
  const projects = [
    {
      title: "1Check - Hotel & Facility Management SaaS",
      description:
        "An all-in-one SaaS solution for the hospitality and facility management industry, combining a web back-office and a cross-platform mobile app. The platform manages room reservations, housekeeping scheduling, maintenance tasks, and team coordination. Built with PHP/Yii, scalable MySQL database, real-time dashboards, and a Flutter mobile application for on-the-go task management. Fully containerized with Docker for continuous delivery and high availability.",
      tech: [
        "PHP / Yii",
        "HTML / CSS",
        "JavaScript / jQuery",
        "MySQL",
        "Docker",
        "Git",
        "Flutter",
        "Firebase"
      ],
      image: process.env.PUBLIC_URL + "/assets/1check.png",
      demo: "https://www.1check.com/",
      code: "private"
    },
    {
      title: "Hotel & Facility Management API (Swagger)",
      description:
        "A scalable RESTful API built for complex hotel and facility workflows including reservations, housekeeping scheduling, and maintenance tasks. Developed in PHP/Yii and fully documented with Swagger for seamless integration with PMS systems and mobile clients.",
      tech: ["Swagger", "PHP", "Yii"],
      image: process.env.PUBLIC_URL + "/assets/swagger.png",
      demo: "",
      code: "private"
    },
    {
      title: "Video Game - Animation & Game Mechanics",
      description:
        "A multiplayer prototype showcasing advanced animation blending and dynamic gameplay mechanics. Front-end built with React & TypeScript, Node.js/Express for server logic, and MySQL for persistent data. Real-time gameplay powered by Socket.IO and automated events handled via node-schedule.",
      tech: ["React - TS", "Node.js", "Express", "MySQL", "Socket.IO", "Node-Schedule", "CSS"],
      image: process.env.PUBLIC_URL + "/assets/ants.png",
      demo: "FourmiBlitz",
      code: "https://github.com/chrisDev06/FourmiBlitz"
    }
  ];

  // === Progress Bar Animation ===
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisibleSkills(true);
      },
      { threshold: 0.3 }
    );
    const target = document.querySelector(".skills-grid");
    if (target) observer.observe(target);
    return () => observer.disconnect();
  }, []);

  // === EmailJS ===
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE,
        process.env.REACT_APP_EMAILJS_TEMPLATE,
        formRef.current,
        process.env.REACT_APP_EMAILJS_PUBLIC
      )
      .then(
        () => alert("✅ Message sent successfully!"),
        () => alert("❌ Failed to send message")
      );
  };

  return (
    <div className={dark ? "app dark" : "app light"}>
      {/* HEADER */}
      <header className="header">
        <div className="logo">Portfolio</div>
        <nav>
          <a href="#hero">Home</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </nav>
        <button onClick={() => setDark(!dark)} className="theme-toggle">
          {dark ? "☀️" : "🌙"}
        </button>
      </header>

      {/* HERO */}
      <section className="hero" id="hero">
        <motion.h1 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          Christopher Masson
        </motion.h1>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          Web & Mobile Developer
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          Available for freelance missions and full-time positions
        </motion.p>
        <motion.a href="#contact" className="btn" whileHover={{ scale: 1.05 }}>
          Contact Me
        </motion.a>
      </section>

      {/* SKILLS */}
      <section className="services" id="skills">
        <h3>Skills</h3>
        <div className="skills-grid">
          {skills.map((skill, i) => (
            <div key={i} className="skill-card">
              <div className="skill-header">
                {skill.icon && <span className="skill-icon">{skill.icon}</span>}
                <strong>{skill.category}</strong>
              </div>
              <div className="skill-stack">{skill.stack}</div>
              {skill.details && <div className="skill-details">{skill.details}</div>}
              <div className="progress">
                <div
                  className="progress-bar"
                  style={{ width: visibleSkills ? `${skill.level}%` : "0%" }}
                >
                  {skill.level}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section className="portfolio" id="projects">
        <h3>Projects</h3>
        <div className="grid">
          {projects.map((proj, i) => (
            <motion.div
              key={i}
              className="card project-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <img src={proj.image} alt={proj.title} className="project-img" />
              <h4>{proj.title}</h4>
              <p>{proj.description}</p>
              <div className="tech-list">
                {proj.tech.map((t, idx) => (
                  <span key={idx} className="tech-badge">{t}</span>
                ))}
              </div>
              <div className="project-links">
                {proj.demo && (
                  <a href={proj.demo} target="_blank" rel="noreferrer" className="btn">
                    Demo
                  </a>
                )}
                {proj.code && proj.code !== "private" && (
                  <a href={proj.code} target="_blank" rel="noreferrer" className="btn secondary">
                    Code
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="experience" id="experience">
        <h3>Experience</h3>
        <ul>
          <li>
            <div className="exp-header">
              <img src={process.env.PUBLIC_URL + "/assets/1check.png"} alt="1Check" className="exp-logo" />
              <div>
                <b className="exp-date">2023 - 2026 :</b> MSc Pro Software Engineering
                <div className="exp-company">1Check</div>
              </div>
            </div>
            <span className="exp-role">Apprenticeship (Jan 2023 - Jul 2025)</span>
            <ul className="exp-details">
              <li>Developed and maintained REST APIs for booking and property management systems (PMS).</li>
              <li>Built real-time data synchronization between PMS and internal applications.</li>
              <li>Implemented advanced team management and scheduling modules.</li>
              <li>Designed 3D operational schematics for Corsica Ferries.</li>
            </ul>
          </li>

          <li>
            <div className="exp-header">
              <img src={process.env.PUBLIC_URL + "/assets/freelance.png"} alt="Freelance" className="exp-logo" />
              <div>
                <b className="exp-date">2023 - 2025 :</b> Freelance Web & Mobile Developer
                <div className="exp-company">Freelance Projects</div>
              </div>
            </div>
            <ul className="exp-details">
              <li>Delivered web and mobile solutions focused on scalability and user experience.</li>
              <li>Worked on full-stack applications using PHP/Laravel, Node.js, React, and Flutter.</li>
              <li>Implemented CI/CD pipelines and containerized deployments with Docker.</li>
            </ul>
          </li>

          <li>
            <div className="exp-header">
              <img src={process.env.PUBLIC_URL + "/assets/md.png"} alt="Monaco Digital" className="exp-logo" />
              <div>
                <b className="exp-date">2021 - 2023 :</b> Web & Mobile Integrator - Epitech
                <div className="exp-company">Monaco Digital</div>
              </div>
            </div>
            <span className="exp-role">Apprenticeship (Apr 2021 - Mar 2023)</span>
            <ul className="exp-details">
              <li>Designed and implemented database structures for scalable applications.</li>
              <li>Created modern UI/UX mockups in Figma and integrated them into responsive apps.</li>
              <li>Worked with MVC architecture ensuring maintainable and reusable code.</li>
              <li>Developed numerous front-end features including dashboards and animations.</li>
            </ul>
          </li>
        </ul>
      </section>

      {/* CONTACT */}
      <section className="contact" id="contact">
        <h3>Contact</h3>
        <form ref={formRef} onSubmit={sendEmail}>
          <input type="text" name="user_name" placeholder="Your Name" required />
          <input type="email" name="user_email" placeholder="Your Email" required />
          <textarea name="message" placeholder="Your message..." required></textarea>
          <button type="submit" className="btn">Send</button>
        </form>
      </section>
    </div>
  );
}
