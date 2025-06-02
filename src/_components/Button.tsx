interface ButtonProps
{
    color : string;
    hoverColor : string;
    fontColor : string;
    href : string;
    target : '_top' | '_self' | '_blank' | '_parent';
    label : string;
}

export default function Button(props : ButtonProps)
{
   return(
        <div className="flex flex-col items-center gap-4">
            <a 
                href={props.href} 
                target={props.target}
                className={`w-128 text-center px-6 py-3 rounded-full ${props.color} ${props.fontColor} font-semibold hover:${props.hoverColor} transition`}
            >
                {props.label}
            </a>
        </div>
   ); 
}
