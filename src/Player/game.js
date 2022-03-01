let character = document.getElementById("character");
let both = 0;
let interval;
let speed = 5;

function moveLeft() {
    let left = parseInt(
        window.getComputedStyle(character).getPropertyValue("left")
    );
    if (left >= 0) {
        character.style.left = left - speed + "px";
    }
}
function moveRight() {
    let left = parseInt(
        window.getComputedStyle(character).getPropertyValue("left")
    );
    if (left > 0.01 ){
        character.style.left = left + speed + "px";
    }
}
function moveUp() {
    let top = parseInt(
        window.getComputedStyle(character).getPropertyValue("top")
    );
    if (top >= 0) {
        character.style.top = top - speed + "px";
    }
}
function moveDown() {
    let top = parseInt(
        window.getComputedStyle(character).getPropertyValue("top")
    );
    if (top >= 0) {
        character.style.top = top + speed + "px";
    }
}
document.addEventListener("keydown", (event) => {
    if (both == 0) {
        both++;
        if (event.key == "a") {
            interval = setInterval(moveLeft, 1);
        }
        if (event.key == "d") {
            interval = setInterval(moveRight, 1);
        }
        if (event.key == "w") {
            interval = setInterval(moveUp, 1);
        }
        if (event.key == "s") {
            interval = setInterval(moveDown, 1);
        }
    }
});
document.addEventListener("keyup", () => {
    clearInterval(interval);
    both = 0;
});
