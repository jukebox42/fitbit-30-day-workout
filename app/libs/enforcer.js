import * as constants from "./constants";
import * as ui from "../ui";

const hoursInDay = (1000 * 60 * 60 * 24);

export function getDay() {
  return new Date().setHours(0, 0, 0, 0);
}

export function isRestDay(interval) {
  return interval === 0;
}

export function skippedRestDay(settings, today) {
  // check if yesterday was a rest day.
  const numb = getExersizeNumber(settings, settings.data.latest);
  const skipped = constants.intervals[numb + 1] === 0;
  ui.debug.set(`Rest day skipped. Latest: ${settings.data.latest}`);
  return skipped;
}

export function alreadyDone(settings, today) {
  return `${today}` === settings.data.latest;
}

export function getExersizeNumber(settings, today) {
  return Math.round((today - settings.data.start) / hoursInDay);
}

export function getInterval(numb) {
  return constants.intervals[numb];
}

export function failedExersize(settings, today) {
  if (settings.data.latest === "0") {
    return Math.round((getDay() - settings.data.start)) > hoursInDay;
  }
  return Math.round((getDay() - settings.data.latest)) > hoursInDay;
}

export function completedExersize(settings, today) {
  // handle telling them they won today
  if (today && Math.round((today - settings.data.start) / hoursInDay) >= 29) {
      return true;
  }
  return Math.round((settings.data.latest - settings.data.start) / hoursInDay) >= 29;
}

export function isActiveExersize(settings, today) {
  return settings.status === "active";
}
