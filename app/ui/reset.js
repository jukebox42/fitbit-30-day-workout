import document from "document";

const btn = document.getElementById("btnReset");

export function show() {
  btn.style.display = "inline";
}

export function hide() {
  btn.style.display = "none";
}

export function onClick(callback) {
  btn.onclick = function(evt) {
    callback(evt);
  }
}
