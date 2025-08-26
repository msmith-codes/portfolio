export interface ButtonItem
{
    label : string;
    href? : string;
    onClick? : (() => void);
    target : '_top' | '_self' | '_blank' | '_parent';
}


interface ButtonListProps {
    buttons: ButtonItem[];
}

export default function ButtonList(props: ButtonListProps) {
    return (
        <div className="flex flex-col items-center gap-4">
            {props.buttons.map((btn: ButtonItem, idx: number) => {
                if (btn.href) {
                    return (
                        <a
                            key={idx}
                            href={btn.href}
                            target={btn.target}
                            className="button w-128 text-center"
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
                    >
                        {btn.label}
                    </button>
                );
            })}
        </div>
    );
}

