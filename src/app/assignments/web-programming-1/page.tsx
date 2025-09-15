import Link from "next/link";
import PageHero from "~/_components/PageHero";

export default function WebProgramming1Page()
{
    return (
        <main className="flex flex-col row-start-2">
            <PageHero line1="Web Programming 1" line2="Assignments" back="/assignments"/>
            <section id="next-section" className="bg-gray-800 flex flex-col justify-center items-center text-center gap-10 min-h-screen">
                <p className="text-red-500 text-2xl"><strong>Fall 2025</strong></p>
                <p className="text-white text-6xl">Assignments</p>
                <p className="text-slate-500 text-xl">------------------</p>
                <ol>
                    <li><a href={"/work/web-programming-1/case_study/index.html"}>Case Study: Rubik's Cube Timer</a></li>
                    <li><a href={"/work/web-programming-1/assignments/project01-01.html"}>Assignment: Hands-On Project 1-1</a></li>
                    <li><a href={"/work/web-programming-1/assignments/project01-02.html"}>Assignment: Hands-On Project 1-2</a></li>
                    <li><a href={"/work/web-programming-1/assignments/project01-03.html"}>Assignment: Hands-On Project 1-3</a></li>
                    <li><a href={"/work/web-programming-1/in_class/loan_calculator/index.html"}>In Class: Loan Calculator</a></li>
                    <li><a href={"/work/web-programming-1/assignments/project02-01.html"}>Assignment: Hands-On Project 2-1</a></li>
                    <li><a href={"/work/web-programming-1/assignments/project02-02.html"}>Assignment: Hands-On Project 2-2</a></li>
                    <li><a href={"/work/web-programming-1/assignments/project02-03.html"}>Assignment: Hands-On Project 2-3</a></li>
                    <li><a href={"/work/web-programming-1/assignments/project02-04.html"}>Assignment: Hands-On Project 2-4</a></li>
                </ol>
            </section>
         </main>
    );
}
