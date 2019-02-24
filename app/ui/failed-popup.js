import document from "document";
import { vibration } from "haptics";

const popupElement = document.getElementById("failedPopup");
const buttonElement = document.getElementById("failedPopupBtn");

export function show() {
  popupElement.style.display = "inline";
}

export function hide() {
  popupElement.style.display = "none";
}

export function onClose(callback) {
  buttonElement.onclick = (evt) => {
    vibration.start("confirmation");
    hide();
    callback();
  }
}
