import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
    variable: "--font-jetbrains",
    subsets: ["latin"],
    display: "swap"
})

export const metadata: Metadata = {
    title: "msmith.codes",
    description: "I'm spending every change I get to learn new technologies.",
};

interface RootLayoutProps
{
    children : React.ReactNode;
};

export default function RootLayout(props : RootLayoutProps) 
{
    return (
        <html lang="en">
            <body className={`${jetbrainsMono.className} antialiased`}>
                {props.children}
            </body>
        </html>
    );
}
