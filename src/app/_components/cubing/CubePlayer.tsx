'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CubeScene } from './CubeScene';
import { invertMove, parseAlgorithm } from './moves';
import { STICKER_COLORS, STICKER_NAMES, type FaceletLetter } from './stickers';
import { FACE_FOR_COLOR, allStickerIds, formatFocus, idsForFace, parseFocus } from './facelets';

type Colour = Exclude<FaceletLetter, 'X'>;

// Colours offered as bulk selectors. X is the grey everything else turns.
const FOCUS_CHOICES : Colour[] = ['W', 'Y', 'R', 'O', 'B', 'G'];

type ChipState = 'all' | 'some' | 'none';

function chipState(focus : Set<string>, colour : Colour) : ChipState
{
    const ids = idsForFace(FACE_FOR_COLOR[colour]);
    const lit = ids.filter((id) => focus.has(id)).length;

    if (lit === ids.length) return 'all';
    return lit === 0 ? 'none' : 'some';
}

interface CubePlayerProps
{
    // Moves to play, in standard notation: "R U R' U'".
    algorithm : string;
    // Moves applied instantly before playback, for orientation or a scramble.
    setup? : string;
    // Milliseconds per quarter turn.
    speed? : number;
    autoPlay? : boolean;
    height? : number;
    className? : string;
    // Stickers to keep lit; everything else turns grey. A colour letter means all
    // nine stickers of that colour and a facelet id means a single sticker, so
    // "W U2 U4" is every white sticker plus two more. Leave it out for full colour.
    focus? : string;
    // Shows colour toggles under the cube and lets stickers be clicked on and off.
    // Needs onFocusChange to do anything.
    focusControls? : boolean;
    onFocusChange? : (focus : string) => void;
    // Locks whatever `focus` sets up: no colour chips and no clicking stickers
    // between lit and grey. For a guide, where the highlighting is part of the
    // explanation and a stray click should not undo it.
    preview_only? : boolean;
}

const BUTTON = 'px-3 py-1 text-sm font-mono border border-foreground/20 rounded text-foreground hover:text-foreground/80 disabled:opacity-30 disabled:hover:text-foreground transition-colors';

export default function CubePlayer(props : CubePlayerProps)
{
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sceneRef = useRef<CubeScene | null>(null);
    const [ready, setReady] = useState(false);
    const [index, setIndex] = useState(0);
    const [playing, setPlaying] = useState(props.autoPlay ?? false);
    const [speed, setSpeed] = useState(props.speed ?? 380);

    const focus = useMemo(() => parseFocus(props.focus), [props.focus]);
    const picking = props.preview_only !== true
        && props.focusControls === true
        && props.onFocusChange !== undefined;
    const parsed = useMemo(() => parseAlgorithm(props.algorithm), [props.algorithm]);
    const setupMoves = useMemo(() => parseAlgorithm(props.setup ?? '').moves, [props.setup]);
    const moves = parsed.moves;

    // Build the scene once, then keep it sized to its container.
    useEffect(() =>
    {
        const canvas = canvasRef.current;
        if (canvas === null) return;

        const scene = new CubeScene(canvas);
        sceneRef.current = scene;
        setReady(true);

        const parent = canvas.parentElement;
        const observer = new ResizeObserver(() =>
        {
            if (parent !== null) scene.resize(parent.clientWidth, parent.clientHeight);
        });

        if (parent !== null)
        {
            scene.resize(parent.clientWidth, parent.clientHeight);
            observer.observe(parent);
        }

        return () =>
        {
            observer.disconnect();
            scene.dispose();
            sceneRef.current = null;
            setReady(false);
        };
    }, []);

    useEffect(() =>
    {
        if (!ready) return;
        sceneRef.current?.setFocus(focus);
    }, [ready, focus]);

    const toggleSticker = (id : string) =>
    {
        // With nothing focused the whole cube is lit, so the first click reads as
        // "grey this one out" rather than "throw away the other fifty three".
        const next = focus.size === 0 ? new Set(allStickerIds()) : new Set(focus);

        if (next.has(id)) next.delete(id);
        else next.add(id);

        props.onFocusChange?.(formatFocus(next));
    };

    // Rewinding to the start also re-applies the setup moves.
    const rewind = useCallback(() =>
    {
        const scene = sceneRef.current;
        if (scene === null) return;

        scene.reset();
        scene.applyInstant(setupMoves);
        setIndex(0);
        setPlaying(false);
    }, [setupMoves]);

    // A new algorithm or setup starts over from a solved cube.
    useEffect(() =>
    {
        if (!ready) return;
        rewind();
        if (props.autoPlay === true) setPlaying(true);
    }, [ready, rewind, props.algorithm, props.autoPlay]);

    // Plays the next move whenever one is due. Pausing mid-turn lets the current
    // move finish, so the cube always rests on a whole move.
    useEffect(() =>
    {
        if (!playing) return;

        const scene = sceneRef.current;
        if (scene === null) return;

        if (index >= moves.length)
        {
            setPlaying(false);
            return;
        }

        scene.rotate(moves[index], speed, () => setIndex((current) => current + 1));
    }, [playing, index, moves, speed]);

    const step = (direction : 1 | -1) =>
    {
        const scene = sceneRef.current;
        if (scene === null || scene.busy || playing) return;

        if (direction === 1)
        {
            if (index >= moves.length) return;
            scene.rotate(moves[index], speed, () => setIndex((current) => current + 1));
        }
        else
        {
            if (index === 0) return;
            scene.rotate(invertMove(moves[index - 1]), speed, () => setIndex((current) => current - 1));
        }
    };

    // Drag anywhere on the canvas to orbit the camera.
    const onPointerDown = (event : React.PointerEvent<HTMLCanvasElement>) =>
    {
        const canvas = event.currentTarget;

        // Capture keeps a drag alive past the edge of the canvas. It throws if the
        // pointer id is not live, which should not stop the rest of the handler.
        try
        {
            canvas.setPointerCapture(event.pointerId);
        }
        catch
        {
            // Nothing to do: the drag still works, it just stops at the edge.
        }

        const downX = event.clientX;
        const downY = event.clientY;
        let lastX = event.clientX;
        let lastY = event.clientY;

        const onMove = (moveEvent : PointerEvent) =>
        {
            sceneRef.current?.orbit(moveEvent.clientX - lastX, moveEvent.clientY - lastY);
            lastX = moveEvent.clientX;
            lastY = moveEvent.clientY;
        };

        // A press that stays put is a click on a sticker rather than a camera drag.
        const onUp = (upEvent : PointerEvent) =>
        {
            canvas.removeEventListener('pointermove', onMove);
            canvas.removeEventListener('pointerup', onUp);
            canvas.removeEventListener('pointercancel', onUp);

            const still = Math.abs(upEvent.clientX - downX) < 6
                && Math.abs(upEvent.clientY - downY) < 6;

            if (!still || !picking) return;

            const bounds = canvas.getBoundingClientRect();
            const id = sceneRef.current?.pick(
                ((upEvent.clientX - bounds.left) / bounds.width) * 2 - 1,
                -((upEvent.clientY - bounds.top) / bounds.height) * 2 + 1,
            );

            if (id != null) toggleSticker(id);
        };

        canvas.addEventListener('pointermove', onMove);
        canvas.addEventListener('pointerup', onUp);
        canvas.addEventListener('pointercancel', onUp);
    };

    const atEnd = index >= moves.length;

    return (
        <div className={props.className}>
            <div
                className="relative w-full rounded-lg border border-foreground/10 overflow-hidden"
                style={{ height : props.height ?? 320, backgroundColor : '#101216' }}
            >
                <canvas
                    ref={canvasRef}
                    onPointerDown={onPointerDown}
                    className="w-full h-full block cursor-grab active:cursor-grabbing touch-none"
                />
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-3">
                <button type="button" className={BUTTON} onClick={() => step(-1)} disabled={playing || index === 0}>
                    &larr; Back
                </button>
                <button
                    type="button"
                    className={BUTTON}
                    onClick={() => (atEnd ? rewind() : setPlaying(!playing))}
                    disabled={moves.length === 0}
                >
                    {atEnd ? 'Replay' : (playing ? 'Pause' : 'Play')}
                </button>
                <button type="button" className={BUTTON} onClick={() => step(1)} disabled={playing || atEnd}>
                    Next &rarr;
                </button>
                <button type="button" className={BUTTON} onClick={rewind}>
                    Reset
                </button>

                <label className="flex items-center gap-2 ml-2 text-sm text-foreground/70 font-mono">
                    Speed
                    <select
                        value={speed}
                        onChange={(event) => setSpeed(Number(event.target.value))}
                        className="px-2 py-1 bg-transparent border border-foreground/20 rounded text-foreground font-mono"
                    >
                        <option value={700}>Slow</option>
                        <option value={380}>Normal</option>
                        <option value={180}>Fast</option>
                    </select>
                </label>

                <span className="ml-auto text-sm text-foreground/60 font-mono">
                    {index} / {moves.length}
                </span>
            </div>


            {picking && (
                <div className="flex flex-wrap items-center gap-2 mt-3">
                    <span className="text-sm text-foreground/70 font-mono">Focus</span>
                    {FOCUS_CHOICES.map((letter) => (
                        <button
                            key={letter}
                            type="button"
                            title={STICKER_NAMES[letter]}
                            onClick={() =>
                            {
                                const next = new Set(focus);
                                const ids = idsForFace(FACE_FOR_COLOR[letter]);
                                if (chipState(focus, letter) === 'all') ids.forEach((id) => next.delete(id));
                                else ids.forEach((id) => next.add(id));
                                props.onFocusChange?.(formatFocus(next));
                            }}
                            className={`w-8 h-8 rounded border-2 font-mono text-xs font-bold text-black/70 transition-transform ${
                                chipState(focus, letter) === 'all'
                                    ? 'border-foreground scale-110'
                                    : (chipState(focus, letter) === 'some'
                                        ? 'border-dashed border-foreground'
                                        : 'border-foreground/20')
                            }`}
                            style={{
                                backgroundColor : chipState(focus, letter) === 'none' && focus.size > 0
                                    ? STICKER_COLORS.X
                                    : STICKER_COLORS[letter],
                            }}
                        >
                            {letter}
                        </button>
                    ))}
                    <button
                        type="button"
                        onClick={() => props.onFocusChange?.('')}
                        className={BUTTON}
                        disabled={focus.size === 0}
                    >
                        Show all
                    </button>
                </div>
            )}

            {parsed.error !== null && (
                <p className="mt-2 text-sm font-mono" style={{ color : '#c62431' }}>
                    {parsed.error}
                </p>
            )}

            {moves.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                    {moves.map((move, position) => (
                        <span
                            key={position}
                            className={`px-2 py-0.5 text-sm font-mono border rounded ${
                                position === index
                                    ? 'border-foreground text-foreground'
                                    : position < index
                                        ? 'border-transparent text-foreground/40'
                                        : 'border-foreground/15 text-foreground/70'
                            }`}
                        >
                            {move.notation}
                        </span>
                    ))}
                </div>
            )}

            <p className="mt-2 text-xs text-foreground/50 font-mono">
                Drag the cube to look around it.
                {picking ? ' Click a sticker to light it up or grey it out.' : ''}
            </p>
        </div>
    );
}
