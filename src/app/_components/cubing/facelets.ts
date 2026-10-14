// Names every one of the 54 stickers so a guide can light up exactly the ones it
// is talking about.
//
// Ids follow the usual facelet notation: a face letter plus 1 to 9, counted left
// to right and top to bottom as you look at that face. Ids are handed out on a
// solved, unrotated cube and then belong to the sticker for good, so a sticker
// keeps its id as the cube is turned. That is what makes it possible to follow one
// piece through an algorithm.

import type { FaceletLetter } from './stickers';

export const FACE_IDS = ['U', 'R', 'F', 'D', 'L', 'B'] as const;
export type FaceId = (typeof FACE_IDS)[number];

type Vector = readonly [number, number, number];

interface FaceFrame
{
    normal : Vector;
    // Directions, in cube coordinates, of "one sticker right" and "one sticker
    // down" when looking straight at the face.
    right : Vector;
    down : Vector;
}

const FRAMES : Record<FaceId, FaceFrame> = {
    U : { normal : [0, 1, 0], right : [1, 0, 0], down : [0, 0, 1] },
    R : { normal : [1, 0, 0], right : [0, 0, -1], down : [0, -1, 0] },
    F : { normal : [0, 0, 1], right : [1, 0, 0], down : [0, -1, 0] },
    D : { normal : [0, -1, 0], right : [1, 0, 0], down : [0, 0, -1] },
    L : { normal : [-1, 0, 0], right : [0, 0, 1], down : [0, -1, 0] },
    B : { normal : [0, 0, -1], right : [-1, 0, 0], down : [0, -1, 0] },
};

// Which face each colour sits on when the cube is solved.
export const FACE_FOR_COLOR : Record<Exclude<FaceletLetter, 'X'>, FaceId> = {
    W : 'U',
    R : 'R',
    G : 'F',
    Y : 'D',
    O : 'L',
    B : 'B',
};

const dot = (a : Vector, b : Vector) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

// The id of the sticker at `position` facing `normal` on a solved cube.
export function stickerId(position : Vector, normal : Vector) : string
{
    const face = FACE_IDS.find((id) => dot(FRAMES[id].normal, normal) === 1);
    if (face === undefined) throw new Error(`No face for normal ${normal.join(',')}`);

    const frame = FRAMES[face];
    const column = dot(position, frame.right) + 1;
    const row = dot(position, frame.down) + 1;

    return `${face}${row * 3 + column + 1}`;
}

// Every sticker on the cube.
export function allStickerIds() : string[]
{
    return FACE_IDS.flatMap((face) => idsForFace(face));
}

export function idsForFace(face : FaceId) : string[]
{
    return Array.from({ length : 9 }, (_, index) => `${face}${index + 1}`);
}

const COLOR_LETTERS = Object.keys(FACE_FOR_COLOR) as Exclude<FaceletLetter, 'X'>[];

// Reads a focus string into the set of sticker ids it lights. A bare colour
// letter stands for all nine stickers of that colour, so "W U2" is understood as
// every white sticker plus whatever sticker is named U2.
export function parseFocus(value : string | undefined) : Set<string>
{
    const ids = new Set<string>();
    if (value === undefined) return ids;

    for (const token of value.toUpperCase().split(/[\s,]+/))
    {
        if (token.length === 0) continue;

        const colour = COLOR_LETTERS.find((letter) => letter === token);
        if (colour !== undefined)
        {
            for (const id of idsForFace(FACE_FOR_COLOR[colour])) ids.add(id);
            continue;
        }

        if (/^[URFDLB][1-9]$/.test(token)) ids.add(token);
    }

    return ids;
}

// The shortest way to write a set of ids: a whole face collapses back to its
// colour letter, and anything left over is listed sticker by sticker.
export function formatFocus(ids : Set<string>) : string
{
    const remaining = new Set(ids);
    const tokens : string[] = [];

    for (const colour of COLOR_LETTERS)
    {
        const faceIds = idsForFace(FACE_FOR_COLOR[colour]);
        if (faceIds.every((id) => remaining.has(id)))
        {
            tokens.push(colour);
            for (const id of faceIds) remaining.delete(id);
        }
    }

    return [...tokens, ...[...remaining].sort()].join(' ');
}
