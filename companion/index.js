import * as messaging from "messaging";
import { settingsStorage } from "settings";

// Message socket opens
messaging.peerSocket.onopen = () => {
  console.log("Companion Socket Open");
  // restoreSettings();
};

// Message socket closes
messaging.peerSocket.onclose = () => {
  console.log("Companion Socket Closed");
};

messaging.peerSocket.onmessage = evt => {
  console.log(`Companion received: ${JSON.stringify(evt.data)}`);
  
  switch(evt.data.command) {
    case "get":
      restoreSettings();
      break;
    case "new":
      settingsStorage.setItem("status", "active");
      settingsStorage.setItem("start", evt.data.data.start);
      settingsStorage.setItem("latest", 0);
      restoreSettings();
      break;
    case "update":
      settingsStorage.setItem("latest", evt.data.data.latest);
      break;
    case "cancel":
      settingsStorage.setItem("status", "inactive");
      settingsStorage.setItem("start", 0);
      settingsStorage.setItem("latest", 0);
      restoreSettings();
    default:
      console.log(`Companion: Unknown command ${evt.data.command}`);
  }
};

// Restore any previously saved settings and send to the device
function restoreSettings() {
  if (!settingsStorage.length) {
    sendData({
      status: "inactive",
    });
    return;
  }
  sendData({
    status: settingsStorage.getItem("status") || "inactive",
    data: {
      start: settingsStorage.getItem("start"),
      latest: settingsStorage.getItem("latest"),
    },
  });
}

// Send data to device using Messaging API
function sendData(data) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  }
}
