import Image from "next/image";

export default function Portfolio() {
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
                    
                    {/* Project 1 */}
                    <div className="border border-foreground/20 rounded-lg p-6 hover:border-foreground/40 transition-colors">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-1">
                                <div className="bg-foreground/10 rounded-lg h-48 flex items-center justify-center overflow-hidden">
                                    <Image 
                                        src={"/portfolio/cobalt.png"} 
                                        width={300} 
                                        height={150} 
                                        alt="Image of Cobalt"
                                        className="object-cover w-full h-full rounded-lg"
                                    />
                                </div>
                            </div>
                            <div className="lg:col-span-2 space-y-4">
                                <h3 className="text-2xl font-bold text-foreground font-mono">Cobalt</h3>
                                <p className="text-foreground/80 font-mono leading-relaxed">
                                    Cobalt is a proprietary software developed for GS Retail Services to manage store, product, and order information
                                    for Phantom Fireworks.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-foreground/10 text-foreground font-mono text-sm rounded">
                                        Go
                                    </span>
                                    <span className="px-3 py-1 bg-foreground/10 text-foreground font-mono text-sm rounded">
                                        Next.js
                                    </span>
                                    <span className="px-3 py-1 bg-foreground/10 text-foreground font-mono text-sm rounded">
                                        PostgreSQL
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Project 2 */}
                    <div className="border border-foreground/20 rounded-lg p-6 hover:border-foreground/40 transition-colors">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-1">
                                <div className="bg-foreground/10 rounded-lg h-48 flex items-center justify-center overflow-hidden">
                                    <Image 
                                        src={"/portfolio/kattis.png"} 
                                        width={300} 
                                        height={150} 
                                        alt="Image of Kattis GitHub"
                                        className="object-cover w-full h-full rounded-lg"
                                    />
                                </div>
                            </div>
                            <div className="lg:col-span-2 space-y-4">
                                <h3 className="text-2xl font-bold text-foreground font-mono">Kattis Solutions</h3>
                                <p className="text-foreground/80 font-mono leading-relaxed">
                                    A repository full of all my Kattis Solutions.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-foreground/10 text-foreground font-mono text-sm rounded">
                                        C++
                                    </span>
                                    <span className="px-3 py-1 bg-foreground/10 text-foreground font-mono text-sm rounded">
                                        Kattis
                                    </span>
                                </div>
                                <div className="flex gap-4">
                                    <a 
                                        href="https://github.com/msmith-codes/KattisSolutions" 
                                        target="_blank"
                                        className="px-4 py-2 text-foreground/80 hover:text-foreground transition-colors font-mono"
                                    >
                                        Source Code →
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Other Projects Section */}
                <section className="space-y-8">
                    <h2 className="text-3xl font-bold text-foreground font-mono">Other Projects</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Small Project Card 1 */}
                        <div className="border border-foreground/20 rounded-lg p-4 hover:border-foreground/40 transition-colors">
                            <div className="bg-foreground/10 rounded-lg h-32 mb-4 flex items-center justify-center">
                                <Image 
                                        src={"/portfolio/archbtw.png"} 
                                        width={300} 
                                        height={150} 
                                        alt="Image of IUseArchBtw."
                                        className="object-cover w-full h-full rounded-lg"
                                    />
                            </div>
                            <h3 className="text-lg font-bold text-foreground font-mono mb-2">iusearchbtw</h3>
                            <p className="text-foreground/80 font-mono text-sm mb-3">
                                A esoteric programming language made because I could.
                            </p>
                            <div className="flex gap-2 mb-3">
                                <span className="px-2 py-1 bg-foreground/10 text-foreground font-mono text-xs rounded">
                                    C++
                                </span>
                                <span className="px-2 py-1 bg-foreground/10 text-foreground font-mono text-xs rounded">
                                    CMake
                                </span>
                            </div>
                            <a 
                                href="https://github.com/msmith-codes/IUseArchBtw/"
                                target='_blank' 
                                className="text-foreground/80 hover:text-foreground transition-colors font-mono text-sm"
                            >
                                View →
                            </a>
                        </div>
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
