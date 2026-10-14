// Parses standard cube notation into layer rotations the 3D player can run.
//
// Every move, whether it is a face turn, a slice or a whole cube rotation, comes
// down to the same thing: spin one or more layers around an axis. Coordinates run
// -1, 0, 1 on each axis, with +x right, +y up and +z towards the viewer.

export type Axis = 'x' | 'y' | 'z';

export interface Move
{
    axis : Axis;
    // Which layers on that axis turn, each -1, 0 or 1.
    layers : number[];
    // Signed quarter turns, following the right hand rule around the axis.
    quarterTurns : number;
    // The move as it was written, for the move list in the UI.
    notation : string;
}

interface Turn
{
    axis : Axis;
    layers : number[];
    // Direction that makes the move clockwise as seen from outside that face.
    sign : number;
}

const TURNS : Record<string, Turn> = {
    // Face turns.
    R : { axis : 'x', layers : [1], sign : -1 },
    L : { axis : 'x', layers : [-1], sign : 1 },
    U : { axis : 'y', layers : [1], sign : -1 },
    D : { axis : 'y', layers : [-1], sign : 1 },
    F : { axis : 'z', layers : [1], sign : -1 },
    B : { axis : 'z', layers : [-1], sign : 1 },

    // Slice turns. M follows L, E follows D, S follows F.
    M : { axis : 'x', layers : [0], sign : 1 },
    E : { axis : 'y', layers : [0], sign : 1 },
    S : { axis : 'z', layers : [0], sign : -1 },

    // Wide turns, the face plus the slice behind it.
    r : { axis : 'x', layers : [1, 0], sign : -1 },
    l : { axis : 'x', layers : [-1, 0], sign : 1 },
    u : { axis : 'y', layers : [1, 0], sign : -1 },
    d : { axis : 'y', layers : [-1, 0], sign : 1 },
    f : { axis : 'z', layers : [1, 0], sign : -1 },
    b : { axis : 'z', layers : [-1, 0], sign : 1 },

    // Whole cube rotations. x follows R, y follows U, z follows F.
    x : { axis : 'x', layers : [1, 0, -1], sign : -1 },
    y : { axis : 'y', layers : [1, 0, -1], sign : -1 },
    z : { axis : 'z', layers : [1, 0, -1], sign : -1 },
};

// Rw and Rw' are the same as r and r'.
const WIDE : Record<string, string> = { R : 'r', L : 'l', U : 'u', D : 'd', F : 'f', B : 'b' };

export interface ParseResult
{
    moves : Move[];
    error : string | null;
}

const TOKEN = /^([RLUDFBMESxyzrludfb])(w?)([2']*)/;
const SEPARATOR = /^[\s,()[\]]+/;

export function parseAlgorithm(input : string) : ParseResult
{
    const moves : Move[] = [];
    let rest = input;

    while (rest.length > 0)
    {
        const separator = rest.match(SEPARATOR);
        if (separator !== null)
        {
            rest = rest.slice(separator[0].length);
            continue;
        }

        const token = rest.match(TOKEN);
        if (token === null)
        {
            return { moves, error : `Could not read "${rest.slice(0, 8)}"` };
        }

        const [matched, letter, wide, suffix] = token;
        rest = rest.slice(matched.length);

        if (wide === 'w' && WIDE[letter] === undefined)
        {
            return { moves, error : `"${letter}w" is not a move` };
        }

        const key = wide === 'w' ? WIDE[letter] : letter;
        const turn = TURNS[key];

        // A trailing 2 is a half turn; a prime reverses the direction. Written
        // together, as in R2', the half turn wins because it is its own inverse.
        const half = suffix.includes('2');
        const prime = suffix.includes("'");
        const magnitude = half ? 2 : 1;
        const direction = half ? 1 : (prime ? -1 : 1);

        moves.push({
            axis : turn.axis,
            layers : turn.layers,
            quarterTurns : turn.sign * direction * magnitude,
            notation : matched,
        });
    }

    return { moves, error : null };
}

export function invertMove(move : Move) : Move
{
    return { ...move, quarterTurns : -move.quarterTurns };
}
