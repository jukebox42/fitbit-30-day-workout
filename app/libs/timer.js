import document from "document";
import { vibration } from "haptics";
import { display } from "display";
import exercise from "exercise";

const timer = document.getElementById("timer");
const timerBar = document.getElementById("timerBar");

export function initTimer(interval) {
  timerBar.width = 0;
  timer.text = interval;
  
  if (interval === 0) {
    timer.text = "REST";
  }
}

export function timerDone() {
  timer.text = "DONE";
  if (exercise.state === "started") {
    vibration.start("ring");
    display.on = true;
    display.autoOff = true;
    exercise.stop();
    timerBar.width = 0;
  }
}

export function startTimer(callback) {
  display.on = true;
  display.autoOff = false;
  exercise.start("workout");
  const max = parseInt(timer.text, 10);
  const refreshIntervalId = setInterval(
    () => {
      const time = (parseInt(timer.text, 10) - 1);
      timer.text = time;
      timerBar.width = Math.round(((max - time) / max) * 300);
      
      if (timer.text === "0") {
        timerDone();
        clearInterval(refreshIntervalId);
        callback();
      }
    },
    1000
  );
}

