"use client";
import ButtonList, { ButtonItem } from "~/_components/ButtonList";
import CodeBlock from "~/_components/CodeBlock";
import PageHero from "~/_components/PageHero";

export default function CPPGettingStarted()
{
    const scrollToWindows = () => {
        scrollToSection("windows");
    }

    const scrollToMacOS = () => {
        scrollToSection("macos");
    }

    const scrollToLinux = () => {
        scrollToSection("linux");
    }

    const os : ButtonItem[] = [
        { label: "Windows", target: '_self', onClick: scrollToWindows },
        { label: "macOS", target: '_self', onClick: scrollToMacOS },
        { label: "Linux", target: '_self', onClick: scrollToLinux },
    ]; 

    const mingwLink : string = "https://www.msys2.org/"

    const scrollToSection = (section : string) => {
        const nextSection = document.getElementById(section);
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return(
        <main className="flex flex-col row-start-2">
            <PageHero line1="C++" line2="Getting Started" />
            <section id="next-section" className="bg-gray-800 flex flex-col justify-center items-center text-center gap-10 min-h-screen">
                <p className="text-white text-6xl">Select Your Operating System</p>
                <ButtonList buttons={os} color="bg-blue-600" hoverColor="bg-blue-700" fontColor="text-white" /> 
                <p className="text-slate-500 text-xl">------------------</p>
            </section>
            <section id="windows" className="bg-gray-700 flex flex-col justify-center items-center text-center gap-10 min-h-350">
                <p className="text-red-500 text-2xl"><strong>GETTING STARTED</strong></p>
                <p className="text-white text-6xl">WINDOWS 10/11</p>
                <p className="text-white text-md text-left max-w-200">
                    Installing C++ on Windows is a bit more complicated than on other operating systems. In this guide we will be using the MinGW compiler via MSYS2. 
                    MinGW is a port of the GNU Compiler Collection (GCC) to Windows.
                </p>
                <ol className="list-decimal text-left max-w-180 list-inside mt-4">
                    <li>Download the MYS2 installer from the <a href={mingwLink}><span className="text-blue-400 text-underline">MSYS2 website</span></a></li> 
                    <li>
                        In the installation wizard, choose a destination folder for MSYS2 to install too. In more cases using the default path
                        is recommended. 
                    </li>
                    <li>Click <strong>Next</strong></li>
                    <li>When done make sure <strong>Run MSYS2 now</strong> is checked. Then click <strong>Finish</strong>.</li>
                    <li>
                        A terminal window will open. In the termainl window, type the following command. This will install the MinGW-w64 toolchain.
                        <CodeBlock
                            language="shell"
                            code={`pacman -S --needed base-devel mingw-w64-ucrt-x86_64-toolchain`}
                        />
                    </li>
                    <li> Make sure you accept the default number of packages in the tool chain by pressing <strong>Enter</strong></li>
                    <li>Enter <strong>Y</strong> when prompted if you want to proceed with the installation.</li>
                    <li>
                        After installed you need to add your MinGW bin folder to your Window's PATH.
                        <ol className="list-decimal text-left pl-12 max-w-160 list-inside mt-4">
                            <li>Press the Windows key and search for "<strong>Edit environment variables</strong>" for your account.</li>
                            <li>In the <strong>User</strong> variables section find and select the <strong>Path</strong> variable and click <strong>Edit</strong>.</li>
                            <li>
                                A popup will appear. Click New and paste the path to your MinGW bin folder. By default, it will be:
                                <CodeBlock
                                    language="shell"
                                    code={`C:\\msys64\\ucrt64\\bin`}
                                />
                            </li>
                            <li>Click OK on all the windows to close them.</li>
                        </ol>
                    </li>
                    <li>
                        Verify that MinGW is installed by opening a command prompt and typing:
                        <CodeBlock
                            language="shell"
                            code={`g++ --version\ngcc --version\ngdb --version`}
                        />
                    </li>
                </ol>
            </section>
            <section id="macos" className="bg-gray-800 flex flex-col justify-center items-center text-center gap-10 min-h-200">
                <p className="text-red-500 text-2xl"><strong>GETTING STARTED</strong></p>
                <p className="text-white text-6xl">macOS</p>
                <p className="text-white text-md text-left max-w-200">
                    Installing a C++ via Clang on macOS is very easy. Here is how you can install it.
                </p>
                <ol className="list-decimal text-left max-w-180 list-inside mt-4">
                    <li>
                        Open a terminal window and type the following command to check if Clang is installed.
                        <CodeBlock
                            language="shell"
                            code={`clang --version`}
                        />

                    </li> 
                    <li>
                        If it is not installed you can install it by typing the following command.
                        <CodeBlock
                            language="shell"
                            code={`xcode-select --install`}
                        />
                    </li>
                    <li>If this fails to may need to install Xcode from the Apple App Store. Do that then try the command above again.</li>
                </ol>
            </section>
            <section id="linux" className="bg-gray-700 flex flex-col justify-center items-center text-center gap-10 min-h-370">
                <p className="text-red-500 text-2xl"><strong>GETTING STARTED</strong></p>
                <p className="text-white text-6xl">LINUX</p>
                <p className="text-white text-md text-left max-w-200">
                    Installing a C++ via GNU on Linux is very easy. Here is how you can install it depending on your distro.
                </p>
                <ol className="list-decimal text-left max-w-180 list-inside mt-4">
                    <li>
                        Open a terminal window and type the following command to check if GCC is installed.
                        <CodeBlock
                            language="shell"
                            code={`gcc --version`}
                        />

                    </li> 
                    <li>
                        If it is not installed you can install it by typing the following command.<br/>
                        <br/>
                        <p className="text-white text-xl">Arch / Manjaro</p>
                        <CodeBlock
                            language="shell"
                            code={`sudo pacman -S base-devl gdb`}
                        />

                        <p className="text-white text-xl">Ubuntu / Debian</p>
                        <CodeBlock
                            language="shell"
                            code={`sudo apt update\nsudo apt install build-essentials gdb`}
                        />

                        <p className="text-white text-xl">Fedora / RHEL / CentOS</p>
                        <CodeBlock
                            language="shell"
                            code={`sudo dnf groupinstall "Development Tools"\nsudo dnf install gdb`}
                        />
                        
                        <p className="text-white text-xl">openSUSE</p>
                        <CodeBlock
                            language="shell"
                            code={`sudo zypper install -t pattern devel_C_C++\nsudo zypper install gdb`}
                        />

                        <p className="text-white text-xl">Alpine Linux</p>
                        <CodeBlock
                            language="shell"
                            code={`sudo apk add base-build gdb`}
                        />

                    </li>
                </ol>
            </section>

        </main>
    )
}
