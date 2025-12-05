import React from 'react';

const Portfolio = () => {
    const projects = [
        {
            id: 1,
            category: "GALLERY",
            likes: 238,
            title: "NFT Dashboard Application Development.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJUtnqXfbO6ab4fBX4Uz9Q8cgvOzsoQpSmvBOX3X8rk8J2-w7fGSvfqDirMD05TPccGPdWUXhTUhl2Er52AGHsksATSIHUUt0fkk4oidVB85FkvCRYOxkkUBXsnqLkxMRpMoGX9a0ANiLyyukB8HEoYfva0_FnYnnGMkruXOsaaEB2d9eQW5hwhUkvR18H4SxaDjqFHX39nBO8tu7zgDTYWZgATnw-SFEnQsXVxfAjpD4LqCyQ-OLH2Lkmyk05OQt7b5iOnVrYUDU",
            icon: "grid_view"
        },
        {
            id: 2,
            category: "VIDEO",
            likes: 234,
            title: "Online Food Delivery Mobile App Design.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDB2plXGnVXkWaat56XsmMrF6sJ0gC3GA98lKZSzMIK5lPfqMHA5t4wSqpsIUbpWudShOQ8GEB_mafn0Y9b84IW0B0Q9zm-E9ppruY3LhOzTbgXFmRXJWxseKdbOYOaY0I4ku8sFOO05biMbmQ--60DX6mQ_x2gft9-9oQVFjUDGGBob4KChBgc3m3RVTwEmWkIn0eF_WMLB8Nl2xTMUDbBdUyLrkKEgPx4zvrPycJbXh448C6w_DBKWFciJugnDdslgkbopfZow7A",
            icon: "videocam"
        },
        {
            id: 3,
            category: "EXTERNAL LINK",
            likes: 67,
            title: "Travel App Design Creativity & Application.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCog-GJTqSAouarBPGzYzbvayiH1e9qkgYklTI7hhfmjOsj4MsV24RIwOb0337vm6IPawR4ZZo7JOeCouAP3pACAQnWu7RwFLISfvWjTOUDTU94ShXcZYj4VllG29vs4oj4b5V5klFrRwJqlRfrEu1wi1Bi8S7Zqp-GJQXP07q1eAlIEje-fDgIjHgZwtguBXfAUFRzR_HaOdvgRig94h5VZ7SZHzzT9Z94Anp_rL2K7oXoPOYCLEBr3QSjLs6Po2RMljIrE7KQo-w",
            icon: "open_in_new"
        }
    ];

    return (
        <section id="portfolio" className="py-16 border-t border-gray-200 dark:border-gray-800">
            <header className="text-center mb-10">
                <p className="text-sm font-semibold tracking-widest text-primary mb-2 uppercase">Visit my portfolio and keep your feedback</p>
                <h2 className="text-4xl sm:text-5xl font-bold text-text-dark dark:text-white font-display">My Portfolio</h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                    <div key={project.id} className="bg-card-light dark:bg-card-dark rounded-lg overflow-hidden flex flex-col group shadow-custom-light dark:shadow-custom-dark hover:-translate-y-2 transition-transform duration-300">
                        <div className="relative bg-[#1e2024] p-6 flex-grow flex items-center justify-center min-h-[200px] sm:min-h-[250px] overflow-hidden">

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
                            <h2 className="text-lg font-bold text-text-dark dark:text-white leading-snug group-hover:text-primary transition-colors cursor-pointer">
                                {project.title}
                                <span className="material-symbols-outlined align-middle ml-1 opacity-0 group-hover:opacity-100 transition-opacity -rotate-45 group-hover:rotate-0 inline-block duration-300">arrow_outward</span>
                            </h2>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Portfolio;
