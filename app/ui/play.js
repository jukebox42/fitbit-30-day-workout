import document from "document";
import { vibration } from "haptics";

const btn = document.getElementById("btnPlay");

export function show() {
  btn.style.display = "inline";
}

export function hide() {
  btn.style.display = "none";
}

export function onClick(callback) {
  btn.onclick = function(evt) {
    vibration.start("confirmation");
    hide();
    callback(evt);
  }
}
