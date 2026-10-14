import * as THREE from 'three';
import { STICKER_COLORS } from './stickers';
import type { FaceletLetter } from './stickers';
import type { Move } from './moves';
import { stickerId } from './facelets';

// A 3x3 cube rendered with three.js, driven one move at a time.
//
// Each of the 26 cubies is a black body with a coloured plane stuck to every
// exposed side. To turn a layer, the cubies in it are re-parented to a pivot at
// the middle of the cube, the pivot is spun, and then they are handed back to the
// root with their world transform intact and snapped onto the grid.

const BODY = 0.94;
const STICKER = 0.8;
const LIFT = BODY / 2 + 0.006;
const BODY_COLOR = 0x15171c;

// Standard scheme: white up, yellow down, green front, red right.
const FACE_LETTERS = {
    px : 'R',
    nx : 'O',
    py : 'W',
    ny : 'Y',
    pz : 'G',
    nz : 'B',
} as const satisfies Record<string, FaceletLetter>;

interface Cubie
{
    mesh : THREE.Mesh;
    coords : { x : number; y : number; z : number };
}

interface Sticker
{
    mesh : THREE.Mesh;
    material : THREE.MeshLambertMaterial;
    letter : FaceletLetter;
    // Facelet id, fixed when the cube is built so it travels with the sticker.
    id : string;
}

interface ActiveMove
{
    move : Move;
    cubies : Cubie[];
    angle : number;
    duration : number;
    elapsed : number;
    onDone : (() => void) | undefined;
}

function easeInOutQuad(t : number) : number
{
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

// Positions land on whole numbers and rotations on signed permutation matrices,
// so rounding both after every move stops float drift from accumulating.
function snapToGrid(mesh : THREE.Mesh)
{
    mesh.position.set(
        Math.round(mesh.position.x),
        Math.round(mesh.position.y),
        Math.round(mesh.position.z),
    );

    const matrix = new THREE.Matrix4().makeRotationFromQuaternion(mesh.quaternion);
    for (let i = 0; i < 16; i++)
    {
        matrix.elements[i] = Math.round(matrix.elements[i]);
    }
    mesh.quaternion.setFromRotationMatrix(matrix);
}

export class CubeScene
{
    private renderer : THREE.WebGLRenderer;
    private scene : THREE.Scene;
    private camera : THREE.PerspectiveCamera;
    private root : THREE.Group;
    private pivot : THREE.Group;
    private cubies : Cubie[] = [];
    private stickers : Sticker[] = [];
    private active : ActiveMove | null = null;
    private raycaster = new THREE.Raycaster();
    private focus = new Set<string>();
    private lastFrame = 0;
    private disposed = false;

    // Camera orbit, in spherical coordinates around the middle of the cube.
    private theta = Math.PI / 4;
    private phi = Math.PI / 3.1;
    private radius = 7.2;

    constructor(canvas : HTMLCanvasElement)
    {
        this.renderer = new THREE.WebGLRenderer({ canvas, antialias : true, alpha : true });
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);

        this.root = new THREE.Group();
        this.pivot = new THREE.Group();
        this.scene.add(this.root, this.pivot);

        this.scene.add(new THREE.AmbientLight(0xffffff, 2.6));

        const key = new THREE.DirectionalLight(0xffffff, 2.2);
        key.position.set(6, 9, 7);
        this.scene.add(key);

        const fill = new THREE.DirectionalLight(0xffffff, 1.1);
        fill.position.set(-7, -4, -6);
        this.scene.add(fill);

        this.build();
        this.updateCamera();

        this.lastFrame = performance.now();
        this.renderer.setAnimationLoop(this.tick);
    }

    private build()
    {
        const body = new THREE.BoxGeometry(BODY, BODY, BODY);
        const bodyMaterial = new THREE.MeshLambertMaterial({ color : BODY_COLOR });
        const sticker = new THREE.PlaneGeometry(STICKER, STICKER);

        for (let x = -1; x <= 1; x++)
        {
            for (let y = -1; y <= 1; y++)
            {
                for (let z = -1; z <= 1; z++)
                {
                    if (x === 0 && y === 0 && z === 0) continue;

                    const mesh = new THREE.Mesh(body, bodyMaterial);
                    mesh.position.set(x, y, z);

                    const at : [number, number, number] = [x, y, z];
                    if (x === 1) mesh.add(this.makeSticker(sticker, FACE_LETTERS.px, at, [1, 0, 0], [LIFT, 0, 0], [0, Math.PI / 2, 0]));
                    if (x === -1) mesh.add(this.makeSticker(sticker, FACE_LETTERS.nx, at, [-1, 0, 0], [-LIFT, 0, 0], [0, -Math.PI / 2, 0]));
                    if (y === 1) mesh.add(this.makeSticker(sticker, FACE_LETTERS.py, at, [0, 1, 0], [0, LIFT, 0], [-Math.PI / 2, 0, 0]));
                    if (y === -1) mesh.add(this.makeSticker(sticker, FACE_LETTERS.ny, at, [0, -1, 0], [0, -LIFT, 0], [Math.PI / 2, 0, 0]));
                    if (z === 1) mesh.add(this.makeSticker(sticker, FACE_LETTERS.pz, at, [0, 0, 1], [0, 0, LIFT], [0, 0, 0]));
                    if (z === -1) mesh.add(this.makeSticker(sticker, FACE_LETTERS.nz, at, [0, 0, -1], [0, 0, -LIFT], [0, Math.PI, 0]));

                    this.root.add(mesh);
                    this.cubies.push({ mesh, coords : { x, y, z } });
                }
            }
        }
    }

    private makeSticker(
        geometry : THREE.PlaneGeometry,
        letter : FaceletLetter,
        cubie : [number, number, number],
        normal : [number, number, number],
        position : [number, number, number],
        rotation : [number, number, number],
    ) : THREE.Mesh
    {
        const material = new THREE.MeshLambertMaterial({
            color : STICKER_COLORS[letter],
            side : THREE.DoubleSide,
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(...position);
        mesh.rotation.set(...rotation);

        this.stickers.push({ mesh, material, letter, id : stickerId(cubie, normal) });
        return mesh;
    }

    // Lights the listed stickers and greys out the rest, so a guide can point at
    // just the pieces it is talking about. An empty set puts the whole cube back.
    setFocus(ids : Set<string>)
    {
        this.focus = new Set(ids);

        for (const sticker of this.stickers)
        {
            const lit = ids.size === 0 || ids.has(sticker.id);
            sticker.material.color.set(lit ? STICKER_COLORS[sticker.letter] : STICKER_COLORS.X);
        }
    }

    // The sticker under a point on the canvas, in normalised device coordinates,
    // or null if the click missed the cube.
    pick(x : number, y : number) : string | null
    {
        this.raycaster.setFromCamera(new THREE.Vector2(x, y), this.camera);

        // The cubie bodies go in alongside the stickers so that a click landing in
        // a gap is stopped by the cube, rather than carrying on through it and
        // picking a sticker on the far side.
        const hits = this.raycaster.intersectObjects(
            [
                ...this.cubies.map((cubie) => cubie.mesh),
                ...this.stickers.map((sticker) => sticker.mesh),
            ],
            false,
        );

        if (hits.length === 0) return null;
        return this.stickers.find((sticker) => sticker.mesh === hits[0].object)?.id ?? null;
    }

    private tick = () =>
    {
        const now = performance.now();
        // Browsers starve rAF in a hidden or covered tab. Capping the step keeps a
        // turn from snapping to its end the moment the tab comes back into view.
        const delta = Math.min(now - this.lastFrame, 1000 / 15);
        this.lastFrame = now;

        if (this.active !== null)
        {
            this.active.elapsed += delta;
            const progress = Math.min(this.active.elapsed / this.active.duration, 1);
            this.pivot.rotation[this.active.move.axis] = this.active.angle * easeInOutQuad(progress);

            if (progress >= 1) this.finish();
        }

        this.renderer.render(this.scene, this.camera);
    };

    private finish()
    {
        if (this.active === null) return;

        const { move, cubies, angle, onDone } = this.active;

        this.pivot.rotation.set(0, 0, 0);
        this.pivot.rotation[move.axis] = angle;
        this.pivot.updateMatrixWorld(true);

        for (const cubie of cubies)
        {
            this.root.attach(cubie.mesh);
            snapToGrid(cubie.mesh);
            cubie.coords = {
                x : Math.round(cubie.mesh.position.x),
                y : Math.round(cubie.mesh.position.y),
                z : Math.round(cubie.mesh.position.z),
            };
        }

        this.pivot.rotation.set(0, 0, 0);

        // Cleared before the callback, so a listener may start the next move.
        this.active = null;
        onDone?.();
    }

    get busy() : boolean
    {
        return this.active !== null;
    }

    // Starts a move. Returns false if one is still running, so callers can retry
    // on the next tick rather than stacking turns on top of each other.
    rotate(move : Move, duration : number, onDone? : () => void) : boolean
    {
        if (this.active !== null || this.disposed) return false;

        const cubies = this.cubies.filter((cubie) => move.layers.includes(cubie.coords[move.axis]));

        this.pivot.rotation.set(0, 0, 0);
        this.pivot.updateMatrixWorld(true);
        for (const cubie of cubies) this.pivot.attach(cubie.mesh);

        this.active = {
            move,
            cubies,
            angle : (move.quarterTurns * Math.PI) / 2,
            duration : Math.max(duration, 1),
            elapsed : 0,
            onDone,
        };

        if (duration <= 0) this.finish();
        return true;
    }

    applyInstant(moves : Move[])
    {
        for (const move of moves) this.rotate(move, 0);
    }

    // Returns the cube to solved, cancelling anything in flight.
    reset()
    {
        this.active = null;
        this.pivot.rotation.set(0, 0, 0);

        // Anything parented to the pivot mid-turn comes back to the root first.
        for (const cubie of this.cubies) this.root.add(cubie.mesh);

        // The cubies were built in this same order, so the grid walk re-seats them.
        let index = 0;
        for (let x = -1; x <= 1; x++)
        {
            for (let y = -1; y <= 1; y++)
            {
                for (let z = -1; z <= 1; z++)
                {
                    if (x === 0 && y === 0 && z === 0) continue;

                    const cubie = this.cubies[index++];
                    cubie.mesh.position.set(x, y, z);
                    cubie.mesh.quaternion.identity();
                    cubie.coords = { x, y, z };
                }
            }
        }
    }

    orbit(deltaX : number, deltaY : number)
    {
        this.theta -= deltaX * 0.01;
        this.phi = Math.max(0.25, Math.min(Math.PI - 0.25, this.phi - deltaY * 0.01));
        this.updateCamera();
    }

    private updateCamera()
    {
        this.camera.position.set(
            this.radius * Math.sin(this.phi) * Math.sin(this.theta),
            this.radius * Math.cos(this.phi),
            this.radius * Math.sin(this.phi) * Math.cos(this.theta),
        );
        this.camera.lookAt(0, 0, 0);
    }

    resize(width : number, height : number)
    {
        if (width === 0 || height === 0) return;

        this.renderer.setSize(width, height, false);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }

    dispose()
    {
        this.disposed = true;
        this.renderer.setAnimationLoop(null);

        this.scene.traverse((object) =>
        {
            if (!(object instanceof THREE.Mesh)) return;

            object.geometry.dispose();
            const material = object.material;
            if (Array.isArray(material)) material.forEach((entry) => entry.dispose());
            else material.dispose();
        });

        this.renderer.dispose();
    }
}
