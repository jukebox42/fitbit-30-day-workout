import { settingsInit, newWorkout, cancelWorkout, updateWorkout } from "./libs/settings";
import { initTimer, startTimer, timerDone } from "./libs/timer";
import { getDay, isActiveExersize, isRestDay, getInterval, getExersizeNumber, alreadyDone, completedExersize, failedExersize } from "./libs/enforcer";
import * as ui from "./ui";

// ui.debug.enable();

function startWorkout() {
  ui.challenge.hide();
  ui.spinner.start();
  newWorkout();
}

// Start the spinner
ui.spinner.start();

// Called when settings are loaded from the companion.
settingsInit((settings) => {
  ui.spinner.start();
  const today = getDay();
  
  /**
   * Init button click handlers
   */
  ui.playButton.onClick(() => {
    updateWorkout(today);
    startTimer(() => {
      ui.background.flash(() => {
        if (completedExersize(settings, today)) {
          ui.successPopup.show();
        }
      });
    });
  })

  ui.resetButton.onClick(() => {
    cancelWorkout();
    ui.challenge.hide();
  });
  
  /**
   * Init popup handlers
   */
  ui.initPopup.onClose(() => {
    startWorkout();
  });
  
  ui.failedPopup.onClose(() => {
    startWorkout();
  });
  
  ui.successPopup.onClose(() => {
    startWorkout();
  });
  
  /**
   * Check exersize status
   */
  if (!isActiveExersize(settings)) {
    ui.spinner.stop();
    ui.initPopup.show();
    return;
  }
  
  if (completedExersize(settings)) {
    ui.spinner.stop();
    ui.successPopup.show();
    return;
  }
  
  if (failedExersize(settings, today)) {
    ui.spinner.stop();
    ui.failedPopup.show();
    return;
  }
  
  /**
   * Set workout values
   */
  const days = getExersizeNumber(settings, today);
  ui.workout.set(days);
  ui.debug.append("Day: " + (days + 1));
  
  if (alreadyDone(settings, today)) {
    timerDone();
    ui.playButton.hide();
    ui.spinner.stop();
    ui.challenge.show();
    return;
  }
  
  const interval = getInterval(days);
  initTimer(interval);
  ui.debug.append("Interval: " + interval);
  
  // Handle rest days
  if (isRestDay(interval)) {
    updateWorkout(today);
    ui.playButton.hide();
  }
  
  // Finally handle showing the challenge
  ui.spinner.stop();
  ui.playButton.show();
  ui.challenge.show();
});
