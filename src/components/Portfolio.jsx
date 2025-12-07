import React from 'react';


const Portfolio = () => {
    const projects = [
        {
            id: 1,
            category: "EXTERNAL LINK",
            likes: 238,
            title: "Green Nest Plant Care & Store.",
            image: "https://i.ibb.co/WN6tk8PJ/Green-Nest.png",
            icon: "open_in_new",
            lineLink: "https://greennest-plants.netlify.app/"
        },
        {
            id: 2,
            category: "EXTERNAL LINK",
            likes: 234,
            title: "At HERO.IO , we craft innovative apps.",
            image: "https://i.ibb.co/4gKJTsHF/Hero-in.png",
            icon: "open_in_new",
            lineLink: "https://hero-app-in.netlify.app/"
        },
        {
            id: 3,
            category: "EXTERNAL LINK",
            likes: 67,
            title: "AI Model Inventory Manager.",
            image: "https://i.ibb.co/99vzsgfQ/ai-model.png",
            icon: "open_in_new",
            lineLink: "https://a-10-ai-model.netlify.app/"
        }
    ];

    return (
        <section id="portfolio" className="py-16 border-t border-gray-800">
            <header className="text-center mb-10">
                <p className="text-sm font-semibold tracking-widest text-primary mb-2 uppercase">Visit my portfolio and keep your feedback</p>
                <h2 className="text-4xl sm:text-5xl font-bold text-text-light font-display">My Projects</h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                    <a key={project.id}
                        href={project.lineLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-card-dark rounded-lg overflow-hidden flex flex-col group shadow-custom-dark hover:-translate-y-2 transition-transform duration-300">
                        <div className="relative bg-[#1e2024] p-6 grow flex items-center justify-center min-h-[200px] sm:min-h-[250px] overflow-hidden">

                            <img
                                alt={project.title}
                                className="h-32 sm:h-40 object-contain transform group-hover:scale-110 transition-transform duration-500 ease-in-out z-10"
                                src={project.image}
                            />
                            <span className="material-symbols-outlined absolute top-4 right-4 text-white opacity-70 z-20">{project.icon}</span>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="flex justify-between items-center text-sm text-gray-500 dark:text-text-light">
                                <span className="font-medium text-primary tracking-wider uppercase">{project.category}</span>
                                <div className="flex items-center space-x-1">
                                    <span className="material-symbols-outlined text-base">favorite</span>
                                    <span>{project.likes}</span>
                                </div>
                            </div>
                            <a className="text-lg font-bold text-white leading-snug group-hover:text-primary transition-colors cursor-pointer">
                                {project.title}
                                <span className="material-symbols-outlined align-middle ml-1 opacity-0 group-hover:opacity-100 transition-opacity -rotate-45 group-hover:rotate-0 inline-block duration-300">arrow_outward</span>
                            </a>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
};

export default Portfolio;
