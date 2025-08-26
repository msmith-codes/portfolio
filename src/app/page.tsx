"use client";

import { Typewriter } from "react-simple-typewriter";
import ButtonList, { ButtonItem } from "~/_components/ButtonList";
import ParticleBackground from "~/_components/ParticleBackground";
import RoundedImage from "~/_components/RoundedImage";


export default function HomePage() {
    const buttons: ButtonItem[] = [
        { label: "Experience", target: '_self', href: "/experience" },
        { label: "Tutoring", target: '_self', href: "/tutoring" },
        { label: "Resources", target: '_self', href: "/resources" },
    ];

    return (
        <main className="relative flex flex-col items-center justify-center min-h-screen bg-[var(--background)] px-4 overflow-hidden">
            <ParticleBackground />
            <section id="hero" className="w-full max-w-xl mx-auto flex flex-col items-center justify-center gap-8 py-12 relative z-10">
                <div className="bg-white dark:bg-[var(--muted)] rounded-2xl shadow-lg p-8 w-full flex flex-col items-center gap-6">
                    <RoundedImage
                        displayWidth={96}
                        displayHeight={96}
                        imgHeight={400}
                        imgWidth={400}
                        src={"/imgs/profile.jpeg"}
                        alt={"Photo of me!"}
                        borderStyle="border-4 border-[var(--primary)]"
                    />
                    <h1 className="text-3xl md:text-4xl font-bold text-[var(--primary)] mb-2">Michael Smith</h1>
                    <p className="text-lg md:text-xl font-medium text-[var(--foreground)] mb-4">
                        <Typewriter
                            words={["Backend Programmer", "Programming Tutor", "Game Developer"]}
                            loop={true}
                            cursor
                            cursorStyle="_"
                            typeSpeed={70}
                            deleteSpeed={80}
                            delaySpeed={2000}
                        />
                    </p>
                    <div className="w-full flex flex-col gap-4 mt-2">
                        <ButtonList buttons={buttons} />
                    </div>
                </div>
            </section>
        </main>
    );
}
