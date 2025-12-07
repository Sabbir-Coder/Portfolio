import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import image from './assets/portfolio.png'
import logo from './assets/logo.png'



gsap.registerPlugin(ScrollTrigger)
import { Typewriter } from 'react-simple-typewriter'
import emailjs from 'emailjs-com';

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

import Portfolio from './components/Portfolio';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  // DaisyUI theme state: default is dark
  const [theme, setTheme] = useState(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  // Set DaisyUI theme by data-theme attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Track scroll for sticky header shrink
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Refs for animation
  const headerRef = useRef(null);
  const heroTextRef = useRef(null);
  const heroImageRef = useRef(null);
  const scrollRef = useRef(null);



  useEffect(() => {
    // Scroll to top visibility
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };


  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(headerRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
      .fromTo(heroTextRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2 },
        "-=0.5"
      )
      .fromTo(heroImageRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1 },
        "-=1"
      );

    // ScrollTrigger for Skills progress bars
    gsap.utils.toArray('.skill-progress').forEach(bar => {
      gsap.fromTo(bar,
        { width: 0 },
        {
          width: bar.getAttribute('data-percent'),
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bar,
            start: "top 90%",
          }
        }
      )
    });

    // Animate Features Section
    gsap.fromTo('#features h2',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: '#features',
          start: 'top 80%',
        }
      }
    );

    // Animate Portfolio Section
    gsap.fromTo('#portfolio',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: '#portfolio',
          start: 'top 80%',
        }
      }
    );

    // Animate Skills Section title
    gsap.fromTo('#skills .text-center',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: '#skills',
          start: 'top 80%',
        }
      }
    );

    // Animate each skill card
    gsap.utils.toArray('#skills > div > div').forEach((card, index) => {
      gsap.fromTo(card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          }
        }
      );
    });

    // Animate Contact Section title
    gsap.fromTo('#contact .text-center',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: '#contact',
          start: 'top 80%',
        }
      }
    );

    // Animate Contact cards
    gsap.utils.toArray('#contact > div > div').forEach((card, index) => {
      gsap.fromTo(card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: index * 0.15,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          }
        }
      );
    });

    // Animate Location Section
    gsap.fromTo('#location .text-center',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: '#location',
          start: 'top 80%',
        }
      }
    );

    gsap.fromTo('#location > div',
      { y: 50, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: '#location > div',
          start: 'top 85%',
        }
      }
    );

    // Animate Footer
    gsap.fromTo('footer',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: 'footer',
          start: 'top 90%',
        }
      }
    );
  }, []);

  const features = [
    { title: "Web Development", desc: "Crafting modern, responsive websites using the latest frontend technologies and best practices." },
    { title: "React Applications", desc: "Building scalable and high-performance web apps with React, hooks, and component-driven architecture." },
    { title: "UI/UX Design", desc: "Designing intuitive user interfaces and seamless user experiences for web platforms." },
    { title: "Performance Optimization", desc: "Improving site speed, accessibility, and SEO for better user engagement and search ranking." },
  ];

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [sending, setSending] = useState(false);
  const [resultMsg, setResultMsg] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendEmail = e => {
    e.preventDefault();
    setSending(true);
    setResultMsg('');
    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        from_name: formData.name,
        phone: formData.phone,
        reply_to: formData.email,
        subject: formData.subject,
        message: formData.message
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
      .then(() => {
        setResultMsg('Message sent successfully!');
        setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
      })
      .catch(() => setResultMsg('Failed to send message. Please try again.'))
      .finally(() => setSending(false));
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 lg:px-24 lg:py-12 bg-background-dark text-text-light font-body transition-colors duration-300">
      <header
        ref={headerRef}
        className={`sticky top-0 z-40 flex justify-between items-center mb-19 bg-background-dark transition-all duration-300 ${isScrolled ? 'h-14 py-2 shadow-lg' : 'h-10 py-6'} opacity-100`}
        style={{ boxShadow: isScrolled ? '0 2px 16px rgba(0,0,0,0.08)' : 'none' }}
      >
        <div className="flex items-center gap-2">
          <a href="#" className="">
            <img src={logo} alt="" className={`transition-all duration-300 ${isScrolled ? 'w-40 h-13' : 'w-46 h-17'}`} />
          </a>
        </div>
        <nav className="hidden lg:flex items-center gap-8">
          <a href="#" className="active text-text-light">HOME</a>
          <a href="#features" className="text-text-light">FEATURES</a>
          <a href="#portfolio" className="text-text-light">PORTFOLIO</a>
          <a href="#skills" className="text-text-light">SKILLS</a>
          <a href="#contact" className="text-text-light">CONTACT</a>
        </nav>
        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`p-2 rounded transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`}
            aria-label="Open mobile menu"
          >
            <span className="material-symbols-outlined text-text-light text-3xl">menu</span>
          </button>
        </div>
      </header>
      {/* Animated Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-card-dark shadow-custom-dark z-50 transform transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col gap-4 pt-24 px-8 lg:hidden`}
        style={{ willChange: 'transform' }}
      >
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-6 right-6 p-2 rounded-full bg-primary text-text-light"
          aria-label="Close mobile menu"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>
        <a href="#" className="text-text-light" onClick={() => setIsMenuOpen(false)}>HOME</a>
        <a href="#features" className="text-text-light" onClick={() => setIsMenuOpen(false)}>FEATURES</a>
        <a href="#portfolio" className="text-text-light" onClick={() => setIsMenuOpen(false)}>PORTFOLIO</a>
        <a href="#skills" className="text-text-light" onClick={() => setIsMenuOpen(false)}>SKILLS</a>
        <a href="#contact" className="text-text-light" onClick={() => setIsMenuOpen(false)}>CONTACT</a>
      </div>

      {/* Back to Top Button */}
      {
        showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 cursor-pointer z-50 p-3 rounded-full bg-primary text-text-light shadow-lg hover:-translate-y-1 transition-all duration-300 animate-bounce"
          >
            <span className="material-symbols-outlined">arrow_upward</span>
          </button>
        )
      }

      <main>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center mb-20">
          <div ref={heroTextRef} className="lg:col-span-3 text-left">
            <p className="text-sm font-medium uppercase tracking-widest text-text-light mb-4">Welcome to my world</p>
            <h2 className="text-5xl lg:text-6xl font-bold text-text-light mb-4 font-display">
              Hi, I'm <span className="text-primary">Sabbir Hossain</span>
            </h2>
            <h3 className="text-3xl lg:text-4xl font-bold text-text-light mb-6 font-display">
              a <span className="text-primary">
                <Typewriter
                  words={['Frontend Developer.', 'React Specialist.', 'Professional Coder.']}
                  loop={0}
                  cursor
                  cursorStyle='|'
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </span>
            </h3>
            <p className="text-text-light text-base leading-relaxed mb-10">
              I am a passionate Frontend Developer with experience in building responsive and interactive web applications using React, Tailwind CSS, and modern JavaScript features. I focus on creating seamless user experiences and writing clean, maintainable code.
            </p>

            <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-text-light mb-4">Find with me</p>
                <div className="flex items-center gap-4">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.linkedin.com/in/coder-sabbir/" className="icon-box bg-card-dark text-text-light shadow-custom-dark">
                    <svg className="w-5 h-5 transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                    </svg>
                  </a>

                  <a target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/Sabbir-Coder" className="icon-box bg-card-dark text-text-light shadow-custom-dark">
                    <svg className="w-5 h-5 transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.263.82-.582 0-.288-.01-1.05-.015-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.76-1.606-2.665-.304-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 013.003-.404c1.018.005 2.045.138 3.003.404 2.29-1.552 3.296-1.23 3.296-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.804 5.624-5.475 5.921.43.37.813 1.102.813 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.218.699.825.58C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </a>

                  <a target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.facebook.com/sabbir1647/" className="icon-box bg-card-dark text-text-light shadow-custom-dark">
                    <svg className="w-5 h-5 transition-colors " fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" clipRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                    </svg>
                  </a>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-text-light mb-4">My Resume</p>
                <div className="flex gap-4">
                  <a
                    href="/resume.pdf"
                    download="Sabbir-Hossain-Resume.pdf"
                    className="px-6 py-3 bg-card-dark rounded-lg shadow-custom-dark text-primary font-medium uppercase tracking-wider hover:-translate-y-1 transition-transform duration-300 text-sm inline-block"
                  >
                    Download Resume
                  </a>
                  <a
                    href="#contact"
                    className="px-6 py-3 bg-card-dark rounded-lg shadow-custom-dark text-text-light font-medium uppercase tracking-wider hover:-translate-y-1 transition-transform duration-300 text-sm hover:text-primary"
                  >
                    Contact Me
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 order-first lg:order-last flex justify-center">
            <div ref={heroImageRef} className="bg-linear-to-br from-gray-700 via-gray-800 to-black p-1 shadow-custom-dark opacity-0 animate-wavy overflow-hidden w-[300px] h-[300px] sm:w-[400px] sm:h-[400px]">
              <img
                src={image}
                className="w-full h-full object-cover"
                alt="Portrait"
              />
            </div>
          </div>
        </div>

        {/* Features Section with Swiper */}
        <section id="features" className="py-12 border-t border-gray-800">
          <h2 className="text-3xl font-bold text-text-light mb-8 font-display">Features</h2>
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="pb-12"
          >
            {features.map((feature, index) => (
              <SwiperSlide key={index}>
                <div className="bg-card-dark p-8 rounded-lg shadow-custom-dark h-full hover:-translate-y-2 transition-transform duration-300">
                  <div className="text-primary mb-4">
                    <span className="material-symbols-outlined text-4xl">
                      {index === 0 ? 'code' : index === 1 ? 'smartphone' : index === 2 ? 'search' : 'shopping_bag'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-text-light mb-4">{feature.title}</h3>
                  <p className="text-text-light">{feature.desc}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>


        {/* Skills Section */}
        <section id="skills" className="py-16 border-t border-gray-800">
          <div className="text-center mb-16">
            <p className="text-sm font-medium uppercase tracking-widest text-primary mb-2">What I know</p>
            <h2 className="text-4xl font-bold text-text-light font-display">My Skills</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">

            {/* Core Skills */}
            <div className="bg-card-dark p-8 rounded-lg shadow-custom-dark">
              <p className="text-sm font-medium text-primary mb-2">Expertise</p>
              <h3 className="text-2xl font-bold text-white mb-8 font-display">Frontend Skills</h3>

              <div className="space-y-8">
                {[
                  { name: "REACT JS", percent: 90 },
                  { name: "JAVASCRIPT", percent: 85 },
                  { name: "NEXT.JS", percent: 80 },
                  { name: "TAILWIND CSS", percent: 95 },
                  { name: "HTML5", percent: 90 },
                ].map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-text-light">{skill.name}</span>
                      <span className="text-sm font-medium text-text-light">{skill.percent}%</span>
                    </div>
                    <div className="w-full bg-black/30 rounded-full h-3">
                      <div
                        className="skill-progress bg-primary h-3 rounded-full"
                        style={{ width: '0%' }}
                        data-percent={`${skill.percent}%`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Backend Skills */}
            <div className="bg-card-dark p-8 rounded-lg shadow-custom-dark">
              <p className="text-sm font-medium text-primary mb-2">Expertise</p>
              <h3 className="text-2xl font-bold text-white mb-8 font-display">Core Skills</h3>

              <div className="space-y-8">
                {[
                  { name: "ExpressJS", percent: 90 },
                  { name: "NodeJS", percent: 85 },
                  { name: "MongoDB", percent: 95 },
                  { name: "Firebase", percent: 90 },
                  { name: "REST API Development", percent: 80 }
                ].map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-text-light">{skill.name}</span>
                      <span className="text-sm font-medium text-text-light">{skill.percent}%</span>
                    </div>
                    <div className="w-full bg-black/30 rounded-full h-3">
                      <div
                        className="skill-progress bg-primary h-3 rounded-full"
                        style={{ width: '0%' }}
                        data-percent={`${skill.percent}%`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools & Frameworks */}
            <div className="bg-card-dark p-8 rounded-lg shadow-custom-dark">
              <p className="text-sm font-medium text-primary mb-2">Tools</p>
              <h3 className="text-2xl font-bold text-white mb-8 font-display">Tools & Frameworks</h3>

              <div className="space-y-8">
                {[
                  { name: "GIT & GITHUB", percent: 85 },
                  { name: "VERSION CONTROL", percent: 85 },
                  { name: "REACT HOOK FORM", percent: 80 },
                  { name: "DAISYUI", percent: 80 },
                  { name: "FIGMA", percent: 75 },
                ].map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-text-light">{skill.name}</span>
                      <span className="text-sm font-medium text-text-light">{skill.percent}%</span>
                    </div>
                    <div className="w-full bg-black/30 rounded-full h-3">
                      <div
                        className="skill-progress bg-primary h-3 rounded-full"
                        style={{ width: '0%' }}
                        data-percent={`${skill.percent}%`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        <Portfolio />



        {/* Contact Section */}
        <section id="contact" className="py-16 border-t border-gray-800">
          <div className="text-center mb-16">
            <p className="text-sm font-medium uppercase tracking-widest text-primary mb-2">Contact</p>
            <h2 className="text-4xl font-bold text-text-light font-display">Contact With Me</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card-dark p-8 rounded-lg shadow-custom-dark hover:-translate-y-2 transition-transform duration-300">
              <div className="w-full h-48 mb-6 overflow-hidden rounded-lg">
                <img
                  src="https://img.freepik.com/free-photo/contact-us-communication-official-message-concept_53876-124316.jpg"
                  alt="Contact"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Sabbir Hossain</h3>
              <p className="text-text-light mb-4">Frontend Developer</p>
              <p className="text-text-light mb-4">
                I am available for freelance work. Connect with me via and call in to my account.
              </p>
              <div className="mb-4">
                <p className="text-text-light"><span className="text-white font-medium">Phone:</span> +8801854919373</p>
                <p className="text-text-light"><span className="text-white font-medium">Email:</span> sabbir213924@gmail.com</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-gray-600 dark:text-text-light mb-4 text-left">Find with me</p>
                <div className="flex items-center gap-4">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.linkedin.com/in/coder-sabbir/" className="icon-box bg-card-dark text-text-light shadow-custom-dark">
                    <svg className="w-5 h-5 transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                    </svg>
                  </a>

                  <a target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/Sabbir-Coder" className="icon-box bg-card-dark text-text-light shadow-custom-dark">
                    <svg className="w-5 h-5 transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.263.82-.582 0-.288-.01-1.05-.015-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.76-1.606-2.665-.304-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 013.003-.404c1.018.005 2.045.138 3.003.404 2.29-1.552 3.296-1.23 3.296-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.804 5.624-5.475 5.921.43.37.813 1.102.813 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.218.699.825.58C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </a>

                  <a target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.facebook.com/sabbir1647/" className="icon-box bg-card-dark text-text-light shadow-custom-dark">
                    <svg className="w-5 h-5 transition-colors " fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" clipRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 bg-card-dark p-8 rounded-lg shadow-custom-dark">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSendEmail}>
                <div className="md:col-span-1">
                  <label className="block text-text-light text-sm font-medium mb-2 uppercase tracking-wide">Your Name</label>
                  <input name="name" type="text" value={formData.name} onChange={handleChange} className="w-full bg-[#191b1e] border dark:border-[#191b1e] rounded-md px-4 py-3 text-text-dark  focus:border-primary focus:outline-none shadow-inner" required />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-text-light text-sm font-medium mb-2 uppercase tracking-wide">Phone Number</label>
                  <input name="phone" type="text" value={formData.phone} onChange={handleChange} className="w-full bg-[#191b1e] border dark:border-[#191b1e] rounded-md px-4 py-3 text-text-dark  focus:border-primary focus:outline-none shadow-inner" required />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-text-light text-sm font-medium mb-2 uppercase tracking-wide">Email</label>
                  <input name="email" type="email" value={formData.email} onChange={handleChange} className="w-full bg-[#191b1e] border dark:border-[#191b1e] rounded-md px-4 py-3 text-text-dark  focus:border-primary focus:outline-none shadow-inner" required />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-text-light text-sm font-medium mb-2 uppercase tracking-wide">Subject</label>
                  <input name="subject" type="text" value={formData.subject} onChange={handleChange} className="w-full bg-[#191b1e] border dark:border-[#191b1e] rounded-md px-4 py-3 text-text-dark  focus:border-primary focus:outline-none shadow-inner" required />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-text-light text-sm font-medium mb-2 uppercase tracking-wide">Your Message</label>
                  <textarea name="message" rows="6" value={formData.message} onChange={handleChange} className="w-full bg-[#191b1e] border dark:border-[#191b1e] rounded-md px-4 py-3 text-text-dark  focus:border-primary focus:outline-none shadow-inner" required></textarea>
                </div>
                <div className="md:col-span-2">
                  <button type="submit" disabled={sending} className=" w-full dark:bg-card-dark text-primary uppercase font-medium py-4 rounded-lg shadow-custom-dark hover:-translate-y-1 transition-all duration-300 border border-transparent cursor-pointer hover:border-primary">
                    {sending ? 'Sending...' : 'Send Message'}
                  </button>
                  {resultMsg && <p className="mt-4 text-center text-primary">{resultMsg}</p>}
                </div>
              </form>
            </div>
          </div>
        </section>

        <section id="location" className="py-16 border-t border-gray-800">
          <div className="text-center mb-16">
            <p className="text-sm font-medium uppercase tracking-widest text-primary mb-2">Naogaon, Rajshahi, Bangladesh</p>
            <h2 className="text-4xl font-bold text-text-light font-display">Where I am</h2>
          </div>

          <div className="bg-card-dark p-4 rounded-lg shadow-custom-dark h-[400px] w-full overflow-hidden">
            <iframe
              src="https://maps.google.com/maps?q=Naogaon%2C+Rajshahi%2C+Bangladesh&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg filter grayscale hover:grayscale-0 transition-all duration-300"
            ></iframe>
          </div>
        </section>

      </main>

      <footer className="py-8 text-center border-t border-gray-800">
        <div className="flex justify-center items-center gap-2 mb-4">
          <div className="w-48 h-18">
            <img src={logo} alt="" />
          </div>
        </div>
        <p className="text-text-light text-sm">
          © {new Date().getFullYear()}. All rights reserved by <span className="text-primary hover:underline cursor-pointer">Sabbir Hossain</span>
        </p>
      </footer>

    </div >
  )
}

export default App
