'use client';

import { useState, useEffect } from 'react';

interface NavigationButtonProps
{
    label : string;
    href : string;
    target : '_blank' | '_parent' | '_self' | '_top';
}


function NavigationButton(props : NavigationButtonProps)
{
    return (
        <a target={props.target} href={props.href} className="px-4 py-2 text-foreground hover:text-foreground/80 transition-colors font-mono">
            {props.label}
        </a>
    );
}

export default function NavigationBar()
{
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Check if there's a saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setIsDarkMode(savedTheme === 'dark');
            applyTheme(savedTheme === 'dark');
        }
    }, []);

    const applyTheme = (dark: boolean) => {
        const root = document.documentElement;
        if (dark) {
            root.style.setProperty('--background', '#0a0a0a');
            root.style.setProperty('--foreground', '#ededed');
        } else {
            root.style.setProperty('--background', '#ededed');
            root.style.setProperty('--foreground', '#0a0a0a');
        }
    };

    const toggleTheme = () => {
        const newTheme = !isDarkMode;
        setIsDarkMode(newTheme);
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    };

    return (
        <nav className="w-full p-6">
            {/* Header with name and title */}
            <div className="mb-4 flex items-center gap-4">
                <h1 className="text-2xl font-bold text-foreground font-mono">Michael Smith</h1>
                <p className="text-lg text-foreground/80 font-mono">Game | Software Programmer</p>
                
                {/* Theme Toggle Button */}
                <button 
                    onClick={toggleTheme}
                    className="ml-auto px-3 py-1 text-sm text-foreground hover:text-foreground/80 transition-colors font-mono border border-foreground/20 rounded"
                >
                    {isDarkMode ? '☀️ Light' : '🌙 Dark'}
                </button>
            </div>            {/* Horizontal line */}
            <hr className="border-foreground/20 mb-4" />
            
            {/* Navigation links */}
            <div className="flex gap-6">
                <NavigationButton label="Home" href="/" target='_self'/>
                <NavigationButton label="Portfolio" href="/portfolio" target='_self'/>
                <NavigationButton label="Resume" href="/resume" target='_self'/>
                <NavigationButton label="About" href="/about" target='_self'/>
                <NavigationButton label="Contact" href="/contact" target='_self' />
            </div>
        </nav>
    );
}