// Facelet letters shared by the cubing guides and the face builder:
// W white, Y yellow, R red, O orange, B blue, G green, X unknown / "don't care".
export type FaceletLetter = "W" | "Y" | "R" | "O" | "B" | "G" | "X";

export const FACELET_LETTERS : FaceletLetter[] = ["W", "Y", "R", "O", "B", "G", "X"];

export const STICKER_COLORS : Record<FaceletLetter, string> = {
    W : "#f2f2f2",
    Y : "#ffd500",
    R : "#c62431",
    O : "#ff6a00",
    B : "#1565d8",
    G : "#00a04a",
    X : "#8c8c8c",
};

export const STICKER_NAMES : Record<FaceletLetter, string> = {
    W : "White",
    Y : "Yellow",
    R : "Red",
    O : "Orange",
    B : "Blue",
    G : "Green",
    X : "Unknown",
};

const knownLetters = new Set<string>(FACELET_LETTERS);

export function isFaceletLetter(value : string) : value is FaceletLetter
{
    return knownLetters.has(value);
}

// Reads a facelet string into exactly `count` letters. Anything that is not a
// letter is ignored, so guide source can be grouped for readability ("YYY YYY YYY").
// Missing or unrecognised letters become "X", which renders grey rather than
// breaking the page on a typo.
export function parseFacelets(value : string, count : number) : FaceletLetter[]
{
    const letters = value.toUpperCase().replace(/[^A-Z]/g, "").split("");
    const result : FaceletLetter[] = [];

    for (let i = 0; i < count; i++)
    {
        const letter = letters[i];
        result.push(letter !== undefined && isFaceletLetter(letter) ? letter : "X");
    }

    return result;
}

// Groups letters into space separated chunks of three, the form the guides use.
export function formatFacelets(letters : FaceletLetter[]) : string
{
    const groups : string[] = [];

    for (let i = 0; i < letters.length; i += 3)
    {
        groups.push(letters.slice(i, i + 3).join(""));
    }

    return groups.join(" ");
}
