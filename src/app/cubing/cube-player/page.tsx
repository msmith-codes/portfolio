'use client';

import { useEffect, useState } from 'react';
import CubePlayer from '../../_components/cubing/CubePlayer';
import CopyButton from '../../_components/cubing/CopyButton';

// Holds a value back until typing stops, so the cube is not reset on every
// keystroke while an algorithm is half written.
function useSettled<T>(value : T, delay : number) : T
{
    const [settled, setSettled] = useState(value);

    useEffect(() =>
    {
        const timer = setTimeout(() => setSettled(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);

    return settled;
}

interface Preset
{
    name : string;
    algorithm : string;
    setup : string;
    focus : string;
    note : string;
}

const PRESETS : Preset[] = [
    {
        name : 'Sexy move',
        algorithm : "R U R' U'",
        setup : '',
        focus : '',
        note : 'The four turns most beginner algorithms are built from.',
    },
    {
        name : 'Insert a corner',
        algorithm : "R U R' U' R U R' U' R U R' U'",
        setup : '',
        focus : 'W',
        note : 'Repeat the sexy move until the white corner drops into place. Only the white stickers are lit.',
    },
    {
        name : 'Middle layer, right',
        algorithm : "U R U' R' U' F' U F",
        setup : '',
        focus : 'G R',
        note : 'Sends a top layer edge into the middle layer on the right.',
    },
    {
        name : 'Sune',
        algorithm : "R U R' U R U2 R'",
        setup : 'x2',
        focus : 'Y',
        note : 'Orients the last layer corners. Yellow on top, everything else greyed out.',
    },
    {
        name : 'T permutation',
        algorithm : "R U R' U' R' F R2 U' R' U' R U R' F'",
        setup : '',
        focus : '',
        note : 'Swaps two corners and two edges on the last layer.',
    },
    {
        name : 'Daisy pieces',
        algorithm : "F2 U R2 U'",
        setup : 'x2',
        focus : 'U2 U4 U6 U8 D5',
        note : 'Yellow on top with only the four white edges and the yellow centre lit, the pieces the daisy is built from.',
    },
    {
        name : 'Cube rotations',
        algorithm : 'x y z',
        setup : '',
        focus : '',
        note : 'Whole cube turns, which change your view without solving anything.',
    },
];

export default function CubePlayerPage()
{
    const [algorithm, setAlgorithm] = useState("R U R' U'");
    const [setup, setSetup] = useState('');
    const [focus, setFocus] = useState('');
    const [lockStickers, setLockStickers] = useState(true);
    const [note, setNote] = useState(PRESETS[0].note);

    const playedAlgorithm = useSettled(algorithm, 400);
    const playedSetup = useSettled(setup, 400);

    const snippet = '<CubePlayer algorithm="' + algorithm + '"'
        + (setup.trim().length > 0 ? ' setup="' + setup + '"' : '')
        + (focus.length > 0 ? ' focus="' + focus + '"' : '')
        + (lockStickers ? ' preview_only' : '')
        + ' />';

    const choose = (preset : Preset) =>
    {
        setAlgorithm(preset.algorithm);
        setSetup(preset.setup);
        setFocus(preset.focus);
        setNote(preset.note);
    };

    return (
        <main className="max-w-6xl mx-auto px-12 py-8">
            <div className="space-y-8">
                {/* Page Title */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-foreground font-mono mb-4">Algorithm Player</h1>
                    <div className="w-24 h-0.5 bg-foreground/20 mx-auto"></div>
                    <p className="text-sm text-foreground/70 font-mono mt-4">
                        Type an algorithm and watch a cube run it, one turn at a time.
                    </p>
                </div>

                <div className="flex flex-wrap gap-10">
                    {/* Player */}
                    <section className="flex-1 min-w-96 space-y-4">
                        <CubePlayer
                            algorithm={playedAlgorithm}
                            setup={playedSetup}
                            focus={focus}
                            focusControls
                            onFocusChange={setFocus}
                            height={360}
                        />
                    </section>

                    {/* Controls */}
                    <section className="flex-1 min-w-80 space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="algorithm" className="block text-sm text-foreground/70 font-mono">
                                Algorithm
                            </label>
                            <input
                                id="algorithm"
                                value={algorithm}
                                onChange={(event) => setAlgorithm(event.target.value)}
                                spellCheck={false}
                                className="w-full px-3 py-2 bg-transparent border border-foreground/20 rounded text-foreground font-mono"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="setup" className="block text-sm text-foreground/70 font-mono">
                                Setup &mdash; applied instantly before playing
                            </label>
                            <input
                                id="setup"
                                value={setup}
                                onChange={(event) => setSetup(event.target.value)}
                                spellCheck={false}
                                placeholder="x2 to start with yellow on top"
                                className="w-full px-3 py-2 bg-transparent border border-foreground/20 rounded text-foreground font-mono placeholder:text-foreground/30"
                            />
                        </div>

                        <div className="space-y-2">
                            <span className="block text-sm text-foreground/70 font-mono">Presets</span>
                            <div className="flex flex-wrap gap-2">
                                {PRESETS.map((preset) => (
                                    <button
                                        key={preset.name}
                                        type="button"
                                        onClick={() => choose(preset)}
                                        className="px-3 py-1 text-sm font-mono border border-foreground/20 rounded text-foreground hover:text-foreground/80 transition-colors"
                                    >
                                        {preset.name}
                                    </button>
                                ))}
                            </div>
                            <p className="text-xs text-foreground/60 font-mono">{note}</p>
                        </div>

                        <div className="space-y-2">
                            <span className="block text-sm text-foreground/70 font-mono">Notation it understands</span>
                            <ul className="text-sm text-foreground/70 font-mono space-y-1 list-disc pl-5">
                                <li><strong>F B R L U D</strong> &mdash; face turns</li>
                                <li><strong>M E S</strong> &mdash; slice turns</li>
                                <li><strong>f b r l u d</strong> or <strong>Rw</strong> &mdash; wide turns</li>
                                <li><strong>x y z</strong> &mdash; whole cube rotations</li>
                                <li><strong>&apos;</strong> for counter-clockwise, <strong>2</strong> for a half turn</li>
                            </ul>
                        </div>
                    </section>
                </div>

                {/* Output */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground font-mono">Picking out stickers</h2>
                    <p className="text-foreground/80 font-mono leading-relaxed">
                        Click a sticker on the cube to light it or grey it out, or use the colour
                        chips under the cube to take a whole colour at once. Greyed stickers stay
                        grey as the algorithm runs, so the eye follows the pieces that matter.
                    </p>
                    <ul className="text-sm text-foreground/70 font-mono space-y-1 list-disc pl-5">
                        <li>A colour letter, such as <strong>W</strong>, means all nine stickers of that colour</li>
                        <li>A facelet id, such as <strong>U2</strong>, means one sticker: face letter plus 1 to 9, counted left to right and top to bottom</li>
                        <li>Ids are fixed on the solved cube, so <strong>U2</strong> stays with that sticker wherever it travels</li>
                        <li>An empty focus shows the cube in full colour</li>
                        <li>
                            <strong>preview_only</strong> locks the result: no chips, no clicking
                            stickers between lit and grey. Worth setting on a guide, where the
                            highlighting is part of the explanation
                        </li>
                    </ul>
                </section>

                {/* Output */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground font-mono">Embed it</h2>
                    <div className="flex flex-wrap items-center gap-3">
                        <code className="px-3 py-1 text-sm text-foreground font-mono border border-foreground/20 rounded break-all">
                            {snippet}
                        </code>
                        <CopyButton label="Copy" value={snippet} />
                    </div>

                    <label className="flex items-center gap-2 text-sm text-foreground/70 font-mono">
                        <input
                            type="checkbox"
                            checked={lockStickers}
                            onChange={(event) => setLockStickers(event.target.checked)}
                        />
                        Lock the stickers in the embedded player
                    </label>
                </section>
            </div>
        </main>
    );
}
