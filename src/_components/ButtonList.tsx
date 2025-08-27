export interface ButtonItem
{
    label : string;
    href? : string;
    onClick? : (() => void);
    target : '_top' | '_self' | '_blank' | '_parent';
}


interface ButtonListProps {
    buttons: ButtonItem[];
    color: string;
    hoverColor: string;
    fontColor: string;
}

export default function ButtonList(props: ButtonListProps) {
    const { buttons, color, hoverColor, fontColor } = props;
    return (
        <div className="flex flex-col items-center gap-4">
            {buttons.map((btn: ButtonItem, idx: number) => {
                const baseStyle = {
                    backgroundColor: color,
                    color: fontColor,
                    transition: 'background-color 0.2s',
                };
                const handleMouseOver = (e: React.MouseEvent<HTMLElement>) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = hoverColor;
                };
                const handleMouseOut = (e: React.MouseEvent<HTMLElement>) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = color;
                };
                if (btn.href) {
                    return (
                        <a
                            key={idx}
                            href={btn.href}
                            target={btn.target}
                            className="button w-128 text-center"
                            style={baseStyle}
                            onMouseOver={handleMouseOver}
                            onMouseOut={handleMouseOut}
                        >
                            {btn.label}
                        </a>
                    );
                }
                return (
                    <button
                        key={idx}
                        onClick={btn.onClick || undefined}
                        className="button w-128 text-center"
                        style={baseStyle}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                    >
                        {btn.label}
                    </button>
                );
            })}
        </div>
    );
}

