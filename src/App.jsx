import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import image from './assets/portfolio.png'
import logo from './assets/logo.png'

gsap.registerPlugin(ScrollTrigger)
import { Typewriter } from 'react-simple-typewriter'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

import Portfolio from './components/Portfolio';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
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
    { title: "Web Development", desc: "Building fast, responsive, and secure websites tailored to your needs." },
    { title: "App Design", desc: "Creating intuitive and engaging mobile app interfaces for iOS and Android." },
    { title: "SEO Optimization", desc: "Improving your visibility on search engines to drive organic traffic." },
    { title: "E-Commerce", desc: "Setting up robust online stores with secure payment integration." },
  ];

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 lg:px-24 lg:py-12 bg-background-light dark:bg-background-dark text-text-dark dark:text-text-light font-body transition-colors duration-300">

      <header ref={headerRef} className="flex justify-between items-center mb-16 opacity-0">
        <div className="flex items-center gap-2">
          <div className="w-35">
            <img src={logo} alt="" />
          </div>

        </div>
        <nav className="hidden lg:flex items-center gap-8">
          <a href="#" className="active">HOME</a>
          <a href="#features">FEATURES</a>
          <a href="#portfolio">PORTFOLIO</a>
          <a href="#skills">SKILLS</a>
          <a href="#contact">CONTACT</a>
        </nav>

      </header>

      {/* Back to Top Button */}
      {
        showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-primary text-white shadow-lg hover:-translate-y-1 transition-all duration-300 animate-bounce"
          >
            <span className="material-symbols-outlined">arrow_upward</span>
          </button>
        )
      }

      {/* Mobile Menu */}
      {
        isMenuOpen && (
          <nav className="flex flex-col gap-4 mb-8 lg:hidden bg-card-dark p-4 rounded-lg shadow-custom-dark">
            <a href="#" className="text-white">HOME</a>
            <a href="#features" className="text-text-light hover:text-white">FEATURES</a>
            <a href="#portfolio" className="text-text-light hover:text-white">PORTFOLIO</a>
            <a href="#" className="text-text-light hover:text-white">SKILLS</a>
            <a href="#" className="text-text-light hover:text-white">CONTACT</a>
          </nav>
        )
      }

      <main>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center mb-20">
          <div ref={heroTextRef} className="lg:col-span-3 text-left">
            <p className="text-sm font-medium uppercase tracking-widest text-text-light mb-4">Welcome to my world</p>
            <h2 className="text-5xl lg:text-6xl font-bold text-text-dark dark:text-white mb-4 font-display">
              Hi, I'm <span className="text-primary">Sabbir Hossain</span>
            </h2>
            <h3 className="text-3xl lg:text-4xl font-bold text-text-dark dark:text-white mb-6 font-display">
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
            <p className="text-gray-600 dark:text-text-light text-base leading-relaxed mb-10">
              I am a passionate Frontend Developer with experience in building responsive and interactive web applications using React, Tailwind CSS, and modern JavaScript features. I focus on creating seamless user experiences and writing clean, maintainable code.
            </p>

            <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-gray-600 dark:text-text-light mb-4">Find with me</p>
                <div className="flex items-center gap-4">
                  <a href="" className="icon-box">
                    <svg className="w-5 h-5 transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" clipRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                    </svg>
                  </a>
                  <a href="#" className="icon-box">
                    <svg className="w-5 h-5 transition-colors" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" role="img">
                      <path d="M8.281 11.234h2.25c.875 0 1.375.344 1.375 1.031 0 .75-.625 1.094-1.531 1.094H8.281v-2.125zm.031-2.031H12.5c.906 0 1.438.406 1.438 1.125 0 .781-.625 1.156-1.531 1.156H8.312V9.203zM15 12h3.125V9.656h-3.125V12zm0 2.375h3.406v-1.75H15v1.75zM12.188 0H2.25v24h19.5V0h-9.562zM9.562 7.156c.938 0 1.594.219 2.031.625.438.438.656 1.062.656 1.844 0 1.781-1.031 2.656-3 2.656H8.28v2.094h3.625v1.594H6.625V7.156h2.937zm7.5 9.438H15V7.156h4.375v1.594H16.6v2.344h2.406v1.562H16.6v2.844h2.781v1.594H15v1.562z"></path>
                    </svg>
                  </a>
                  <a href="#" className="icon-box">
                    <svg className="w-5 h-5 transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                    </svg>
                  </a>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-gray-600 dark:text-text-light mb-4">My Resume</p>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="px-6 py-3 bg-card-light dark:bg-card-dark rounded-lg shadow-custom-light dark:shadow-custom-dark text-primary font-medium uppercase tracking-wider hover:-translate-y-1 transition-transform duration-300 text-sm"
                  >
                    Download CV
                  </a>
                  <a
                    href="#contact"
                    className="px-6 py-3 bg-card-light dark:bg-card-dark rounded-lg shadow-custom-light dark:shadow-custom-dark text-text-dark dark:text-white font-medium uppercase tracking-wider hover:-translate-y-1 transition-transform duration-300 text-sm hover:text-primary"
                  >
                    Contact Me
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 order-first lg:order-last flex justify-center">
            <div ref={heroImageRef} className="bg-gradient-to-br from-gray-700 via-gray-800 to-black p-1 shadow-custom-dark opacity-0 animate-wavy overflow-hidden w-[300px] h-[300px] sm:w-[400px] sm:h-[400px]">
              <img
                src={image}
                className="w-full h-full object-cover"
                alt="Portrait"
              />
            </div>
          </div>
        </div>

        {/* Features Section with Swiper */}
        <section id="features" className="py-12 border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-3xl font-bold text-text-dark dark:text-white mb-8 font-display">Features</h2>
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
                <div className="bg-card-light dark:bg-card-dark p-8 rounded-lg shadow-custom-light dark:shadow-custom-dark h-full hover:-translate-y-2 transition-transform duration-300">
                  <div className="text-primary mb-4">
                    <span className="material-symbols-outlined text-4xl">
                      {index === 0 ? 'code' : index === 1 ? 'smartphone' : index === 2 ? 'search' : 'shopping_bag'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-text-dark dark:text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-text-light">{feature.desc}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* Portfolio Section */}
        <Portfolio />

        {/* Skills Section */}
        <section id="skills" className="py-16 border-t border-gray-200 dark:border-gray-800">
          <div className="text-center mb-16">
            <p className="text-sm font-medium uppercase tracking-widest text-primary mb-2">What I know</p>
            <h2 className="text-4xl font-bold text-text-dark dark:text-white font-display">My Skills</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">

            {/* Core Skills */}
            <div className="bg-card-light dark:bg-card-dark p-8 rounded-lg shadow-custom-light dark:shadow-custom-dark">
              <p className="text-sm font-medium text-primary mb-2">Expertise</p>
              <h3 className="text-2xl font-bold text-text-dark dark:text-white mb-8 font-display">Core Skills</h3>

              <div className="space-y-8">
                {[
                  { name: "JAVASCRIPT", percent: 90 },
                  { name: "REACT", percent: 85 },
                  { name: "HTML5", percent: 95 },
                  { name: "CSS3", percent: 90 },
                  { name: "NEXT.JS", percent: 80 }
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
            {/* Core Skills */}
            <div className="bg-card-light dark:bg-card-dark p-8 rounded-lg shadow-custom-light dark:shadow-custom-dark">
              <p className="text-sm font-medium text-primary mb-2">Expertise</p>
              <h3 className="text-2xl font-bold text-text-dark dark:text-white mb-8 font-display">Core Skills</h3>

              <div className="space-y-8">
                {[
                  { name: "JAVASCRIPT", percent: 90 },
                  { name: "REACT", percent: 85 },
                  { name: "HTML5", percent: 95 },
                  { name: "CSS3", percent: 90 },
                  { name: "NEXT.JS", percent: 80 }
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
            <div className="bg-card-light dark:bg-card-dark p-8 rounded-lg shadow-custom-light dark:shadow-custom-dark">
              <p className="text-sm font-medium text-primary mb-2">Tools</p>
              <h3 className="text-2xl font-bold text-text-dark dark:text-white mb-8 font-display">Tools & Frameworks</h3>

              <div className="space-y-8">
                {[
                  { name: "TAILWIND CSS", percent: 95 },
                  { name: "TYPESCRIPT", percent: 80 },
                  { name: "GIT & GITHUB", percent: 85 },
                  { name: "FIGMA", percent: 75 },
                  { name: "REDUX", percent: 70 }
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

        {/* Contact Section */}
        <section id="contact" className="py-16 border-t border-gray-200 dark:border-gray-800">
          <div className="text-center mb-16">
            <p className="text-sm font-medium uppercase tracking-widest text-primary mb-2">Contact</p>
            <h2 className="text-4xl font-bold text-text-dark dark:text-white font-display">Contact With Me</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card-light dark:bg-card-dark p-8 rounded-lg shadow-custom-light dark:shadow-custom-dark hover:-translate-y-2 transition-transform duration-300">
              <div className="w-full h-48 mb-6 overflow-hidden rounded-lg">
                <img
                  src="https://img.freepik.com/free-photo/contact-us-communication-official-message-concept_53876-124316.jpg"
                  alt="Contact"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <h3 className="text-2xl font-bold text-text-dark dark:text-white mb-4">Sabbir Hossain</h3>
              <p className="text-gray-600 dark:text-text-light mb-4">Frontend Developer</p>
              <p className="text-gray-600 dark:text-text-light mb-4">
                I am available for freelance work. Connect with me via and call in to my account.
              </p>
              <div className="mb-4">
                <p className="text-gray-600 dark:text-text-light"><span className="text-text-dark dark:text-white font-medium">Phone:</span> +01234567890</p>
                <p className="text-gray-600 dark:text-text-light"><span className="text-text-dark dark:text-white font-medium">Email:</span> admin@example.com</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-gray-600 dark:text-text-light mb-4 text-left">Find with me</p>
                <div className="flex items-center gap-4">
                  <a href="#" className="icon-box">
                    <svg className="w-5 h-5 transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" clipRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                    </svg>
                  </a>
                  <a href="#" className="icon-box">
                    <svg className="w-5 h-5 transition-colors" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" role="img">
                      <path d="M8.281 11.234h2.25c.875 0 1.375.344 1.375 1.031 0 .75-.625 1.094-1.531 1.094H8.281v-2.125zm.031-2.031H12.5c.906 0 1.438.406 1.438 1.125 0 .781-.625 1.156-1.531 1.156H8.312V9.203zM15 12h3.125V9.656h-3.125V12zm0 2.375h3.406v-1.75H15v1.75zM12.188 0H2.25v24h19.5V0h-9.562zM9.562 7.156c.938 0 1.594.219 2.031.625.438.438.656 1.062.656 1.844 0 1.781-1.031 2.656-3 2.656H8.28v2.094h3.625v1.594H6.625V7.156h2.937zm7.5 9.438H15V7.156h4.375v1.594H16.6v2.344h2.406v1.562H16.6v2.844h2.781v1.594H15v1.562z"></path>
                    </svg>
                  </a>
                  <a href="#" className="icon-box">
                    <svg className="w-5 h-5 transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 bg-card-light dark:bg-card-dark p-8 rounded-lg shadow-custom-light dark:shadow-custom-dark">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-1">
                  <label className="block text-gray-600 dark:text-text-light text-sm font-medium mb-2 uppercase tracking-wide">Your Name</label>
                  <input type="text" className="w-full bg-gray-100 dark:bg-[#191b1e] border border-gray-200 dark:border-[#191b1e] rounded-md px-4 py-3 text-text-dark dark:text-white focus:border-primary focus:outline-none shadow-inner" />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-gray-600 dark:text-text-light text-sm font-medium mb-2 uppercase tracking-wide">Phone Number</label>
                  <input type="text" className="w-full bg-gray-100 dark:bg-[#191b1e] border border-gray-200 dark:border-[#191b1e] rounded-md px-4 py-3 text-text-dark dark:text-white focus:border-primary focus:outline-none shadow-inner" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-600 dark:text-text-light text-sm font-medium mb-2 uppercase tracking-wide">Email</label>
                  <input type="email" className="w-full bg-gray-100 dark:bg-[#191b1e] border border-gray-200 dark:border-[#191b1e] rounded-md px-4 py-3 text-text-dark dark:text-white focus:border-primary focus:outline-none shadow-inner" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-600 dark:text-text-light text-sm font-medium mb-2 uppercase tracking-wide">Subject</label>
                  <input type="text" className="w-full bg-gray-100 dark:bg-[#191b1e] border border-gray-200 dark:border-[#191b1e] rounded-md px-4 py-3 text-text-dark dark:text-white focus:border-primary focus:outline-none shadow-inner" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-600 dark:text-text-light text-sm font-medium mb-2 uppercase tracking-wide">Your Message</label>
                  <textarea rows="6" className="w-full bg-gray-100 dark:bg-[#191b1e] border border-gray-200 dark:border-[#191b1e] rounded-md px-4 py-3 text-text-dark dark:text-white focus:border-primary focus:outline-none shadow-inner"></textarea>
                </div>
                <div className="md:col-span-2">
                  <button type="submit" className="w-full bg-card-light dark:bg-card-dark text-primary uppercase font-medium py-4 rounded-lg shadow-custom-light dark:shadow-custom-dark hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-black/50">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        <section id="location" className="py-16 border-t border-gray-200 dark:border-gray-800">
          <div className="text-center mb-16">
            <p className="text-sm font-medium uppercase tracking-widest text-primary mb-2">Naogaon, Rajshahi, Bangladesh</p>
            <h2 className="text-4xl font-bold text-text-dark dark:text-white font-display">Where I am</h2>
          </div>

          <div className="bg-card-light dark:bg-card-dark p-4 rounded-lg shadow-custom-light dark:shadow-custom-dark h-[400px] w-full overflow-hidden">
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

      <footer className="py-8 text-center border-t border-gray-200 dark:border-gray-800">
        <div className="flex justify-center items-center gap-2 mb-4">
          <div className="w-8 h-8">
            <svg fill="#f9004d" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg">
              <path d="M27,0C12.1,0,0,12.1,0,27s12.1,27,27,27s27-12.1,27-27S41.9,0,27,0z M35.4,38.8c-0.6,0.9-1.5,1.4-2.5,1.4c-0.8,0-1.6-0.4-2.1-1.1l-6.8-9.3c-0.3-0.4-0.8-0.6-1.3-0.6s-1,0.2-1.3,0.6l-6.8,9.3c-0.6,0.7-1.3,1.1-2.1,1.1c-1,0-1.9-0.5-2.5-1.4C9.4,37.9,9.3,37,9.6,36l9.3-13.3c0.1-0.1,0.1-0.2,0.2-0.3l-9.1-13c-0.3-0.4-0.3-1.1,0-1.6c0.6-0.9,1.5-1.4,2.5-1.4c0.8,0,1.6,0.4,2.1,1.1l6.7,9.2c0.3,0.4,0.8,0.6,1.3,0.6c0.5,0,1-0.2,1.3-0.6l6.7-9.2c0.6-0.7,1.3-1.1,2.1-1.1c1,0,1.9,0.5,2.5,1.4c0.3,0.4,0.4,1.1,0,1.6l-9.1,13c0.1,0.1,0.1,0.2,0.2,0.3l9.3,13.3C36.1,37,36,37.9,35.4,38.8z"></path>
            </svg>
          </div>
          <span className="font-bold text-text-dark dark:text-white font-display text-lg">Sabbir Hossain</span>
        </div>
        <p className="text-gray-600 dark:text-text-light text-sm">
          © {new Date().getFullYear()}. All rights reserved by <span className="text-primary hover:underline cursor-pointer">Sabbir Hossain</span>
        </p>
      </footer>

    </div >
  )
}

export default App
