// Edit these lists to control which regions show green on the /travels maps.
// Codes are case-insensitive.
//
// USA:    two-letter state codes      e.g. "ca", "ny", "tx"
// Canada: province/territory codes    e.g. "on", "bc", "qc"
// Europe: ISO 3166-1 alpha-2 country  e.g. "fr", "de", "it"
// Asia:   ISO 3166-1 alpha-2 country  e.g. "jp", "th", "in"
//
// Full id lists live in the underlying datasets:
//   node_modules/@svg-maps/usa/index.js
//   node_modules/@svg-maps/canada/index.js
//   node_modules/@svg-maps/world/index.js  (also see EUROPE_COUNTRY_CODES /
//   ASIA_COUNTRY_CODES in ../_components/maps/regions.ts for which of the
//   world countries count as "Europe" vs. "Asia" here)

export const visitedUsStates : string[] = [
    "pa", "ny", "nj", "oh", "wv", 
    "md", "va", "il", "in", "mi",
    "wi", "mn", "az", "tx", "nv",
    "ct", "rd", "vt", "ma", "nh",
    "me", "nc", "ri", "ut" 

];

export const visitedCanadaProvinces : string[] = [
    "on",
];

export const visitedEuropeCountries : string[] = [
    "gb", "nl", "be", "de",   
];

export const visitedAsiaCountries : string[] = [
    "cn"
];
