import * as messaging from "messaging";
import * as ui from "../ui";

export function settingsInit(callback) {
  // Message is received
  messaging.peerSocket.onmessage = evt => {
    ui.debug.set(`App received: ${JSON.stringify(evt.data, null, "  ")}`);
    callback(evt.data);
  };

  // Message socket opens
  messaging.peerSocket.onopen = () => {
    ui.debug.append("App Socket Open");
    send("get", {});
  };

  // Message socket closes
  messaging.peerSocket.onclose = () => {
    ui.debug.append("App Socket Closed");
  };

  // Listen for the onerror event
  messaging.peerSocket.onerror = function(err) {
    // Handle any errors
    ui.debug.append(`Connection Error: ${err.code} - ${err.message}`);
  }
}

export function updateWorkout(today) {
  send("update", { latest: today });
}

export function cancelWorkout() {
  send("cancel", {});
}

export function newWorkout() {
  send("new", {});
}

function send(command, data) {
  const msg = {
    command: command,
    data: data,
  };
  ui.debug.append(`Sending: ${JSON.stringify(msg, null, "  ")}`);
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(msg);
  } else {
    setTimeout(() => {
      ui.debug.append("Connection not set. Trying again");
      send(command, data);
    }, 1000);
  }
}