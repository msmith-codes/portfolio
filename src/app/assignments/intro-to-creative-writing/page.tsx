import Link from "next/link";
import PageHero from "~/_components/PageHero";

export default function CreativeWritingPage()
{
    return (
        <main className="flex flex-col row-start-2">
            <PageHero line1="Intro to Creative Writing" line2="Assignments" back="/assignments"/>
            <section id="next-section" className="bg-gray-800 flex flex-col justify-center items-center text-center gap-10 min-h-screen">
                <p className="text-red-500 text-2xl"><strong>Fall 2025</strong></p>
                <p className="text-white text-6xl">Assignments</p>
                <p className="text-slate-500 text-xl">------------------</p>
                <ol>
                    <li><a href={"/work/web-programming-1/assignment-1/project01-01.html"}>Assignment: Hands-On Project 1-3</a></li>
                </ol>
            </section>
         </main>
    );
}