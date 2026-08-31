import usa from "@svg-maps/usa";
import SvgMap from "./SvgMap";

interface USAMapProps
{
    visited : string[];
    className? : string;
}

// State codes: two-letter USPS abbreviations, lowercase (e.g. "ca", "ny", "tx").
export default function USAMap(props : USAMapProps)
{
    return (
        <SvgMap
            viewBox={usa.viewBox}
            locations={usa.locations}
            visited={props.visited}
            label={usa.label}
            className={props.className}
        />
    );
}
