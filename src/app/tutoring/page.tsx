"use client";

import Button from "~/_components/Button";
import PageHero from "~/_components/PageHero";

export default function TutoringPage()
{
    return(
        <main className="flex flex-col row-start-2">
            <PageHero line1="Learn Programming" line2="Tailored To Your Needs!"/>
            <section id="truth" className="bg-gray-800 flex flex-col justify-center items-center text-center gap-10 min-h-screen">
                <p className="text-red-500 text-2xl"><strong>THE TRUTH:</strong></p>
                <p className="text-white text-6xl">PROGRAMMING IS A <br/> CHALLENGE</p>
                <p className="text-slate-500 text-xl">------------------</p>
                <p className="text-white text-md text-left max-w-200">
                    Programming isn't just about writing lines of code - it's about solving problems, building logic from scratch, 
                    and constantly learning. It's a mental workout that pushes your creativity, persistance, and attention to detail. 
                    From debugging elusive errors to architecting entire systems, every step demands focus and determination. But that's 
                    what makes programming so rewarding. Every challenge you overcome is a skill gained, a concept mastered, and a step 
                    closer to bringing your vision to life. Embrace the struggle - because that's where growth really happens. 
                </p>
                <Button 
                    color="bg-blue-600"
                    hoverColor="bg-blue-700"
                    fontColor="text-white"
                    href="https://forms.gle/uFGqVn5mZSPQ19ow7"
                    target="_blank"
                    label="Contact Me!"
                />
                {/* <i>Keep scrolling if you want to learn more</i> */}
            </section>
        </main>
    )
}
