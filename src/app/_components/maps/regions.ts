// Country codes (ISO 3166-1 alpha-2, lowercase) used to slice the
// @svg-maps/world dataset into continent-level maps.
//
// Transcontinental countries are each assigned to a single continent so they
// don't get drawn twice: Russia is grouped with Europe, while Turkey,
// Georgia, Armenia, Azerbaijan and Kazakhstan are grouped with Asia to match
// how they're commonly categorized for travel purposes.

export const EUROPE_COUNTRY_CODES = [
    "al", "ad", "at", "by", "be", "ba", "bg", "hr", "cy", "cz", "dk", "ee",
    "fo", "fi", "fr", "de", "gi", "gr", "gg", "va", "hu", "is", "ie", "im",
    "it", "je", "xk", "lv", "li", "lt", "lu", "mk", "mt", "md", "mc", "me",
    "nl", "no", "pl", "pt", "ro", "ru", "sm", "rs", "sk", "si", "es", "sj",
    "se", "ch", "ua", "gb", "ax",
];

export const ASIA_COUNTRY_CODES = [
    "af", "am", "az", "bh", "bd", "bt", "bn", "kh", "cn", "ge", "hk", "in",
    "id", "ir", "iq", "il", "jp", "jo", "kz", "kw", "kg", "la", "lb", "mo",
    "my", "mv", "mn", "mm", "np", "kp", "om", "pk", "ps", "ph", "qa", "sa",
    "sg", "kr", "lk", "sy", "tw", "tj", "th", "tr", "tm", "ae", "uz", "vn",
    "ye",
];

// Tight viewBoxes (precomputed from the underlying path data, plus a small
// padding margin) so each continent map isn't dwarfed by empty ocean from
// the full 1010x666 world viewBox. Countries that spill outside these boxes
// (e.g. Russia's Siberian expanse, or Svalbard/the Faroe Islands far to the
// north) are simply clipped at the edge, which is the desired effect.
export const EUROPE_VIEW_BOX = "377 165 221 228";
export const ASIA_VIEW_BOX = "537 266 358 238";
