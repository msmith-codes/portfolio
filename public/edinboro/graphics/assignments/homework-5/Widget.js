'use strict'

class Widget {
    constructor(gl, program, tris) {
	this.size = tris.length;

        var bcs = []
	for (var i=0;i<tris.length/3;i++) {
	   bcs.push([0.0,1.0,2.0]); 
	}
	this.SetupVBO(gl, program, tris, bcs);

	this.Reset();
	this.Transform();

    }

    // things we might want to have to totally reset the item.
    Reset() {
        this.visible = true;
	this.rx = 0;
	this.ry = 0;
	this.rz = 0;
	this.sx = 1;
	this.sy = 1;
	this.sz = 1;
	this.tx = 0;
	this.ty = 0;
	this.tz = 0;
    }

    SetupVBO(gl, program, tris, bcs) {

        this.vPos =  gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vPos);

	this.aPos =  gl.getAttribLocation(program, "attributePosition");

        gl.vertexAttribPointer(this.aPos, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.aPos);
	gl.bufferData(gl.ARRAY_BUFFER,flatten(tris),gl.STATIC_DRAW);

	this.vBC = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vBC);

        this.aBC = gl.getAttribLocation(program, "attributeBC");
        gl.vertexAttribPointer(this.aBC,1,gl.FLOAT, false,0,0);
        gl.enableVertexAttribArray(this.aBC);
	gl.bufferData(gl.ARRAY_BUFFER,flatten(bcs),gl.STATIC_DRAW);
    }

    Show() {
        this.visible = true;
    }

    Hide() {
        this.visible = false;
    }

    Visible() {
        return this.visible;
    }

    Transform() {
        var tmp = translate(this.tx, this.ty, this.tz);
	tmp = mult(tmp, scalem(this.sx, this.sy, this.sz));
	tmp = mult(tmp, rotate(this.rz, [0,0,1]));
	tmp = mult(tmp, rotate(this.ry, [0,1,0]));
	tmp = mult(tmp, rotate(this.rx, [1,0,0]));

	this.transform = tmp;
    }

    Display(gl, transform, transLoc) {
          if (this.visible) {

              // make sure that the transform matrix is up to date.
              this.Transform();

	      // multiply it by any incoming transformation matrix
              let tx  =
	      mult(transform, this.transform);
	      // use it
	      gl.uniformMatrix4fv(transLoc, false, flatten(tx)); 

              gl.bindBuffer(gl.ARRAY_BUFFER, this.vPos);
              gl.vertexAttribPointer(this.aPos, 3, gl.FLOAT, false, 0, 0);

              gl.bindBuffer(gl.ARRAY_BUFFER, this.vBC);
              gl.vertexAttribPointer(this.aBC,1,gl.FLOAT, false,0,0);

              gl.drawArrays(gl.TRIANGLES, 0, this.size);
	  }
    }
}
