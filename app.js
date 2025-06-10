/*
const E = document.getElementById("E-string");
const A = document.getElementById("A-string")
const D = document.getElementById("D-string")
const G = document.getElementById("G-string");
const B = document.getElementById("B-string")
const e = document.getElementById("e-string")
*/

const standardTuning = [
    {note: "E", freq: 82.42},
    {note: "A", freq: 110.00},
    {note: "D", freq: 146.83},
    {note: "G", freq: 196.00},
    {note: "B", freq: 246.94},
    {note: "e", freq: 329.63},
];

const context = new AudioContext();

setupContext();

async function setupContext() {
    const guitar = await getGuitar();
    if (context.state === "suspended"){
        await context.resume();
    }
    const source = context.createMediaStreamSource(guitar)
    const analyser = context.createAnalyser();
    analyser.fftSize = 2048;
    source.connect(analyser)
}

function getGuitar() {
    return navigator.mediaDevices.getUserMedia({
        audio: {
            echoCancellation: false,
            autoGainControl: false,
            noiseSuppression: false,
            latency: 0
        }
    })
}

