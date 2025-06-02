import HomeButton from "./HomeButton";
import KeepScrolling from "./KeepScrolling";

interface PageHeroProps
{
    line1 : string;
    line2 : string;
}

export default function PageHero(props : PageHeroProps)
{
    return(
        <>
            <section id="hero" className="flex flex-col justify-center items-center text-center gap-4 min-h-screen">
                <p className="text-4xl">{props.line1}<br/>{props.line2}</p>
                <HomeButton />
                <KeepScrolling />
            </section>
        </>
    );
}
