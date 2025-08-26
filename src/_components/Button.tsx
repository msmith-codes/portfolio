
interface ButtonProps {
    href: string;
    target: '_top' | '_self' | '_blank' | '_parent';
    label: string;
}


export default function Button(props: ButtonProps) {
    return (
        <div className="flex flex-col items-center gap-4">
            <a
                href={props.href}
                target={props.target}
                className="button w-128 text-center"
            >
                {props.label}
            </a>
        </div>
    );
}
