export default function About() {
    return (
        <main className="max-w-6xl mx-auto px-12 py-8">
            <div className="space-y-8">
                {/* Page Title */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-foreground font-mono mb-4">About Me</h1>
                    <div className="w-24 h-0.5 bg-foreground/20 mx-auto"></div>
                </div>

                {/* Introduction Section */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground font-mono">Hello, I'm Michael</h2>
                    <p className="text-foreground/80 font-mono text-lg leading-relaxed">
                        I enjoy developing games and software!
                    </p>
                </section>

                {/* Background Section */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground font-mono">Education</h2>
                    <ul className="text-foreground/80 font-mono">
                        <li>Pennsylvania Western University at Edinboro - Applied Computing</li>
                    </ul>
                </section>

                {/* Skills & Expertise */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground font-mono">Skills & Expertise</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <h3 className="text-xl font-bold text-foreground font-mono mb-2">Software Development</h3>
                            <ul className="text-foreground/80 font-mono">
                                <li>C/C++</li>
                                <li>Go</li>
                                <li>Java</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-foreground font-mono mb-2">Web Development</h3>
                            <ul className="text-foreground/80 font-mono">
                                <li>Next.js</li>
                                <li>HTML/CSS/JS</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-foreground font-mono mb-2">Editor and Setup</h3>
                            <ul className="text-foreground/80 font-mono">
                                <li>Editor: NeoVim</li>
                                <li>OS: Arch Linux</li>
                                <li>Shell: Bash</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Current Focus */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground font-mono">Current Focus</h2>
                    <p className="text-foreground/80 font-mono leading-relaxed">
                        Currently I'm developing a small FPS called Mexel. 
                        The project is still in early development, but more information coming soon!
                    </p>
                </section>

                {/* Personal Touch */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground font-mono">Beyond Code</h2>
                    <p className="text-foreground/80 font-mono leading-relaxed">
                        I enjoy video games, hockey, writing, music, and 3D printing.
                    </p>
                </section>

                {/* Call to Action */}
                <section className="text-center pt-8">
                    <p className="text-foreground/80 font-mono mb-6">
                        Interested in working together or just want to chat?
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
