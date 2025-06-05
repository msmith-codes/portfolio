"use client";

import { Typewriter } from "react-simple-typewriter";
import ButtonList, { ButtonItem } from "~/_components/ButtonList";
import RoundedImage from "~/_components/RoundedImage";

export default function HomePage() 
{
    const buttons : ButtonItem[] = [
        { label: "Experience", target: '_self', href: "/experience" },
        { label: "Tutoring", target: '_self', href: "/tutoring" },
        { label: "Resources", target: '_self', href: "/resources" }
    ]

    return (
        <main className="flex flex-col row-start-2">
            <section id="hero" className="flex flex-col justify-center items-center text-center gap-4 min-h-screen">
                <RoundedImage 
                    displayWidth={64}
                    displayHeight={64}
                    imgHeight={400}
                    imgWidth={400}
                    src={"/imgs/profile.jpeg"}
                    alt={"Photo of me!"}
                    borderStyle="border-4 border-white"
                />
                <p className="text-2xl font-jetbrains font-medium text-white">
                    <Typewriter
                        words={["Michael Smith", "Backend Programmer", "Programming Tutor"]}
                        loop={true}
                        cursor
                        cursorStyle="_"
                        typeSpeed={70}
                        deleteSpeed={80}
                        delaySpeed={2000}
                    />
                </p>
                <ButtonList buttons={buttons} color="bg-blue-600" hoverColor="bg-blue-700" fontColor="text-white" /> 
            </section>
        </main>
  );
}
