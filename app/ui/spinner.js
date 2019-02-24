import document from "document";

const spinner = document.getElementById("spinner");

export function start() {
  spinner.state = "enabled";
}

export function stop() {
  spinner.state = "disabled";
}
