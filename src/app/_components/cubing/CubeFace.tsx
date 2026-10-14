import { parseFacelets, STICKER_COLORS, STICKER_NAMES, type FaceletLetter } from "./stickers";

interface CubeFaceProps
{
    // Nine facelet letters for the face itself, read left to right, top to bottom.
    face : string;
    // Twelve facelet letters for the stickers wrapping the face, in four groups of
    // three: top row (left to right), right column (top to bottom), bottom row
    // (left to right), left column (top to bottom). Omit for a plain face.
    sides? : string;
    // Rendered width/height in pixels.
    size? : number;
    // Accessible description, e.g. "Yellow cross with solved front pair".
    title? : string;
    className? : string;
}

const STICKER = 90;                     // face sticker edge
const GAP = 10;                         // gap between face stickers
const PITCH = STICKER + GAP;
const FACE = STICKER * 3 + GAP * 2;     // 290
const SIDE = 34;                        // thickness of a wrapped side sticker
const SIDE_GAP = 12;                    // gap between the face and a side sticker
const PAD = 6;                          // plastic border around the face
const OUTSET = SIDE_GAP + SIDE + PAD;

const RADIUS = 10;
const PLASTIC = "#1f1f1f";
const OUTLINE = "#111111";

interface StickerRect
{
    x : number;
    y : number;
    width : number;
    height : number;
}

// Side sticker geometry in the order the `sides` string is read.
const SIDE_RECTS : StickerRect[] = [
    ...[0, 1, 2].map((i) => ({ x : i * PITCH, y : -(SIDE_GAP + SIDE), width : STICKER, height : SIDE })),
    ...[0, 1, 2].map((i) => ({ x : FACE + SIDE_GAP, y : i * PITCH, width : SIDE, height : STICKER })),
    ...[0, 1, 2].map((i) => ({ x : i * PITCH, y : FACE + SIDE_GAP, width : STICKER, height : SIDE })),
    ...[0, 1, 2].map((i) => ({ x : -(SIDE_GAP + SIDE), y : i * PITCH, width : SIDE, height : STICKER })),
];

function describe(face : FaceletLetter[]) : string
{
    const rows = [0, 3, 6].map((start) =>
        face.slice(start, start + 3).map((letter) => STICKER_NAMES[letter]).join(", "),
    );

    return `Cube face. Top row: ${rows[0]}. Middle row: ${rows[1]}. Bottom row: ${rows[2]}.`;
}

export default function CubeFace(props : CubeFaceProps)
{
    const face = parseFacelets(props.face, 9);
    const sides = props.sides === undefined ? null : parseFacelets(props.sides, 12);
    const size = props.size ?? 220;

    const origin = sides === null ? -PAD : -OUTSET;
    const extent = sides === null ? FACE + PAD * 2 : FACE + OUTSET * 2;

    return (
        <svg
            role="img"
            width={size}
            height={size}
            viewBox={`${origin} ${origin} ${extent} ${extent}`}
            className={props.className}
        >
            <title>{props.title ?? describe(face)}</title>

            <rect
                x={-PAD}
                y={-PAD}
                width={FACE + PAD * 2}
                height={FACE + PAD * 2}
                rx={RADIUS + 4}
                fill={PLASTIC}
            />

            {face.map((letter, index) => (
                <rect
                    key={`face-${index}`}
                    x={(index % 3) * PITCH}
                    y={Math.floor(index / 3) * PITCH}
                    width={STICKER}
                    height={STICKER}
                    rx={RADIUS}
                    fill={STICKER_COLORS[letter]}
                    stroke={OUTLINE}
                    strokeWidth={2.5}
                />
            ))}

            {sides?.map((letter, index) => (
                <rect
                    key={`side-${index}`}
                    x={SIDE_RECTS[index].x}
                    y={SIDE_RECTS[index].y}
                    width={SIDE_RECTS[index].width}
                    height={SIDE_RECTS[index].height}
                    rx={6}
                    fill={STICKER_COLORS[letter]}
                    stroke={OUTLINE}
                    strokeWidth={2.5}
                />
            ))}
        </svg>
    );
}
