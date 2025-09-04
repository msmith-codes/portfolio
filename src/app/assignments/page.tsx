import Link from "next/link";
import PageHero from "~/_components/PageHero";

export default function AssignmentsPage()
{
    return (
        <main className="flex flex-col row-start-2">
            <PageHero line1="University Assignments" line2="What I did in school" back="/"/>
            <section id="next-section" className="bg-gray-800 flex flex-col justify-center items-center text-center gap-10 min-h-screen">
                <p className="text-red-500 text-2xl"><strong>CLASSES</strong></p>
                <p className="text-white text-6xl">Fall 2025</p>
                <p className="text-slate-500 text-xl">------------------</p>
                <ol>
                    <li><Link href={"/assignments/web-programming-1/"}>Web Programming 1</Link></li>
                    <li><Link href={"/assignments/intro-to-creative-writing/"}>Intro to Creative Writing</Link></li>
                </ol>
            </section>
         </main>
    );
}