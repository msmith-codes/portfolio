import KeepScrolling from "./KeepScrolling";

interface PageHeroProps
{
    line1 : string;
    line2 : string;
    back : string;
}

export default function PageHero(props : PageHeroProps)
{
    return(
        <>
            <section id="hero" className="flex flex-col justify-center items-center text-center gap-4 min-h-screen">
                 <div className="absolute top-0 left-0 w-full p-4 flex justify-start">
                    <p className="text-2xl"><a href={props.back}>Back</a></p>
                </div>
                <p className="text-4xl">{props.line1}<br/>{props.line2}</p>
                <KeepScrolling />
            </section>
        </>
    );
}
