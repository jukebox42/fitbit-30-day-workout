import document from "document";
import { vibration } from "haptics";

const popupElement = document.getElementById("successPopup");
const buttonElement = document.getElementById("successPopupBtn");

export function show() {
  vibration.start("ring");
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
