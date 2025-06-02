import Button from "./Button";

export default function HomeButton()
{
    return(
        <>
            <Button
                color="bg-blue-600"
                hoverColor="bg-blue-800"
                fontColor="text-white"
                href="/"
                target="_self"
                label="Home"
            />
        </>
    )
}
