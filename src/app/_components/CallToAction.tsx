
export default function CallToAction()
{
    return (

        <section className="text-center p-6">
            <hr className="border-foreground/20 mb-4" />
            <p className="text-foreground/80 font-mono mb-6">
                Want to connect?
            </p>
            <a 
                href="/contact" 
                className="inline-block px-6 py-3 text-foreground hover:text-foreground/80 transition-colors font-mono border border-foreground/20 rounded hover:border-foreground/40"
            >
                Get in Touch
            </a>
        </section>
    );
    
}