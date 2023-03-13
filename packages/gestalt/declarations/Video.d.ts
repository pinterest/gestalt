import type { Node } from 'react';
import { PureComponent } from 'react';
declare type Source =
  | string
  | ReadonlyArray<{
      type: 'video/m3u8' | 'video/mp4' | 'video/ogg';
      src: string;
    }>;
declare type ObjectFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
declare type CrossOrigin = 'anonymous' | 'use-credentials';
declare type BackgroundColor = 'black' | 'transparent';
declare type Props = {
  /**
   * Accessibility label for the button to hide captions if controls are shown.
   */
  accessibilityHideCaptionsLabel?: string;
  /**
   * Accessibility label for the fullscreen maximize button if controls are shown.
   */
  accessibilityMaximizeLabel: string;
  /**
   * Accessibility label for the fullscreen minimize button if controls are shown.
   */
  accessibilityMinimizeLabel: string;
  /**
   * Accessibility label for the mute button if controls are shown.
   */
  accessibilityMuteLabel: string;
  /**
   * Accessibility label for the pause button if controls are shown.
   */
  accessibilityPauseLabel: string;
  /**
   * Accessibility label for the play button if controls are shown.
   */
  accessibilityPlayLabel: string;
  /**
   * Accessibility label for the video progress bar.
   */
  accessibilityProgressBarLabel: string;
  /**
   * Accessibility label for the button to show captions if controls are shown. See the [accessibility section](https://gestalt.pinterest.systems/web/video#Captions) to learn more.
   */
  accessibilityShowCaptionsLabel?: string;
  /**
   * Accessibility label for the unmute button if controls are shown. See the [accessibility section](https://gestalt.pinterest.systems/web/video#Captions) to learn more.
   */
  accessibilityUnmuteLabel: string;
  /**
   * When set to autoplay, the video will automatically start playing. See the [autoplay and error detection variant](https://gestalt.pinterest.systems/web/video#Autoplay-and-error-detection) to learn more.
   */
  autoplay?: boolean;
  /**
   * Proportional relationship between width and height of the video, calculated as width / height.
   */
  aspectRatio: number;
  /**
   * Background color used to fill the video's placeholder.
   */
  backgroundColor: BackgroundColor;
  /**
   * The URL of the captions track for the video (.vtt file). See the [accessibility section](https://gestalt.pinterest.systems/web/video#Captions) to learn more.
   */
  captions?: string;
  /**
   * This `children` prop is not same as children inside the native html `video` element. Instead, it serves to add overlays on top of the html video element, while still being under the video controls. See [children example](https://gestalt.pinterest.systems/web/video#video-with-children) for more details.
   */
  children?: Node;
  /**
   * Designate CORS behavior for the video element. When not passed in, CORS checks are disabled.
   */
  crossOrigin?: CrossOrigin;
  /**
   * Show the video control interface. See the [video controls variant](https://gestalt.pinterest.systems/web/video#Video-controls) to learn more.
   */
  controls?: boolean;
  /**
   * Disable remote playback. See [MDN Web Docs: disableRemotePlayback](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/disableRemotePlayback) for more info.
   */
  disableRemotePlayback?: boolean;
  /**
   * Indicates if the video will start playing over again when finished.
   */
  loop?: boolean;
  /**
   * Sets how the content of the replaced video element should be resized to fit its container.
   */
  objectFit?: ObjectFit;
  /**
   * Callback triggered when playback is played via the video control interface.
   */
  onControlsPlay?: (arg0: {
    event: React.SyntheticEvent<HTMLDivElement> | React.SyntheticEvent<HTMLAnchorElement>;
  }) => void;
  /**
   * Callback triggered when playback is paused via the video control interface.
   */
  onControlsPause?: (arg0: {
    event: React.SyntheticEvent<HTMLDivElement> | React.SyntheticEvent<HTMLAnchorElement>;
  }) => void;
  /**
   * Callback triggered when the metadata has loaded or changed, indicating a change in duration. See the [MDN Web Docs: durationchange event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/durationchange_event).
   */
  onDurationChange?: (arg0: {
    event: React.SyntheticEvent<HTMLVideoElement>;
    duration: number;
  }) => void;
  /**
   * Callback triggered when playback of the video completes. See the [MDN Web Docs: ended event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/ended_event).
   */
  onEnded?: (arg0: { event: React.SyntheticEvent<HTMLVideoElement> }) => void;
  /**
   * Callback triggered when an error occurs. See the [MDN Web Docs: onerror](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/onerror).
   */
  onError?: (arg0: { event: React.SyntheticEvent<HTMLVideoElement> }) => void;
  /**
   * Callback triggered when playback is paused. See the [MDN Web Docs: pause event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause_event).
   */
  onPause?: (arg0: { event: React.SyntheticEvent<HTMLVideoElement> }) => void;
  /**
   * Callback triggered when `pause` is changed from "true" to "false" or `autoplay`. See the [MDN Web Docs: play event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play_event) and the [autoplay and error detection variant](https://gestalt.pinterest.systems/web/video#Autoplay-and-error-detection) to learn more.
   */
  onPlay: (arg0: { event: React.SyntheticEvent<HTMLVideoElement> }) => void;
  /**
   * Callback triggered when a [play() method](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play)'s Promise is [rejected](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play#exceptions). See the [autoplay and error detection variant](https://gestalt.pinterest.systems/web/video#Autoplay-and-error-detection) to learn more.
   */
  onPlayError: (arg0: { error: Error }) => void;
  /**
   * Callback triggered when the video full-screen status changes. See the [video controls variant](https://gestalt.pinterest.systems/web/video#Video-controls) to learn more.
   */
  onFullscreenChange?: (arg0: { event: Event; fullscreen: boolean }) => void;
  /**
   * Callback triggered when progress happens on downloading the media. See the [MDN Web Docs: progress event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/progress_event).
   */
  onLoadedChange?: (arg0: {
    event: React.SyntheticEvent<HTMLVideoElement>;
    loaded: number;
  }) => void;
  /**
   * Callback triggered when the media has started to load.
   */
  onLoadStart?: (arg0: { event: React.SyntheticEvent<HTMLVideoElement> }) => void;
  /**
   * Callback triggered after playback is first started, and whenever it is restarted. See the [MDN Web Docs: playing event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/playing_event).
   */
  onPlaying?: (arg0: { event: React.SyntheticEvent<HTMLVideoElement> }) => void;
  /**
   * Callback triggered when mousedown event occurs on the playhead via the video control interface. See the [video controls variant](https://gestalt.pinterest.systems/web/video#Video-controls) to learn more.
   */
  onPlayheadDown?: (arg0: { event: React.MouseEvent<HTMLDivElement> }) => void;
  /**
   * Callback triggered when mouseup event occurs on the playhead via the video control interface. See the [video controls variant](https://gestalt.pinterest.systems/web/video#Video-controls) to learn more.
   */
  onPlayheadUp?: (arg0: { event: React.MouseEvent<HTMLDivElement> }) => void;
  /**
   * Callback triggered when enough data is available that the media can be played. See the [MDN Web Docs: canplay event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/canplay_event).
   */
  onReady?: (arg0: { event: React.SyntheticEvent<HTMLVideoElement> }) => void;
  /**
   * Callback triggered when a seek operation completes from the playhead. See the [MDN Web Docs: seeked event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/seeked_event).
   */
  onSeek?: (arg0: { event: React.SyntheticEvent<HTMLVideoElement> }) => void;
  /**
   * Callback triggered when a seek operation begins. See the [MDN Web Docs: seeking event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/seeking_event).
   */
  onSeeking?: (arg0: { event: React.SyntheticEvent<HTMLVideoElement> }) => void;
  /**
   * Callback triggered when trying to fetch data but the data is unexpectedly not forthcoming. See the [MDN Web Docs: stalled event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/stalled_event).
   */
  onStalled?: (arg0: { event: React.SyntheticEvent<HTMLVideoElement> }) => void;
  /**
   * Callback triggered when the time indicated by the element's currentTime attribute has changed. See the [MDN Web Docs: timeupdate event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/timeupdate_event).
   */
  onTimeChange?: (arg0: { event: React.SyntheticEvent<HTMLVideoElement>; time: number }) => void;
  /**
   * Callback triggered when the audio volume changes via the video control interface. See the [video updates variant](https://gestalt.pinterest.systems/web/video#Video-updates) to learn more.
   */
  onVolumeChange?: (arg0: {
    event: React.SyntheticEvent<HTMLDivElement> | React.SyntheticEvent<HTMLAnchorElement>;
    volume: number;
  }) => void;
  /**
   * Callback triggered when playback has stopped because of a temporary lack of data. See the [MDN Web Docs: waiting event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/waiting_event).
   */
  onWaiting?: (arg0: { event: React.SyntheticEvent<HTMLVideoElement> }) => void;
  /**
   * Specifies the speed at which the video plays: 1 for normal. See the [video updates variant](https://gestalt.pinterest.systems/web/video#Video-updates) to learn more.
   */
  playbackRate: number;
  /**
   * Specifies whether the video should play or not. See [autoplay and error detection variant](https://gestalt.pinterest.systems/web/video#Autoplay-and-error-detection) to learn more.
   */
  playing: boolean;
  /**
   * Serves as a hint to the user agent that the video should to be displayed "inline" in the document by default, constrained to the element's playback area, instead of being displayed fullscreen or in an independent resizable window. This attribute is mainly relevant to iOS Safari browsers. See the [MDN Web Docs: playsinline](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-playsinline)
   */
  playsInline?: boolean;
  /**
   * The image to show while the video is loading. See the [video controls variant](https://gestalt.pinterest.systems/web/video#Video-controls) to learn more.
   */
  poster?: string;
  /**
   * Specifies how, if at all, the video should be pre-loaded when the page loads. See the [MDN Web Docs: preload](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-preload)
   */
  preload: 'auto' | 'metadata' | 'none';
  /**
   * The URL of the video file to play. This can also be supplied as a list of video types to respective video source urls in fallback order for support on various browsers. See [multiple sources example](https://gestalt.pinterest.systems/web/video#Video-multiple-sources) for more details.
   */
  src: Source;
  /**
   * Set the current play time in seconds the video will start from. See [MDN Web Docs: HTMLMediaElement.currentTime](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/currentTime)
   */
  startTime?: number;
  /**
   * Specifies the volume of the video audio: 0 for muted, 1 for max. See the [video controls variant](https://gestalt.pinterest.systems/web/video#Video-controls) to learn more.
   */
  volume: number;
};
declare type State = {
  currentTime: number;
  duration: number;
  fullscreen: boolean;
  captionsButton: 'enabled' | 'disabled' | null;
};
/**
 * [Video](https://gestalt.pinterest.systems/web/video) is used for media layout.
 *
 * ![Video light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Video.spec.mjs-snapshots/Video-chromium-darwin.png)
 */
export default class Video extends PureComponent<Props, State> {
  video: HTMLVideoElement | null | undefined;
  player: HTMLDivElement | null | undefined;
  static defaultProps: {
    startTime: number;
    disableRemotePlayback: boolean;
    backgroundColor: BackgroundColor;
    playbackRate: number;
    playing: boolean;
    preload: 'auto' | 'metadata' | 'none';
    volume: number;
  };
  state: State;
  /**
   * React lifecycle hooks pertinent to Video
   */
  componentDidMount(): void;
  componentDidUpdate(prevProps: Props): void;
  componentWillUnmount(): void;
  /**
   * DOM reference housekeeping that is needed for functionality
   */
  setPlayerRef: (ref: HTMLDivElement | null | undefined) => void;
  setVideoRef: (ref: HTMLVideoElement | null | undefined) => void;
  /**
   * Functions that directly interact with the HTML video element
   */
  setPlaybackRate: (playbackRate: number) => void;
  setVolume: (volume: number) => void;
  load: () => void;
  pause: () => void;
  play: () => Promise<void>;
  seek: (time: number) => void;
  toggleCaptions: () => void;
  toggleFullscreen: () => void;
  /**
   * Handlers for various media events on the video
   */
  handleCanPlay: (event: React.SyntheticEvent<HTMLVideoElement>) => void;
  handleControlsPlay: (
    event: React.SyntheticEvent<HTMLDivElement> | React.SyntheticEvent<HTMLAnchorElement>,
  ) => void;
  handleControlsPause: (
    event: React.SyntheticEvent<HTMLDivElement> | React.SyntheticEvent<HTMLAnchorElement>,
  ) => void;
  handleDurationChange: (event: React.SyntheticEvent<HTMLVideoElement>) => void;
  handleEnded: (event: React.SyntheticEvent<HTMLVideoElement>) => void;
  handleError: (event: React.SyntheticEvent<HTMLVideoElement>) => void;
  handleFullscreenChange: EventListener;
  handleLoadStart: (event: React.SyntheticEvent<HTMLVideoElement>) => void;
  handlePause: (event: React.SyntheticEvent<HTMLVideoElement>) => void;
  handlePlay: (event: React.SyntheticEvent<HTMLVideoElement>) => void;
  handlePlaying: (event: React.SyntheticEvent<HTMLVideoElement>) => void;
  handlePlayheadDown: (event: React.MouseEvent<HTMLDivElement>) => void;
  handlePlayheadUp: (event: React.MouseEvent<HTMLDivElement>) => void;
  handleProgress: (event: React.SyntheticEvent<HTMLVideoElement>) => void;
  handleSeek: (event: React.SyntheticEvent<HTMLVideoElement>) => void;
  handleSeeking: (event: React.SyntheticEvent<HTMLVideoElement>) => void;
  handleStalled: (event: React.SyntheticEvent<HTMLVideoElement>) => void;
  handleTimeUpdate: (event: React.SyntheticEvent<HTMLVideoElement>) => void;
  handleVolumeChange: (
    event: React.SyntheticEvent<HTMLDivElement> | React.SyntheticEvent<HTMLAnchorElement>,
  ) => void;
  handleWaiting: (event: React.SyntheticEvent<HTMLVideoElement>) => void;
  render(): Node;
}
export {};
