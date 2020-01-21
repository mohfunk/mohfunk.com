function preload() {

}

function setup() {
    createCanvas(windowWidth, windowHeight);
    pixelDensity(10);
    createCanvas(windowWidth, windowHeight, WEBGL);
    background(0);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    background(0, 0);
    push();
    noStroke();
    normalMaterial();
    rotateZ(frameCount * 0.001);
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
    box(80, 30 + abs((10 * sin(frameCount * 0.02))));
    pop();
}

function keyPressed() {}
