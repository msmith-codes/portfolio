import Image from "next/image";

// Featured Projects Data
const featuredProjects = [
    {
        id: 1,
        title: "Cobalt",
        description: "Cobalt is a proprietary software developed for GS Retail Services to manage store, product, and order information for Phantom Fireworks.",
        image: "/portfolio/cobalt.png",
        imageAlt: "Image of Cobalt",
        technologies: ["Go", "Next.js", "PostgreSQL"],
        links: [] as { label: string; url: string }[]
    },
    {
        id: 2,
        title: "TankTek",
        description: "TankTek is a custom game engine developed to make my own games.",
        image: "/portfolio/tanktekengine.png",
        imageAlt: "Image of TankTek Editor",
        technologies: ["C++", "OpenGL", "RayLib", "Dear ImGui", "Lua"],
        links: [] as { label: string; url: string }[]
    },
    
];

// Other Projects Data
const otherProjects = [
    {
        id: 1,
        title: "iusearchbtw",
        description: "A esoteric programming language made because I could.",
        image: "/portfolio/archbtw.png",
        imageAlt: "Image of IUseArchBtw.",
        technologies: ["C++", "CMake"],
        link: { label: "View →", url: "https://github.com/msmith-codes/IUseArchBtw/" }
    },
    {
        id: 2,
        title: "Kattis Solutions",
        description: "A repository full of all my Kattis Solutions.",
        image: "/portfolio/kattis.png",
        imageAlt: "Image of Kattis GitHub",
        technologies: ["C++", "Kattis"],
        link: { label: "Source Code →", url: "https://github.com/msmith-codes/KattisSolutions" }
    }
];

export default function PortfolioPage() {
    return (
        <main className="max-w-6xl mx-auto px-12 py-8">
            <div className="space-y-12">
                {/* Page Title */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-foreground font-mono mb-4">Portfolio</h1>
                    <p className="text-foreground/80 font-mono text-lg">
                        A showcase of my game development and software programming projects
                    </p>
                    <div className="w-24 h-0.5 bg-foreground/20 mx-auto mt-4"></div>
                </div>

                {/* Featured Projects Section */}
                <section className="space-y-8">
                    <h2 className="text-3xl font-bold text-foreground font-mono">Featured Projects</h2>
                    
                    {featuredProjects.map((project) => (
                        <div key={project.id} className="border border-foreground/20 rounded-lg p-6 hover:border-foreground/40 transition-colors">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-1">
                                    <div className="bg-foreground/10 rounded-lg h-48 flex items-center justify-center overflow-hidden">
                                        <Image 
                                            src={project.image} 
                                            width={300} 
                                            height={150} 
                                            alt={project.imageAlt}
                                            className="object-cover w-full h-full rounded-lg"
                                        />
                                    </div>
                                </div>
                                <div className="lg:col-span-2 space-y-4">
                                    <h3 className="text-2xl font-bold text-foreground font-mono">{project.title}</h3>
                                    <p className="text-foreground/80 font-mono leading-relaxed">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech) => (
                                            <span key={tech} className="px-3 py-1 bg-foreground/10 text-foreground font-mono text-sm rounded">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    {project.links.length > 0 && (
                                        <div className="flex gap-4">
                                            {project.links.map((link, idx) => (
                                                <a 
                                                    key={idx}
                                                    href={link.url} 
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-4 py-2 text-foreground/80 hover:text-foreground transition-colors font-mono"
                                                >
                                                    {link.label}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
                
                {/* Other Projects Section */}
                <section className="space-y-8">
                    <h2 className="text-3xl font-bold text-foreground font-mono">Other Projects</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {otherProjects.map((project) => (
                            <div key={project.id} className="border border-foreground/20 rounded-lg p-4 hover:border-foreground/40 transition-colors">
                                <div className="bg-foreground/10 rounded-lg h-32 mb-4 flex items-center justify-center">
                                    <Image 
                                        src={project.image} 
                                        width={300} 
                                        height={150} 
                                        alt={project.imageAlt}
                                        className="object-cover w-full h-full rounded-lg"
                                    />
                                </div>
                                <h3 className="text-lg font-bold text-foreground font-mono mb-2">{project.title}</h3>
                                <p className="text-foreground/80 font-mono text-sm mb-3">
                                    {project.description}
                                </p>
                                <div className="flex gap-2 mb-3">
                                    {project.technologies.map((tech) => (
                                        <span key={tech} className="px-2 py-1 bg-foreground/10 text-foreground font-mono text-xs rounded">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <a 
                                    href={project.link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-foreground/80 hover:text-foreground transition-colors font-mono text-sm"
                                >
                                    {project.link.label}
                                </a>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Call to Action */}
                <section className="text-center pt-8">
                    <p className="text-foreground/80 font-mono mb-6">
                        Want to see more of my work or discuss a project?
                    </p>
                    <a 
                        href="/contact" 
                        className="inline-block px-6 py-3 text-foreground hover:text-foreground/80 transition-colors font-mono border border-foreground/20 rounded hover:border-foreground/40"
                    >
                        Get in Touch
                    </a>
                </section>
            </div>
        </main>
    );
}
