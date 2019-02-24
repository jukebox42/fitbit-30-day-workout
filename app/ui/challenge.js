import document from "document";

const challenge = document.getElementById("challenge");

export function show() {
  challenge.style.display = "inline";
}

export function hide() {
  challenge.style.display = "none";
}