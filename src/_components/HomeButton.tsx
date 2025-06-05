import Button from "./Button";

export default function HomeButton()
{
    return(
        <>
            <div className="flex flex-col items-center gap-4">
                <a 
                    href="/"                    
                    target="_self"
                    className={`w-32 text-center px-6 py-3 rounded-lg bg-blue-600 textehite font-semibold hover:bg-blue-700 transition`}
                >
                    Home
                </a>
            </div>
        </>
    )
}
