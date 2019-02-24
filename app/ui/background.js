import document from "document";

const background = document.getElementById("background");

export function flash(callback) {
  let countdown = 5;
  background.style.fill = "#0DC2FF";
  const trackerId = setInterval(() => {
    const isEven = countdown % 2 == 0;
    
    // flash background
    if (isEven) {
      background.style.fill = "#0DC2FF";
    } else {
      background.style.fill = "#0CE840";
    }
    
    countdown--;
    
    if (countdown < 0) {
      clearInterval(trackerId);
      background.style.fill = "black";
      callback();
    }
  }, 500);
}