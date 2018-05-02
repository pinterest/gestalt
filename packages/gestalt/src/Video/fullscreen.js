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

export default undefined;
