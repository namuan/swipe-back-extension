let delta = 0;

// Debounce function to delay execution until after a period of inactivity
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Debounced function to handle navigation
const handleNavigation = debounce(() => {
  if (delta < -150) {
    history.back();
  } else if (delta > 150) {
    history.forward();
  }
  delta = 0; // Reset delta after navigation check
}, 100);

document.addEventListener(
  "wheel",
  (e) => {
    // Ignore if modifiers are pressed or more vertical than horizontal
    if (
      e.ctrlKey ||
      e.metaKey ||
      e.altKey ||
      e.shiftKey ||
      Math.abs(e.deltaY) > Math.abs(e.deltaX)
    ) {
      return;
    }

    // Accumulate horizontal delta
    delta += e.deltaX;

    // Trigger debounced navigation check
    handleNavigation();
  },
  { passive: true },
);
