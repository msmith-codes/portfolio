export interface ButtonItem
{
    label : string;
    href? : string;
    onClick? : (() => void);
    target : '_top' | '_self' | '_blank' | '_parent';
}

interface ButtonListProps
{
    buttons : ButtonItem[]; 
    color : string;
    hoverColor : string;
    fontColor : string;
}

export default function ButtonList(props: ButtonListProps) {
    return (
        <div className="flex flex-col items-center gap-4">
            {props.buttons.map((btn: ButtonItem, idx: number) => {
                const commonClasses = `w-128 text-center px-6 py-3 rounded-full ${props.color} ${props.fontColor} font-semibold hover:${props.hoverColor} transition`;

                if (btn.href) {
                    return (
                        <a
                            key={idx}
                            href={btn.href}
                            target={btn.target}
                            className={commonClasses}
                        >
                            {btn.label}
                        </a>
                    );
                }

                return (
                    <button
                        key={idx}
                        onClick={btn.onClick || undefined}
                        className={commonClasses}
                    >
                        {btn.label}
                    </button>
                );
            })}
        </div>
    );
}

