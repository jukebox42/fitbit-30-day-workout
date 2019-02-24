import * as constants from "./constants";

export function getDay() {
  const start = new Date();
  return start.setHours(0,0,0,0);
}

export function isRestDay(interval) {
  return interval === 0;
}

export function alreadyDone(settings, today) {
  return `${today}` === settings.data.latest;
}

export function getExersizeNumber(settings, today) {
  return Math.round((today - settings.data.start) / (1000*60*60*24));
}

export function getInterval(numb) {
  return constants.intervals[numb];
}

export function failedExersize(settings, today) {
  if (settings.data.latest === "0") {
    return Math.round((getDay() - settings.data.start)) > 86400000;
  }
  return Math.round((getDay() - settings.data.latest)) > 86400000;
}

export function completedExersize(settings, today) {
  // handle telling them they won today
  if (today && Math.round((today - settings.data.start) / (1000*60*60*24)) >= 29) {
      return true;
  }
  return Math.round((settings.data.latest - settings.data.start) / (1000*60*60*24)) >= 29;
}

export function isActiveExersize(settings, today) {
  return settings.status === "active";
}
