import Link from "next/link";

// Blog articles data
const blogArticles = [
    {
        id: 1,
        slug: "getting-started-with-game-engines",
        title: "Getting Started with Game Engines",
        description: "An introduction to building your first game engine from scratch, covering the basics of rendering, input handling, and game loops.",
        date: "2025-11-15",
        readTime: "8 min read",
        tags: ["Game Development", "C++", "OpenGL"]
    }
];

export default function BlogPage()
{
    return (
        <main className="max-w-6xl mx-auto px-12 py-8">
            <div className="space-y-12">
                {/* Page Title */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-foreground font-mono mb-4">Blog</h1>
                    <p className="text-foreground/80 font-mono text-lg">
                        Thoughts on game development, programming, and technology
                    </p>
                    <div className="w-24 h-0.5 bg-foreground/20 mx-auto mt-4"></div>
                </div>

                {/* Articles Grid */}
                <section className="space-y-6">
                    {blogArticles.map((article) => (
                        <Link 
                            key={article.id}
                            href={`/blog/${article.slug}`}
                            className="block border border-foreground/20 rounded-lg p-6 hover:border-foreground/40 transition-colors group"
                        >
                            <div className="space-y-3">
                                {/* Title */}
                                <h2 className="text-2xl font-bold text-foreground font-mono group-hover:text-foreground/80 transition-colors">
                                    {article.title}
                                </h2>
                                
                                {/* Meta Info */}
                                <div className="flex flex-wrap gap-4 text-sm text-foreground/60 font-mono">
                                    <span>{new Date(article.date).toLocaleDateString('en-US', { 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric' 
                                    })}</span>
                                    <span>•</span>
                                    <span>{article.readTime}</span>
                                </div>

                                {/* Description */}
                                <p className="text-foreground/80 font-mono leading-relaxed">
                                    {article.description}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {article.tags.map((tag) => (
                                        <span 
                                            key={tag}
                                            className="px-3 py-1 bg-foreground/10 text-foreground/70 font-mono text-xs rounded"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Read More Arrow */}
                                <div className="flex items-center gap-2 text-foreground/60 font-mono text-sm pt-2">
                                    <span className="group-hover:text-foreground transition-colors">Read article</span>
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </section>

                {/* Empty State (if no articles) */}
                {blogArticles.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-foreground/60 font-mono">
                            No articles yet. Check back soon!
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}