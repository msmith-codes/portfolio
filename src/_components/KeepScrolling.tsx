"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function KeepScrolling()
{
    const [visible, setVisible] = useState(true);
    
    useEffect(() => {
        const onScroll = () => {
            if(window.scrollY > 100) {
                setVisible(false);
            } else {
                setVisible(true);
            }
        };
        window.addEventListener("scroll", onScroll);

        return() => window.removeEventListener("scroll", onScroll);
    });

    const scrollToNextSection = () => {
        const nextSection = document.getElementById("next-section");
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        visible && (
            <motion.div
                onClick={scrollToNextSection}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white flex flex-col items-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                >
                    <ChevronDown className="w-16 h-16" />
                </motion.div>
                <p className="text-slate-500 text-lg">Keep Scrolling Down</p>
            </motion.div>
        )
    ); 
}
