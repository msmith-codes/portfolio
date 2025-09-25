export default function NotFound() 
{
    return (
        <main className="max-w-6xl mx-auto px-12 py-8">
            <div className="text-center space-y-6">
                <h1 className="text-6xl font-bold text-foreground font-mono">404</h1>
                <h2 className="text-2xl font-bold text-foreground font-mono">Page Not Found</h2>
                <p className="text-foreground/80 font-mono text-lg">
                    Oops! It looks like you've wandered into uncharted territory.
                </p>
                <p className="text-foreground/60 font-mono">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <div className="pt-6">
                    <a 
                        href="/" 
                        className="inline-block px-6 py-3 text-foreground hover:text-foreground/80 transition-colors font-mono border border-foreground/20 rounded hover:border-foreground/40"
                    >
                        ← Back to Home
                    </a>
                </div>
            </div>
        </main>
    );
}
