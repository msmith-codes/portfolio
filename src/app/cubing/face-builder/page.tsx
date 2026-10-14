'use client';

import { useEffect, useState } from 'react';
import
{
    CubeFace,
    FACELET_LETTERS,
    STICKER_COLORS,
    STICKER_NAMES,
    formatFacelets,
    isFaceletLetter,
    type FaceletLetter,
} from '../../_components/cubing';
import CopyButton from '../../_components/cubing/CopyButton';

type CellTarget =
    | { group : 'face'; index : number }
    | { group : 'side'; index : number }
    | { group : 'empty' };

// Maps a position in the 5x5 builder grid onto the face or the wrapped sides.
// Side indices follow the order of the `sides` string: top, right, bottom, left.
function describeCell(row : number, col : number) : CellTarget
{
    const insideRow = row >= 1 && row <= 3;
    const insideCol = col >= 1 && col <= 3;

    if (insideRow && insideCol) return { group : 'face', index : (row - 1) * 3 + (col - 1) };
    if (row === 0 && insideCol) return { group : 'side', index : col - 1 };
    if (col === 4 && insideRow) return { group : 'side', index : 3 + (row - 1) };
    if (row === 4 && insideCol) return { group : 'side', index : 6 + (col - 1) };
    if (col === 0 && insideRow) return { group : 'side', index : 9 + (row - 1) };

    return { group : 'empty' };
}

interface PaintCellProps
{
    letter : FaceletLetter;
    label : string;
    onPaint : () => void;
}

function PaintCell(props : PaintCellProps)
{
    return (
        <button
            type="button"
            title={props.label}
            aria-label={props.label}
            onClick={props.onPaint}
            onMouseEnter={(event) => { if (event.buttons === 1) props.onPaint(); }}
            className="w-full h-full rounded-sm border border-black/60 cursor-pointer transition-transform hover:scale-105"
            style={{ backgroundColor: STICKER_COLORS[props.letter] }}
        />
    );
}

export default function FaceBuilderPage()
{
    const [face, setFace] = useState<FaceletLetter[]>(() => Array<FaceletLetter>(9).fill('Y'));
    const [sides, setSides] = useState<FaceletLetter[]>(() => Array<FaceletLetter>(12).fill('X'));
    const [brush, setBrush] = useState<FaceletLetter>('Y');
    const [showSides, setShowSides] = useState(true);

    // Colour letters double as brush shortcuts, matching the facelet notation.
    useEffect(() =>
    {
        const onKeyDown = (event : KeyboardEvent) =>
        {
            if (event.metaKey || event.ctrlKey || event.altKey) return;

            const letter = event.key.toUpperCase();
            if (isFaceletLetter(letter)) setBrush(letter);
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);

    const paint = (target : CellTarget) =>
    {
        if (target.group === 'face')
        {
            setFace((current) => current.map((letter, i) => (i === target.index ? brush : letter)));
        }
        else if (target.group === 'side')
        {
            setSides((current) => current.map((letter, i) => (i === target.index ? brush : letter)));
        }
    };

    const faceString = formatFacelets(face);
    const sidesString = formatFacelets(sides);
    const snippet = showSides
        ? '<CubeFace face="' + faceString + '" sides="' + sidesString + '" />'
        : '<CubeFace face="' + faceString + '" />';

    const cells = showSides ? [0, 1, 2, 3, 4] : [1, 2, 3];

    return (
        <main className="max-w-6xl mx-auto px-12 py-8">
            <div className="space-y-8">
                {/* Page Title */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-foreground font-mono mb-4">Cube Face Builder</h1>
                    <div className="w-24 h-0.5 bg-foreground/20 mx-auto"></div>
                    <p className="text-sm text-foreground/70 font-mono mt-4">
                        Paint a face, then copy the snippet into a guide page.
                    </p>
                </div>

                <div className="flex flex-wrap gap-16 justify-center">
                    {/* Editor */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-foreground font-mono">Editor</h2>

                        <div className="flex flex-wrap gap-2">
                            {FACELET_LETTERS.map((letter) => (
                                <button
                                    key={letter}
                                    type="button"
                                    onClick={() => setBrush(letter)}
                                    title={STICKER_NAMES[letter] + ' (' + letter + ')'}
                                    className={`w-10 h-10 rounded border-2 font-mono text-xs font-bold text-black/70 transition-transform ${brush === letter ? 'border-foreground scale-110' : 'border-foreground/20'}`}
                                    style={{ backgroundColor: STICKER_COLORS[letter] }}
                                >
                                    {letter}
                                </button>
                            ))}
                        </div>

                        <div
                            className="inline-grid gap-1.5 p-3 rounded-lg select-none"
                            style={{
                                backgroundColor: '#1f1f1f',
                                gridTemplateColumns: showSides ? '24px repeat(3, 56px) 24px' : 'repeat(3, 56px)',
                                gridTemplateRows: showSides ? '24px repeat(3, 56px) 24px' : 'repeat(3, 56px)',
                            }}
                        >
                            {cells.flatMap((row) => cells.map((col) =>
                            {
                                const target = describeCell(row, col);

                                if (target.group === 'empty')
                                {
                                    return <div key={row + '-' + col} />;
                                }

                                const letter = target.group === 'face' ? face[target.index] : sides[target.index];
                                const position = target.group === 'face' ? 'Face' : 'Side';

                                return (
                                    <PaintCell
                                        key={row + '-' + col}
                                        letter={letter}
                                        label={position + ' sticker ' + (target.index + 1) + ': ' + STICKER_NAMES[letter]}
                                        onPaint={() => paint(target)}
                                    />
                                );
                            }))}
                        </div>

                        <div className="flex flex-wrap gap-2 items-center max-w-sm">
                            <button
                                type="button"
                                onClick={() => setFace(Array<FaceletLetter>(9).fill(brush))}
                                className="px-3 py-1 text-sm font-mono border border-foreground/20 rounded text-foreground hover:text-foreground/80 transition-colors"
                            >
                                Fill face
                            </button>
                            <button
                                type="button"
                                onClick={() => setSides(Array<FaceletLetter>(12).fill(brush))}
                                className="px-3 py-1 text-sm font-mono border border-foreground/20 rounded text-foreground hover:text-foreground/80 transition-colors"
                            >
                                Fill sides
                            </button>
                            <button
                                type="button"
                                onClick={() =>
                                {
                                    setFace(Array<FaceletLetter>(9).fill('X'));
                                    setSides(Array<FaceletLetter>(12).fill('X'));
                                }}
                                className="px-3 py-1 text-sm font-mono border border-foreground/20 rounded text-foreground hover:text-foreground/80 transition-colors"
                            >
                                Clear
                            </button>
                            <label className="flex items-center gap-2 text-sm font-mono text-foreground/80">
                                <input
                                    type="checkbox"
                                    checked={showSides}
                                    onChange={(event) => setShowSides(event.target.checked)}
                                />
                                Side stickers
                            </label>
                        </div>

                        <p className="text-xs text-foreground/60 font-mono max-w-sm">
                            Press W Y R O B G to pick a brush, X for an unknown sticker. Click or drag
                            across the grid to paint.
                        </p>
                    </section>

                    {/* Preview */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-foreground font-mono">Preview</h2>
                        <CubeFace
                            face={faceString}
                            sides={showSides ? sidesString : undefined}
                            size={260}
                        />
                    </section>
                </div>

                {/* Output */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground font-mono">Output</h2>

                    <div className="flex flex-wrap items-center gap-3">
                        <span className="w-16 text-sm text-foreground/60 font-mono">face</span>
                        <code className="px-3 py-1 text-foreground font-mono border border-foreground/20 rounded">{faceString}</code>
                        <CopyButton label="Copy" value={faceString} />
                    </div>

                    {showSides && (
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="w-16 text-sm text-foreground/60 font-mono">sides</span>
                            <code className="px-3 py-1 text-foreground font-mono border border-foreground/20 rounded">{sidesString}</code>
                            <CopyButton label="Copy" value={sidesString} />
                        </div>
                    )}

                    <div className="flex flex-wrap items-center gap-3">
                        <span className="w-16 text-sm text-foreground/60 font-mono">jsx</span>
                        <code className="px-3 py-1 text-sm text-foreground font-mono border border-foreground/20 rounded break-all">{snippet}</code>
                        <CopyButton label="Copy" value={snippet} />
                    </div>

                    <p className="text-xs text-foreground/60 font-mono">
                        Letters read left to right, top to bottom. Sides are four groups of three:
                        top row, right column, bottom row, left column.
                    </p>
                </section>
            </div>
        </main>
    );
}
