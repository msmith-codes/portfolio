
export default function TravelsPage()
{
    return (
        <main className="max-w-6xl mx-auto px-12 py-8">
            <div className="space-y-8">
                {/* Page Title */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-foreground font-mono mb-4">My Travels</h1>
                    <div className="w-24 h-0.5 bg-foreground/20 mx-auto"></div>
                </div>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground font-mono">United States</h2>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground font-mono">Canada</h2>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground font-mono">Europe</h2>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground font-mono">Asia</h2>
                </section>

            </div>
        </main>
    );
}
