let input_name = window.prompt("Enter your name: ") as string;
let start_button = document.getElementById("start_button") as HTMLAnchorElement;

// set query string
let params = new URLSearchParams();
params.set("name", input_name);
start_button.href = `./game.html?${params.toString()}`;
