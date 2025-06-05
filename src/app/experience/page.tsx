"use client";

import Button from "~/_components/Button";
import PageHero from "~/_components/PageHero";

export default function ExperiencePage()
{
    return(
        <main className="flex flex-col row-start-2">
            <PageHero line1="My Journey Through Code" line2="Here's what I've built"/>
            <section id="next-section" className="bg-gray-800 flex flex-col justify-center items-center text-center gap-10 min-h-screen">
                <p className="text-red-500 text-2xl"><strong>IT & Software Engineer Intern</strong></p>
                <p className="text-white text-6xl">GS RETAIL SERVICES</p>
                <p className="text-white text-2xl"><strong>May 2025 - Present</strong></p>
                <p className="text-slate-500 text-xl">------------------</p>
                <p className="text-white text-md text-left max-w-200">
                    Worked in a team to create a lightweight order and inventory management application for a client of GS Retail Services. My teammate and I adhered to 
                    the principles of the Software Development Life Cycle to ensure a high quality product. We interfaced with the stakeholder to gather requirements and
                    planned our work and goals via Agile Project Management Methodologies. <br/>
                    <br/>
                    The datastore used PostgreSQL with a backend REST API written in Go. The frontend used Next.JS to allow seamless access to the datastore.
                </p>
            </section>
            <section id="tutoring" className="bg-gray-700 flex flex-col justify-center items-center text-center gap-10 min-h-screen">
                <p className="text-red-500 text-2xl"><strong>Tutor</strong></p>
                <p className="text-white text-6xl">FREELANCE</p>
                <p className="text-white text-2xl"><strong>March 2025 - Present</strong></p>
                <p className="text-slate-500 text-xl">------------------</p>
                <p className="text-white text-md text-left max-w-200">
                    I offer freelance programming tutoring focused on helping students and professionals grow their skills through personalized, hands-on sessions. 
                    From foundational concepts to advanced problem-solving, I tailor each session to meet the unique goals of my clients. This role has sharpened my 
                    ability to communicate technical concepts clearly, adapt to diverse learning styles, and deliver real value through mentorship.
                </p>
                <Button 
                    color="bg-blue-600"
                    hoverColor="bg-blue-700"
                    fontColor="text-white"
                    href="/tutoring"
                    target="_self"
                    label="Learn More!"
                />

            </section>
            <section id="tutoring" className="bg-gray-800 flex flex-col justify-center items-center text-center gap-10 min-h-screen">
                <p className="text-red-500 text-2xl"><strong>Volunteer</strong></p>
                <p className="text-white text-6xl">COMPUTER REACH</p>
                <p className="text-white text-2xl"><strong>2016 - 2022</strong></p>
                <p className="text-slate-500 text-xl">------------------</p>
                <p className="text-white text-md text-left max-w-200">
                    At Computer Reach, I disassembled, assembed, and re-imaged computers for recycling that would then be donated to communities and schools.  
                </p>
            </section>
        </main>
    )
}
