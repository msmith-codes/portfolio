'use strict';

const FA = [-10, 2, -10];
const FB = [ 10, 2.5, -10];
const FC = [0, 2.5, 0];
const FD = [ 10, 2.5,  10];
const FE = [-10, 2.5,  10];

const Floor = [FA, FB, FC, FB, FD, FC, FD, FE, FC, FE, FA, FC];

function MakeItems()
{
    teapot = new Widget(canvas.GL(), canvas.Program(), Teapot_Triangles);
    teapot.tz = 4;
    teapot.ty = 4.75;
    teapot.rx = -90;
    
    godzilla = new Widget(canvas.GL(), canvas.Program(), Lizard_Triangles);
    godzilla.rx = -90;
    godzilla.ty = 4.75;
    godzilla.tx = 4;
    
    bunny = new Widget(canvas.GL(), canvas.Program(), Bunny_Triangles);
    bunny.tx = -4;
    bunny.ty = 4.75;

    dragon = new Widget(canvas.GL(), canvas.Program(), Dragon_Triangles);
    dragon.tz = -4;
    dragon.ty = 4.75;

    epcot = new Widget(canvas.GL(), canvas.Program(), Epcot_Triangles);
    epcot.tx = 0;
    epcot.ty = 5;
    epcot.tz = 0;
}

function MakeFloor(walls)
{
    var floor = new Widget(canvas.GL(), canvas.Program(), Floor)
    walls.push(floor);
}

function ResetCamera()
{
    up = [0, 1, 0];
    theta = 0;
    phi = 90;

    camera = [0, 5, 0];
    MoveAt(0.5);

    minimapAt = [0, 1, 0];
    minimapMap = [0, 15, 0];

}

function Fix(angle)
{
    while(angle < 0) {
        angle += 360;
    }
    angle %= 360;
    return angle;
}

function Offset(delta)
{
    let x;
    let y;
    let z;

    theta = Fix(theta);
    phi = Fix(phi);

    let rphi = phi * Math.PI/180;
    let rtheta = theta * Math.PI/180;

    z = delta * Math.sin(rphi) * Math.cos(rtheta);
    y = delta * Math.cos(rphi);
    x = delta * Math.sin(rphi) * Math.sin(rtheta);

    return ([x,y,z]);
}

function PosString(pos)
{
    let rv = "("
        + pos[0].toFixed(2).toString() + ", "
        + pos[1].toFixed(2).toString() + ", "
        + pos[2].toFixed(2).toString() + ")";
    return rv;
}

// Looking around.
function MoveAt(delta)
{
    let offset = Offset(delta);
    at = add(camera, offset);
    atPos.innerHTML = PosString(at);
    eyePos.innerHTML = PosString(camera);
}

// Walking around.
function MoveAll(delta)
{
    let offset = Offset(delta);
    camera = add(camera, offset);
    camera[1] = 5;
    at = add(at, offset);
    at[1] = 5; 

    if(at[0] <= -2.5) {
        at[0] = -2.5;
        camera[0] = -2;
    }
    
    if(at[0] >= 2.0) {
        at[0] = 2.0;
        camera[0] = 1.5;
    }

    if(at[2] >= 2.5) {
        at[2] = 2.5;
        camera[2] = 2;
    }

    if(at[2] <= -2.0) {
        at[2] = -2.0;
        camera[2] = -1.5;
    }


    atPos.innerHTML = PosString(at);
    eyePos.innerHTML = PosString(camera);
}

function Keypress(evnt) 
{
    switch(evnt.key) {
        case 'r': ResetCamera(); break;
        case 's': MoveAll(-0.5)
                    break
        case 'w': MoveAll(0.5); break;
        case 'a': theta += 1
                    MoveAt(0.5)
                    break
        case 'f': canvas.ChangeProjection(FRUSTUM)
                    break
        case 'p': canvas.ChangeProjection(PERSPECTIVE)
                    break
        case 'd': theta -= 1;
                    MoveAt(0.5);
                    break;
        case 'e': phi -= 1;
                    MoveAt(0.5);
                    break;
        case 'q': phi += 1;
                    MoveAt(0.5);
                    break;
    }
    Redisplay();
}

function Redisplay() {
    // Render the main view
    canvas.Clear(); // Clear the WebGL context
    canvas.NewStaticView(minimapMap, [0, 5, 0.5], up);
    canvas.DisplayViewport(); // Set the viewport for the minimap
    renderScene(true); // Render the minimap
    
    // Render the minimap view
    canvas.ClearDepth(); // Clear the depth buffer only
    canvas.NewView(camera, at, up);
    canvas.DisplayViewportInCorner(); // Set the viewport for the main view
    renderScene(false); // Render the main scene
}

function renderScene(isMinimap) {
    // Set the front face to clockwise
    canvas.GL().frontFace(canvas.GL().CW);

    // Set the surface and edge colors and render the walls
    canvas.NewSurfaceColor([0.5, 0.2, 0.7, 1.0]);
    canvas.NewEdgeColor([1.0, 1.0, 1.0, 1.0]);
    for (var i = 0; i < walls.length; i++) {
        walls[i].Display(canvas.GL(), mat4(), canvas.Translate());
    }

    // Set the edge color to black
    canvas.NewEdgeColor([0.0, 0.0, 0.0, 1.0]);

    // Render the teapot
    canvas.NewSurfaceColor([1.0, 0.0, 0.0, 1.0]);
    canvas.GL().frontFace(canvas.GL().CW);
    teapot.Display(canvas.GL(), mat4(), canvas.Translate());

    // Render Godzilla
    canvas.NewSurfaceColor([0.0, 1.0, 0.0, 1.0]);
    canvas.GL().frontFace(canvas.GL().CCW);
    godzilla.Display(canvas.GL(), mat4(), canvas.Translate());

    // Render the bunny
    canvas.NewSurfaceColor([0.0, 0.0, 1.0, 1.0]);
    bunny.Display(canvas.GL(), mat4(), canvas.Translate());

    // Render the dragon
    canvas.NewSurfaceColor([0.0, 1.0, 1.0, 1.0]);
    dragon.Display(canvas.GL(), mat4(), canvas.Translate());

    if (isMinimap) {
        canvas.NewSurfaceColor([1.0, 1.0, 1.0, 1.0]);
        epcot.Display(canvas.GL(), mat4(), canvas.Translate());
        epcot.tx = camera[0];
        epcot.tz = camera[2];

        renderFrustum();
    }
}

function renderFrustum() {
    let fov = canvas.fov * Math.PI / 180; // Convert FOV to radians
    let aspect = canvas.aspect;
    let near = canvas.near;
    let far = canvas.far;

    // Calculate the frustum vertices
    let vertices = [];

    let tanHalfFov = Math.tan(fov / 2);

    // Near plane dimensions
    let nearHeight = 2 * tanHalfFov * near;
    let nearWidth = nearHeight * aspect;

    // Far plane dimensions
    let farHeight = 2 * tanHalfFov * far;
    let farWidth = farHeight * aspect;

    // Camera direction vectors
    let forward = normalize(subtract(at, camera));
    let right = normalize(cross(forward, up));
    let camUp = cross(right, forward);

    // Far plane center
    let farCenter = add(camera, scale(far, forward));

    // Calculate the 6 vertices of the frustum with the camera position as the apex
    vertices.push(camera); // Apex of the frustum at the camera position

    vertices.push(add(farCenter, add(scale(farHeight / 2, camUp), scale(-farWidth / 2, right))));
    vertices.push(add(farCenter, add(scale(farHeight / 2, camUp), scale(farWidth / 2, right))));
    vertices.push(add(farCenter, add(scale(-farHeight / 2, camUp), scale(farWidth / 2, right))));
    vertices.push(add(farCenter, add(scale(-farHeight / 2, camUp), scale(-farWidth / 2, right))));

    canvas.NewSurfaceColor([1.0, 0.0, 0.0, 0.5]); // Transparent red
    
    // Draw the frustum
    let frustum = new Widget(canvas.GL(), canvas.Program(), vertices);
    frustum.Display(canvas.GL(), mat4(), canvas.Translate());
}












