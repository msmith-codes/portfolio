import Image from "next/image";

export default function HomePage() 
{
    return (
        <main className="max-w-6xl mx-auto px-12 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2 space-y-4">
                    <h1 className="text-2xl font-bold text-foreground font-mono">Hey there!</h1>
                    <p className="text-foreground font-mono">
                        Welcome to my small corner of the internet. I'm Michael — a game and software programmer.
                        This site showcases my projects, experiments, and the tools I use to build them.
                        Browse the portfolio to see completed work, check the blog for development notes, or get in touch to collaborate.
                    </p>
                </div>
                <div className="lg:col-span-1 flex justify-center lg:justify-end">
                    <div className="relative w-64 h-64 rounded-full overflow-hidden border-2 border-foreground/20">
                        <Image 
                            src="/msmith.jpeg"
                            alt="Michael Smith"
                            width={256}
                            height={256}
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            </div>
        </main>
  );
}
