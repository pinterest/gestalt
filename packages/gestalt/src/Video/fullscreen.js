// @flow

// For more information on fullscreen and vendor prefixes see
// https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API

export const request = (element: HTMLElement) => {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    // $FlowIssue - missing from Flow
    element.webkitRequestFullscreen();
  } else if (element.mozRequestFullScreen) {
    // $FlowIssue - missing from Flow
    element.mozRequestFullScreen();
  } else if (element.msRequestFullscreen) {
    // $FlowIssue - missing from Flow
    element.msRequestFullscreen();
  }
};

export const exit = () => {
  if (document.exitFullscreen) {
    // $FlowIssue - missing from Flow
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    // $FlowIssue - missing from Flow
    document.webkitExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    // $FlowIssue - missing from Flow
    document.mozCancelFullScreen();
  } else if (document.msExitFullscreen) {
    // $FlowIssue - missing from Flow
    document.msExitFullscreen();
  }
};

export const enabled = () =>
  document.fullscreenEnabled ||
  document.webkitFullscreenEnabled ||
  document.mozFullScreenEnabled ||
  // $FlowIssue - missing from Flow
  document.msFullscreenEnabled;

// Normally document.fullscreen suffices here as a flag, but IE11 does not
// have a vendor specific version so we must instead use the actual element
export const isFullscreen = () =>
  document.fullscreenElement ||
  document.webkitFullscreenElement ||
  document.mozFullScreenElement ||
  // $FlowIssue - missing from Flow
  document.msFullscreenElement;

export const addEventListener = (handler: Function) => {
  document.addEventListener('fullscreenchange', handler);
  document.addEventListener('webkitfullscreenchange', handler);
  document.addEventListener('mozfullscreenchange', handler);
  document.addEventListener('MSFullscreenChange', handler);
};

export const removeEventListener = (handler: Function) => {
  document.removeEventListener('fullscreenchange', handler);
  document.removeEventListener('webkitfullscreenchange', handler);
  document.removeEventListener('mozfullscreenchange', handler);
  document.removeEventListener('MSFullscreenChange', handler);
};

export default undefined;
