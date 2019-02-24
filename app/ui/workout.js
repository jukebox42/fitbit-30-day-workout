import document from "document";

const workout = document.getElementById("workoutDays");

export function set(exersizeNumber) {
  workout.text = `${exersizeNumber + 1}/30`;
}