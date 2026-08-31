import canada from "@svg-maps/canada";
import SvgMap from "./SvgMap";

interface CanadaMapProps
{
    visited : string[];
    className? : string;
}

// Province/territory codes, lowercase (e.g. "on", "bc", "qc").
export default function CanadaMap(props : CanadaMapProps)
{
    return (
        <SvgMap
            viewBox={canada.viewBox}
            locations={canada.locations}
            visited={props.visited}
            label={canada.label}
            className={props.className}
        />
    );
}
