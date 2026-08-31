import world from "@svg-maps/world";
import SvgMap, { type MapLocation } from "./SvgMap";
import { ASIA_COUNTRY_CODES, ASIA_VIEW_BOX } from "./regions";

interface AsiaMapProps
{
    visited : string[];
    className? : string;
}

const asiaCodes = new Set(ASIA_COUNTRY_CODES);
const asiaLocations : MapLocation[] = world.locations.filter(
    (location : MapLocation) => asiaCodes.has(location.id.toLowerCase()),
);

// Country codes: ISO 3166-1 alpha-2, lowercase (e.g. "jp", "in", "th").
export default function AsiaMap(props : AsiaMapProps)
{
    return (
        <SvgMap
            viewBox={ASIA_VIEW_BOX}
            locations={asiaLocations}
            visited={props.visited}
            label="Map of Asia"
            className={props.className}
        />
    );
}
