
interface ButtonProps {
    href: string;
    target: '_top' | '_self' | '_blank' | '_parent';
    label: string;
    color: string;
    hoverColor: string;
    fontColor: string;
}


export default function Button(props: ButtonProps) {
    const { href, target, label, color, hoverColor, fontColor } = props;
    return (
        <div className="flex flex-col items-center gap-4">
            <a
                href={href}
                target={target}
                className="button w-128 text-center"
                style={{
                    backgroundColor: color,
                    color: fontColor,
                    transition: 'background-color 0.2s',
                }}
                onMouseOver={e => (e.currentTarget.style.backgroundColor = hoverColor)}
                onMouseOut={e => (e.currentTarget.style.backgroundColor = color)}
            >
                {label}
            </a>
        </div>
    );
}
