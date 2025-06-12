"use client";

import ButtonList, { ButtonItem } from "~/_components/ButtonList";
import PageHero from "~/_components/PageHero";

export default function ResourcesPage()
{
    const cpp : ButtonItem[] = [
        { label: "Getting Started", target: '_self', href: "resources/cpp/getting-started" },
        { label: "Makefiles", target: '_self', href: "resources/cpp/makefiles" },
    ]; 
    const java : ButtonItem[] = [
        { label: "Getting Started", target: '_self', href: "resources/java/getting-started" },
    ];
    const python : ButtonItem[] = [
        { label: "Getting Started", target: '_self', href: "resources/java/getting-started" },
    ];
    
    return(
        <main className="flex flex-col row-start-2">
            <PageHero line1="Free Learning Resources" line2="Tutorials, Tools and Tips for Every Programmer" />
            <section id="next-section" className="bg-gray-800 flex flex-col justify-center items-center text-center gap-10 min-h-screen">
                <p className="text-white text-6xl">C++</p>
                <ButtonList buttons={cpp} color="bg-blue-600" hoverColor="bg-blue-700" fontColor="text-white" /> 
                <p className="text-slate-500 text-xl">------------------</p>
            </section>
            {/*<section id="java" className="bg-gray-700 flex flex-col justify-center items-center text-center gap-10 min-h-screen">
                <p className="text-white text-6xl">Java</p>
                <ButtonList buttons={java} color="bg-amber-600" hoverColor="bg-amber-700" fontColor="text-white" /> 
                <p className="text-slate-500 text-xl">------------------</p>
            </section>
            <section id="java" className="bg-gray-800 flex flex-col justify-center items-center text-center gap-10 min-h-screen">
                <p className="text-white text-6xl">Python</p>
                <ButtonList buttons={python} color="bg-yellow-400" hoverColor="bg-yellow-500" fontColor="text-white" /> 
                <p className="text-slate-500 text-xl">------------------</p>
            </section>
            */}
        </main>
    )
}
