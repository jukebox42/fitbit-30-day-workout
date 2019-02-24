import document from "document";

import * as reset from "./reset";

const debug = document.getElementById("debug");
const btn = document.getElementById("btnDebug");

let debugEnabled = false;

export function enable() {
  debugEnabled = true;
  btn.style.display = "inline";
}

export function show() {
  debug.style.display = "inline";
}

export function hide() {
  debug.style.display = "none";
}

export function set(content) {
  if (!debugEnabled) {
    return;
  }
  debug.text = "DEBUG\n" + content;
}

export function append(content) {
  if (!debugEnabled) {
    return;
  }
  debug.text = debug.text + "\n" + content;
}

btn.onclick = function(evt) {
  if (debug.style.display !== "inline") {
    reset.show();
    show();
    return;
  }
  reset.hide();
  hide();
}
