export interface MapLocation
{
    id : string;
    name : string;
    path : string;
}

interface SvgMapProps
{
    viewBox : string;
    locations : MapLocation[];
    visited : string[];
    label? : string;
    className? : string;
}

// Generic renderer for the @svg-maps/* datasets: black outlines, with any
// location whose id is in `visited` filled in green.
export default function SvgMap(props : SvgMapProps)
{
    const visitedIds = new Set(props.visited.map((id) => id.toLowerCase()));

    return (
        <svg
            viewBox={props.viewBox}
            role="img"
            aria-label={props.label}
            className={props.className ?? "w-full h-auto"}
        >
            {props.locations.map((location) =>
            {
                const isVisited = visitedIds.has(location.id.toLowerCase());

                return (
                    <path
                        key={location.id}
                        d={location.path}
                        vectorEffect="non-scaling-stroke"
                        strokeWidth={1}
                        strokeLinejoin="round"
                        className="transition-colors duration-150 hover:opacity-80"
                        style={{
                            fill: isVisited ? "#22c55e" : "var(--background)",
                            stroke: "var(--foreground)",
                        }}
                    >
                        <title>{location.name}</title>
                    </path>
                );
            })}
        </svg>
    );
}
