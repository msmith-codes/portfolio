export default function Contact() {
    return (
        <main className="max-w-6xl mx-auto px-12 py-8">
            <div className="space-y-8">
                {/* Page Title */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-foreground font-mono mb-4">Contact</h1>
                    <div className="w-24 h-0.5 bg-foreground/20 mx-auto"></div>
                </div>

                {/* Email */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground font-mono">Email</h2>
                    <p className="text-foreground/80 font-mono text-lg leading-relaxed">
                        <a target="_blank" href="mailto:msmith.softwaredev@gmail.com">msmith.softwaredev@gmail.com</a>
                    </p>
                </section>

                {/* LinkedIn */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground font-mono">LinkedIn</h2>
                    <p className="text-foreground/80 font-mono text-lg leading-relaxed">
                        <a target="_blank" href="https://www.linkedin.com/in/msmith-codes/">https://www.linkedin.com/in/msmith-codes/</a>
                    </p>
                </section>

                {/* LinkedIn */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground font-mono">GitHub</h2>
                    <p className="text-foreground/80 font-mono text-lg leading-relaxed">
                        <a target="_blank" href="https://github.com/msmith-codes">https://github.com/msmith-codes</a>
                    </p>
                </section>

            </div>
        </main>
    );
}
