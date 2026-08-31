import world from "@svg-maps/world";
import SvgMap, { type MapLocation } from "./SvgMap";
import { EUROPE_COUNTRY_CODES, EUROPE_VIEW_BOX } from "./regions";

interface EuropeMapProps
{
    visited : string[];
    className? : string;
}

const europeCodes = new Set(EUROPE_COUNTRY_CODES);
const europeLocations : MapLocation[] = world.locations.filter(
    (location : MapLocation) => europeCodes.has(location.id.toLowerCase()),
);

// Country codes: ISO 3166-1 alpha-2, lowercase (e.g. "fr", "de", "it").
export default function EuropeMap(props : EuropeMapProps)
{
    return (
        <SvgMap
            viewBox={EUROPE_VIEW_BOX}
            locations={europeLocations}
            visited={props.visited}
            label="Map of Europe"
            className={props.className}
        />
    );
}
