'use strict'

function My2String(n) {
    return  n.toFixed(2).toString()
}

class Canvas {
    constructor (width, height, Keypress, id) {
        this.height = height;
        this.width = width;

        this.MakeCanvas(id);
        this.canvas.addEventListener("keypress", Keypress);

        this.SetupGL();
        this.MakeShaders();

        this.Init();

        this.Reset()
    }

    Reset() {
        this.projection = FRUSTUM
        this.fov = 60 
        this.aspect = 1
        this.near = 2
        this.far = 20
        this.dx = 1
        this.dy = 1

        // these should not be here, but quick ui additon...
        FOVDisp.innerHTML = My2String(this.fov)
        ProjectionDisp.innerHTML = "Custom Frustum (X,Y)"
        AspectDisp.innerHTML = My2String(this.aspect)
        NearDisp.innerHTML = My2String(this.near)
        FarDisp.innerHTML = My2String(this.far)
        XDisp.innerHTML = My2String(this.dx)
        YDisp.innerHTML = My2String(this.dy)

        this.NewView([0,0,-1], [0,0,0],[0,1,0]);
    }


    ChangeX(delta) {
        this.dx += delta; 
        XDisp.innerHTML = My2String(this.dx)
    }

    ChangeY(delta) {
        this.dy += delta; 
        YDisp.innerHTML = My2String(this.dy)
    }

    ChangeFar(delta) {
        this.far += delta; 
        FarDisp.innerHTML = My2String(this.far)
    }

    ChangeNear(delta) {
        this.near += delta; 
        NearDisp.innerHTML = My2String(this.near)
    }

    ChangeAspect(delta) {
        this.aspect += delta
        AspectDisp.innerHTML = My2String(this.aspect)
    }

    ChangeFOV(delta) {
        this.fov += delta
        FOVDisp.innerHTML = My2String(this.fov)
    }

    ChangeProjection( value) {
        this.projection = value

        if (value == FRUSTUM) {
             ProjectionDisp.innerHTML = "Custom Frustum (X,Y)"
        } else {
             ProjectionDisp.innerHTML = "MV Frustum (FOV, ASPECT)"
        }
    }

    NewView( camera, at, up) {
        var eye = lookAt(camera, at, up)

        var proj
        if (this.projection == FRUSTUM) {

  	       proj =  this.Frustum(-this.dx, this.dx, -this.dy, this.dy
                    ,this.near ,this.far)
        } else {
           proj = perspective(this.fov, this.aspect, this.near, this.far)
        }

    	proj = mult(proj,eye);
        this.gl.uniformMatrix4fv(this.projLoc, false,flatten(proj));
    }

    NewStaticView(camera, at, up) {
        var eye = lookAt(camera, at, up)

        var proj
        if (this.projection == FRUSTUM) {
  	       proj =  this.Frustum(-1, 1, -1, 1, 2 ,20)
        } else {
           proj = perspective(60, 1, 2, 20)
        }

    	proj = mult(proj,eye);
        this.gl.uniformMatrix4fv(this.projLoc, false,flatten(proj));
    }

    Frustum(l,r,b,t,n,f) {
       var m =  mat4(1);
       m[0][0] = 2 * n / (r - l);
       m[0][1] = 0;
       m[0][2] = (r + l) / (r - l);
       m[0][3] = 0;

       m[1][0] = 0;
       m[1][1] = 2 * n / (t - b);
       m[1][2] = (t + b) / (t - b);
       m[1][3] = 0;

       m[2][0] = 0;
       m[2][1] = 0;
       m[2][2] = -(f + n) / (f - n);
       m[2][3] = -2 * f * n / (f - n);

       m[3][0] = 0;
       m[3][1] = 0;
       m[3][2] = -1;
       m[3][3] = 0;

       return m;
    }

    MakeCanvas(id) {
        if (this.width == undefined || this.width < 0) {
           this.width = 300;
        }

        if (this.height == undefined || this.height < 0) {
           this.height = 300;
        }

        this.canvas = document.createElement('canvas')
  	    this.canvas.tabIndex=0;
        this.canvas.height = this.height;
        this.canvas.width = this.width;
	    this.canvas.style.border = '1px solid #000';

        let parent = document.getElementById(id);
        parent.appendChild(this.canvas);
    }

    SetupGL() {
        this.gl = WebGLUtils.setupWebGL(this.canvas);
        if (!this.gl) {
            alert ("WebGL isn't available");
	        return;
        }
	    this.gl.getExtension('OES_standard_derivatives');
    }

    MakeShaders() {
       var gl = this.gl;
        this.program = initShaders(gl, "vertex-shader","fragment-shader");
        gl.useProgram(this.program);

	    this.projLoc = gl.getUniformLocation(this.program, "uniformProject");
	    this.transLoc = gl.getUniformLocation(this.program, "uniformTransform");
	    this.edgeColorLoc = gl.getUniformLocation(this.program, "uniformEdgeColor");
    	this.surfaceColorLoc = gl.getUniformLocation(this.program, "uniformSurfaceColor");
    }

    Init() {
        var gl = this.gl;

        gl.clearColor(1.0, 1.0, 1.0, 1.0);
        gl.viewport(0,0, this.width, this.height);

  	    //gl.enable(gl.BLEND);
	    //gl.blendFuncSeparate(gl.SRC_ALPHA,
	    //          gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

        gl.enable(gl.DEPTH_TEST);
        gl.frontFace(gl.CW);

        // set the default edge color for everything
	    this.NewEdgeColor([0.0, 0.0, 0.0, 1.0]);
	    this.NewSurfaceColor([1.0, 0.0, 0.0, 1.0]);
    }

    NewSurfaceColor(c) {
        this.gl.uniform4fv(this.surfaceColorLoc, c);
    }

    NewEdgeColor(c) {
        this.gl.uniform4fv(this.edgeColorLoc, c);
    }

    Program() {
       return this.program;
    }

    GL() {
       return this.gl;
    }

    Translate() {
       return this.transLoc;
    }

    Clear() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }

    ClearDepth() {
        this.gl.clear(this.gl.DEPTH_BUFFER_BIT);
    }

    DisplayViewport() {
        this.gl.viewport(0,0, this.width, this.height);
    }

    DisplayViewportInCorner() {
        this.gl.viewport(345, 345, 150, 150);
    }
}
