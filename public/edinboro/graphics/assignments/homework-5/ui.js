'use strict';

const FRUSTUM = 1;
const PERSPECTIVE = 2;

const FOVDisp = document.getElementById("FOVValue")
const AspectDisp = document.getElementById("AspectValue")
const ProjectionDisp = document.getElementById("projectionValue")
const XDisp = document.getElementById("XValue")
const YDisp = document.getElementById("YValue")
const NearDisp = document.getElementById("NearValue")
const FarDisp = document.getElementById("FarValue")

var canvas = new Canvas(500, 500, Keypress, "canvasSpace")
const eyePos = document.getElementById("eyePos")
const atPos = document.getElementById("atPos")

var teapot;
var bunny;
var dragon;
var godzilla;
var epcot;

var walls = [];
var camera;
var at;
var up;
var theta;
var phi;

var minimapAt;
var minimapMap;

MakeItems();
MakeFloor(walls);

function ChangeValue(thing, delta)
{
    switch(thing) {
        case "FOV": canvas.ChangeFOV(delta); break;
        case "Aspect": canvas.ChangeAspect(delta); break;
        case "X": canvas.ChangeX(delta); break;
        case "Y": canvas.ChangeY(delta); break;
        case "Near": canvas.ChangeNear(delta); break;
        case "Far": canvas.ChangeFar(delta); break;
    }
    Redisplay();
}

const FOVPlus = document.getElementById("FOVplus")
FOVPlus.addEventListener("click", () => {ChangeValue("FOV", 1)})

const FOVMinus = document.getElementById("FOVminus")
FOVMinus.addEventListener("click", () => {ChangeValue("FOV", -1)})

const AspectPlus = document.getElementById("Aspectplus")
AspectPlus.addEventListener("click", () => {ChangeValue("Aspect", .1)})

const AspectMinus = document.getElementById("Aspectminus")
AspectMinus.addEventListener("click", () => {ChangeValue("Aspect", -.1)})

const XPlus = document.getElementById("Xplus")
XPlus.addEventListener("click", () => {ChangeValue("X", .2)})

const XMinus = document.getElementById("Xminus")
XMinus.addEventListener("click", () => {ChangeValue("X", -.2)})

const YPlus = document.getElementById("Yplus")
YPlus.addEventListener("click", () => {ChangeValue("Y", .2)})

const YMinus = document.getElementById("Yminus")
YMinus.addEventListener("click", () => {ChangeValue("Y", -.2)})

const NearPlus = document.getElementById("Nearplus")
NearPlus.addEventListener("click", () => {ChangeValue("Near", .2)})

const NearMinus = document.getElementById("Nearminus")
NearMinus.addEventListener("click", () => {ChangeValue("Near", -.2)})


const FarPlus = document.getElementById("Farplus")
FarPlus.addEventListener("click", () => {ChangeValue("Far", .2)})

const FarMinus = document.getElementById("Farminus")
FarMinus.addEventListener("click", () => {ChangeValue("Far", -.2)})

const Reset = document.getElementById("Reset")
Reset.addEventListener("click", () => {canvas.Reset()
    Redisplay()})

ResetCamera();
Redisplay();