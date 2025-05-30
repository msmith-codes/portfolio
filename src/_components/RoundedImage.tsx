import Image from "next/image";

interface RoundedImageProps
{
    displayWidth : number;
    displayHeight : number;
    borderStyle : string;
    src : string;
    alt : string;
    imgWidth : number;
    imgHeight : number;
}

export default function RoundedImage(props : RoundedImageProps)
{
    return(
        <div className={`w-${props.displayWidth} h-${props.displayHeight} rounded-full ${props.borderStyle} overflow-hidden`}>
            <Image
                src={props.src}
                alt={props.alt}
                className="w-full h-full object-cover"
                width={props.imgWidth}
                height={props.imgHeight}
            />
        </div>

    )
}
