"use client";

import Button from "~/_components/Button";

export default function LearnPage()
{
    return(
        <main className="flex flex-col row-start-2">
            <section id="hero" className="flex flex-col justify-center items-center text-center gap-4 min-h-screen">
                <p className="text-4xl">Learn Programming<br/>Through Game Development</p>
                <p className="text-2xl">Programming is hard, but let's make it fun.</p>
            </section>
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
                   color="blue-600"
                    hoverColor="blue-700"
                    fontColor="white"
                    href="#"
                    target="_blank"
                    label="Apply Now!"
                />
                <i>Keep scrolling if you want to learn more</i>
            </section>
            <section id="solution" className="bg-gray-700 flex flex-col justify-center items-center text-center gap-10 min-h-400">
                <p className="text-white text-6xl">THE <br /> SOLUTION</p>
                <p className="text-slate-500 text-xl">------------------</p>
                <p className="text-white text-md text-left max-w-200">
                    Newer programmers often face a variety of struggles, and recognizing them early can really speed up learning. 
                    Here are some common issues newer programmers may run into.
                </p>

                <p className="text-white text-lg"><strong>Conceptual Knowledge</strong></p>
                <p className="text-white text-md text-left max-w-200">
                    Many beginners struggle to understand how code executes step-by-step. Concepts like control flow, recursion, 
                    and how memory works can be confusing. Abstract thinking—breaking a problem into smaller parts—is also a common 
                    hurdle. Variables, scopes, and state are often misunderstood.
                </p>

                <p className="text-white text-lg"><strong>Technical Knowledge</strong></p>
                <p className="text-white text-md text-left max-w-200">
                    Debugging effectively is one of the hardest things to learn early on. New coders also struggle with tools like Git 
                    and don't know how to interpret compiler or runtime errors.
                
                    Asynchronous programming, file I/O, and configuring local environments can all be overwhelming at first.
                </p>

                <p className="text-white text-lg"><strong>Programming Paradigms and Best Practices</strong></p>
                <p className="text-white text-md text-left max-w-200">
                    Writing clean, modular code is something that takes time to develop. Object-oriented programming (OOP), functional programming, 
                    and concepts like encapsulation or abstraction are tough to grasp.
                    Beginners often underutilize functions and overcomplicate logic.
                </p>

                <p className="text-white text-lg"><strong>Mindset and Learning Approach</strong></p>
                <p className="text-white text-md text-left max-w-200">
                    Many new programmers get stuck in "tutorial hell"—relying too much on copying tutorials without building projects themselves.
                    Impatience, fear of failure, and perfectionism can slow down progress. It's important to embrace mistakes and experiment.
                </p>

                <p className="text-white text-lg"><strong>Environment and Tools</strong></p>
                <p className="text-white text-md text-left max-w-200">
                    Setting up environments (IDEs, dependencies, virtual environments, etc.) can be frustrating.
                    Even basic tools like VSCode, linters, or build tools can feel overwhelming. Knowing how to use a terminal, manage packages,
                    or debug efficiently takes time.
                </p>
            </section>
        </main>

    )
}
