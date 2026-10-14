import { CubeFace } from "../../_components/cubing";
import CubePlayer from "../../_components/cubing/CubePlayer";

// Every player on this page lights the four white edges and the yellow centre,
// the only pieces the daisy cares about, and locks that so a reader cannot
// click the highlighting away.
const DAISY_FOCUS = "U2 U4 U6 U8 D5";

interface DiagramProps
{
    face : string;
    caption : string;
    title : string;
}

function Diagram(props : DiagramProps)
{
    return (
        <figure className="flex flex-col items-center gap-2 w-48">
            <CubeFace face={props.face} size={150} title={props.title} />
            <figcaption className="text-xs text-foreground/60 font-mono text-center leading-relaxed">
                {props.caption}
            </figcaption>
        </figure>
    );
}

interface DemoProps
{
    algorithm : string;
    setup : string;
    caption : string;
}

function Demo(props : DemoProps)
{
    return (
        <figure className="w-full max-w-md">
            <CubePlayer
                algorithm={props.algorithm}
                setup={props.setup}
                focus={DAISY_FOCUS}
                preview_only
                height={280}
            />
            <figcaption className="mt-2 text-xs text-foreground/60 font-mono leading-relaxed">
                {props.caption}
            </figcaption>
        </figure>
    );
}

function Move(props : { children : string })
{
    return (
        <code className="px-1.5 py-0.5 mx-0.5 text-foreground font-mono border border-foreground/20 rounded">
            {props.children}
        </code>
    );
}

export default function LayerByLayerPage()
{
    return (
        <main className="max-w-6xl mx-auto px-12 py-8">
            <div className="space-y-8">
                {/* Page Title */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-foreground font-mono mb-4">Layer by Layer</h1>
                    <div className="w-24 h-0.5 bg-foreground/20 mx-auto"></div>
                </div>

                {/* Notation */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground font-mono">Notation</h2>
                    <ul className="text-foreground/80 font-mono space-y-1 list-disc pl-5">
                        <li><Move>F</Move> <Move>B</Move> <Move>R</Move> <Move>L</Move> <Move>U</Move> <Move>D</Move> — turn the front, back, right, left, up or down face clockwise, looking straight at that face</li>
                        <li><Move>&apos;</Move> — a prime means turn that face counter-clockwise instead, as in <Move>F&apos;</Move></li>
                        <li><Move>2</Move> — a half turn, 180&deg;, as in <Move>F2</Move>. Direction does not matter</li>
                    </ul>
                    <p className="text-foreground/80 font-mono leading-relaxed">
                        Every diagram on this page looks straight down at the top face of the cube.
                        The bottom row of a diagram is the side of the cube facing you, and grey
                        stickers are pieces that do not matter yet.
                    </p>
                </section>

                {/* Step 1 */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground font-mono">Step 1 &mdash; The Daisy</h2>

                    <p className="text-foreground/80 font-mono text-lg leading-relaxed">
                        Hold the cube with the yellow center facing up and keep it there for this
                        whole step. The goal is to bring all four white edges next to that yellow
                        center, so the top of the cube looks like a flower: a yellow middle with
                        four white petals.
                    </p>

                    <div className="flex flex-wrap gap-8">
                        <Diagram
                            face="XXX XYX XXX"
                            title="Yellow center facing up, no petals placed"
                            caption="Start here: yellow on top, no petals yet."
                        />
                        <Diagram
                            face="XWX WYW XWX"
                            title="Completed daisy, four white edges around the yellow center"
                            caption="The finished daisy. Corners are ignored."
                        />
                    </div>

                    <Demo
                        setup="x2"
                        algorithm="F2 R2 B2 L2"
                        caption="A daisy built from scratch. This cube starts with all four white edges already lying on the bottom, which a real scramble will not do, so treat it as the shape you are aiming for rather than a sequence to memorise. Everything but the white edges and the yellow centre is greyed out."
                    />

                    <p className="text-foreground/80 font-mono leading-relaxed">
                        Only the four edges touching the yellow center matter. The corners are
                        ignored, and so is the second color on each white edge &mdash; a white and
                        red edge is just as good as a white and blue one. Matching those colors
                        happens in the next step.
                    </p>

                    <h3 className="text-xl font-bold text-foreground font-mono">The one rule</h3>
                    <p className="text-foreground/80 font-mono leading-relaxed">
                        Turning the top face with <Move>U</Move> is always free &mdash; every petal
                        you have already placed just slides to another petal slot and stays on top.
                        Turning a side face is what knocks a petal back out. So before any side
                        turn, use <Move>U</Move> to swing an <em>empty</em> slot into the spot where
                        the new petal will arrive.
                    </p>

                    <h3 className="text-xl font-bold text-foreground font-mono">Case 1: the white edge is on the bottom face</h3>

                    <div className="flex flex-wrap gap-8 items-start">
                        <Diagram
                            face="XWX WYW XXX"
                            title="Three petals placed with the front slot empty"
                            caption="Front slot empty, waiting for a petal."
                        />
                        <p className="text-foreground/80 font-mono leading-relaxed flex-1 min-w-64">
                            The easiest case. Turn <Move>D</Move> until the white edge sits on the
                            bottom of the face you want to bring it up through, turn <Move>U</Move>
                            until that slot is empty, then turn that face 180&deg;. With the front
                            slot empty as shown, that is <Move>F2</Move>: the edge comes straight up
                            the front face and lands with white pointing at the ceiling.
                        </p>
                    </div>

                    <Demo
                        setup="x2"
                        algorithm="F2"
                        caption="The white edge starts face down on the bottom. One half turn of the front face carries it straight up into the empty front slot, white pointing at the ceiling."
                    />

                    <h3 className="text-xl font-bold text-foreground font-mono">Case 2: the white edge is in the middle layer</h3>

                    <div className="flex flex-wrap gap-8 items-start">
                        <Diagram
                            face="XWX WYX XWX"
                            title="Three petals placed with the right slot empty"
                            caption="Right slot empty, ready for an R turn."
                        />
                        <div className="flex-1 min-w-64 space-y-3">
                            <p className="text-foreground/80 font-mono leading-relaxed">
                                The edge is wedged between two side faces and the white sticker
                                points sideways. One turn lifts it, but which turn depends on
                                where white is pointing. Say the edge sits between the front and
                                right faces:
                            </p>
                            <ul className="text-foreground/80 font-mono space-y-2 list-disc pl-5">
                                <li>
                                    White facing <strong>front</strong> &mdash; empty the right slot,
                                    then <Move>R</Move>.
                                </li>
                                <li>
                                    White facing <strong>right</strong> &mdash; empty the front slot,
                                    then <Move>F&apos;</Move>.
                                </li>
                            </ul>
                            <p className="text-foreground/80 font-mono leading-relaxed">
                                The pattern: turn the face that white is <em>not</em> on, in the
                                direction that carries the white sticker upward.
                            </p>
                        </div>
                    </div>

                    <Demo
                        setup="x2 R"
                        algorithm="R"
                        caption="Here the white edge is wedged between the front and right faces with white pointing at you. White is not on the right face, so turning the right face is what lifts it: R, into the waiting right slot."
                    />

                    <h3 className="text-xl font-bold text-foreground font-mono">Case 3: the white edge is already on top, but white points sideways</h3>

                    <p className="text-foreground/80 font-mono leading-relaxed">
                        It looks nearly right, but white has to face up to count as a petal. Turn
                        that side face once &mdash; for an edge on the front face, <Move>F</Move>
                        &mdash; which drops the piece into the middle layer. Now it is Case 2, so
                        empty the slot it is heading for and lift it back up. Turning the face
                        180&deg; does not work here: white stays stuck on the side of the cube.
                    </p>

                    <Demo
                        setup="x2 F L'"
                        algorithm="L F"
                        caption="The white edge is already in the top layer, but white faces left instead of up, so it is not a petal yet. L drops it into the middle layer, and F lifts it back with white on top."
                    />

                    <h3 className="text-xl font-bold text-foreground font-mono">Common mistakes</h3>
                    <ul className="text-foreground/80 font-mono space-y-2 list-disc pl-5">
                        <li>
                            Turning a side face without checking that the slot above it is empty.
                            You place one petal and knock another one out, forever.
                        </li>
                        <li>
                            Letting the yellow center drift off the top. Center pieces never move
                            relative to each other, so yellow up is your anchor for the whole step.
                        </li>
                        <li>
                            Counting a yellow and white edge as done when yellow is the one facing
                            up. The white sticker has to point up.
                        </li>
                    </ul>

                    <p className="text-foreground/80 font-mono leading-relaxed">
                        Four petals and the daisy is done. Next step: turn each petal down 180&deg;
                        to build the white cross on the bottom, lining up each edge with its
                        matching center first.
                    </p>
                </section>
            </div>
        </main>
    );
}
