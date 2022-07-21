// @flow strict
import {
  forwardRef,
  useRef,
  useEffect,
  useImperativeHandle,
  type Node,
} from 'react';
import VideoClass from './VideoClass.js';
import VideoFunction from './VideoFunction.js';
import { useExperimentContext } from './contexts/ExperimentProvider.js';

type Source =
  | string
  | $ReadOnlyArray<{|
      type: 'video/m3u8' | 'video/mp4' | 'video/ogg',
      src: string,
    |}>;

type ObjectFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
type CrossOrigin = 'anonymous' | 'use-credentials';
type BackgroundColor = 'black' | 'transparent';

type Props = {|
  /**
   * Accessibility label for the button to hide captions if controls are shown.
   */
  accessibilityHideCaptionsLabel?: string,
  /**
   * Accessibility label for the fullscreen maximize button if controls are shown.
   */
  accessibilityMaximizeLabel: string,
  /**
   * Accessibility label for the fullscreen minimize button if controls are shown.
   */
  accessibilityMinimizeLabel: string,
  /**
   * Accessibility label for the mute button if controls are shown.
   */
  accessibilityMuteLabel: string,
  /**
   * Accessibility label for the pause button if controls are shown.
   */
  accessibilityPauseLabel: string,
  /**
   * Accessibility label for the play button if controls are shown.
   */
  accessibilityPlayLabel: string,
  /**
   * Accessibility label for the video progress bar.
   */
  accessibilityProgressBarLabel: string,
  /**
   * Accessibility label for the button to show captions if controls are shown. See the [accessibility section](https://gestalt.pinterest.systems/video#Captions) to learn more.
   */
  accessibilityShowCaptionsLabel?: string,
  /**
   * Accessibility label for the unmute button if controls are shown. See the [accessibility section](https://gestalt.pinterest.systems/video#Captions) to learn more.
   */
  accessibilityUnmuteLabel: string,
  /**
   * When set to autoplay, the video will automatically start playing. See the [autoplay and error detection variant](https://gestalt.pinterest.systems/video#Autoplay-and-error-detection) to learn more.
   */
  autoplay?: boolean,
  /**
   * Proportional relationship between width and height of the video, calculated as width / height.
   */
  aspectRatio: number,
  /**
   * Background color used to fill the video's placeholder.
   */
  backgroundColor?: BackgroundColor,
  /**
   * The URL of the captions track for the video (.vtt file). Warning: Captions aren't currently supported. See the [accessibility section](https://gestalt.pinterest.systems/video#Captions) to learn more.
   */
  captions?: string,
  /**
   * This `children` prop is not same as children inside the native html `video` element. Instead, it serves to add overlays on top of the html video element, while still being under the video controls. See [children example](https://gestalt.pinterest.systems/video#video-with-children) for more details.
   */
  children?: Node,
  /**
   * Designate CORS behavior for the video element. When not passed in, CORS checks are disabled.
   */
  crossOrigin?: CrossOrigin,
  /**
   * Show the video control interface. See the [video controls variant](https://gestalt.pinterest.systems/video#Video-controls) to learn more.
   */
  controls?: boolean,
  /**
   * Disable remote playback. See [MDN Web Docs: disableRemotePlayback](https://gestalt.pinterest.systems/videohttps://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/disableRemotePlayback) for more info.
   */
  disableRemotePlayback?: boolean,
  /**
   * Indicates if the video will start playing over again when finished.
   */
  loop?: boolean,
  /**
   * Sets how the content of the replaced video element should be resized to fit its container.
   */
  objectFit?: ObjectFit,
  /**
   * Callback triggered when playback is played via the video control interface.
   */
  onControlsPlay?: ({|
    event: SyntheticEvent<HTMLDivElement> | SyntheticEvent<HTMLAnchorElement>,
  |}) => void,
  /**
   * Callback triggered when playback is paused via the video control interface.
   */
  onControlsPause?: ({|
    event: SyntheticEvent<HTMLDivElement> | SyntheticEvent<HTMLAnchorElement>,
  |}) => void,
  /**
   * Callback triggered when the metadata has loaded or changed, indicating a change in duration. See the [MDN Web Docs: durationchange event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/durationchange_event).
   */
  onDurationChange?: ({|
    event: SyntheticEvent<HTMLVideoElement>,
    duration: number,
  |}) => void,
  /**
   * Callback triggered when playback of the video completes. See the [MDN Web Docs: ended event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/ended_event).
   */
  onEnded?: ({| event: SyntheticEvent<HTMLVideoElement> |}) => void,
  /**
   * Callback triggered when an error occurs. See the [MDN Web Docs: onerror](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/onerror).
   */
  onError?: ({| event: SyntheticEvent<HTMLVideoElement> |}) => void,

  /**
   * Callback triggered when playback is paused. See the [MDN Web Docs: pause event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause_event).
   */
  onPause?: ({| event: SyntheticEvent<HTMLVideoElement> |}) => void,

  /**
   * Callback triggered when `pause` is changed from "true" to "false" or `autoplay`. See the [MDN Web Docs: play event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play_event) and the [autoplay and error detection variant](https://gestalt.pinterest.systems/video#Autoplay-and-error-detection) to learn more.
   */
  onPlay: ({| event: SyntheticEvent<HTMLVideoElement> |}) => void,
  /**
   * Callback triggered when a [play() method](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play)'s Promise is [rejected](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play#exceptions). See the [autoplay and error detection variant](https://gestalt.pinterest.systems/video#Autoplay-and-error-detection) to learn more.
   */
  onPlayError: ({| error: Error |}) => void,
  /**
   * Callback triggered when the video full-screen status changes. See the [video controls variant](https://gestalt.pinterest.systems/video#Video-controls) to learn more.
   */
  onFullscreenChange?: ({| event: Event, fullscreen: boolean |}) => void,
  /**
   * Callback triggered when progress happens on downloading the media. See the [MDN Web Docs: progress event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/progress_event).
   */
  onLoadedChange?: ({| event: SyntheticEvent<HTMLVideoElement>, loaded: number |}) => void,
  /**
   * Callback triggered when the media has started to load.
   */
  onLoadStart?: ({| event: SyntheticEvent<HTMLVideoElement> |}) => void,
  /**
   * Callback triggered after playback is first started, and whenever it is restarted. See the [MDN Web Docs: playing event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/playing_event).
   */
  onPlaying?: ({| event: SyntheticEvent<HTMLVideoElement> |}) => void,
  /**
   * Callback triggered when mousedown event occurs on the playhead via the video control interface. See the [video controls variant](https://gestalt.pinterest.systems/video#Video-controls) to learn more.
   */
  onPlayheadDown?: ({| event: SyntheticMouseEvent<HTMLDivElement> |}) => void,
  /**
   * Callback triggered when mouseup event occurs on the playhead via the video control interface. See the [video controls variant](https://gestalt.pinterest.systems/video#Video-controls) to learn more.
   */
  onPlayheadUp?: ({| event: SyntheticMouseEvent<HTMLDivElement> |}) => void,
  /**
   * Callback triggered when enough data is available that the media can be played. See the [MDN Web Docs: canplay event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/canplay_event).
   */
  onReady?: ({| event: SyntheticEvent<HTMLVideoElement> |}) => void,
  /**
   * Callback triggered when a seek operation completes from the playhead. See the [MDN Web Docs: seeked event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/seeked_event).
   */
  onSeek?: ({| event: SyntheticEvent<HTMLVideoElement> |}) => void,
  /**
   * Callback triggered when a seek operation begins. See the [MDN Web Docs: seeking event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/seeking_event).
   */
  onSeeking?: ({| event: SyntheticEvent<HTMLVideoElement> |}) => void,
  /**
   * Callback triggered when trying to fetch data but the data is unexpectedly not forthcoming. See the [MDN Web Docs: stalled event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/stalled_event).
   */
  onStalled?: ({| event: SyntheticEvent<HTMLVideoElement> |}) => void,
  /**
   * Callback triggered when the time indicated by the element's currentTime attribute has changed. See the [MDN Web Docs: timeupdate event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/timeupdate_event).
   */
  onTimeChange?: ({| event: SyntheticEvent<HTMLVideoElement>, time: number |}) => void,
  /**
   * Callback triggered when the audio volume changes via the video control interface. See the [video updates variant](https://gestalt.pinterest.systems/video#Video-updates) to learn more.
   */
  onVolumeChange?: ({|
    event: SyntheticEvent<HTMLDivElement> | SyntheticEvent<HTMLAnchorElement>,
    volume: number,
  |}) => void,
  /**
   * Callback triggered when playback has stopped because of a temporary lack of data. See the [MDN Web Docs: waiting event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/waiting_event).
   */
  onWaiting?: ({| event: SyntheticEvent<HTMLVideoElement> |}) => void,
  /**
   * Specifies the speed at which the video plays: 1 for normal. See the [video updates variant](https://gestalt.pinterest.systems/video#Video-updates) to learn more.
   */
  playbackRate?: number,
  /**
   * Specifies whether the video should play or not. See [autoplay and error detection variant](https://gestalt.pinterest.systems/video#Autoplay-and-error-detection) to learn more.
   */
  playing?: boolean,
  /**
   * Serves as a hint to the user agent that the video should to be displayed "inline" in the document by default, constrained to the element's playback area, instead of being displayed fullscreen or in an independent resizable window. This attribute is mainly relevant to iOS Safari browsers. See the [MDN Web Docs: playsinline](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-playsinline)
   */
  playsInline?: boolean,
  /**
   * The image to show while the video is loading. See the [video controls variant](https://gestalt.pinterest.systems/video#Video-controls) to learn more.
   */
  poster?: string,
  /**
   * Specifies how, if at all, the video should be pre-loaded when the page loads. See the [MDN Web Docs: preload](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-preload)
   */
  preload?: 'auto' | 'metadata' | 'none',
  /**
   * The URL of the video file to play. This can also be supplied as a list of video types to respective video source urls in fallback order for support on various browsers. See [multiple sources example](https://gestalt.pinterest.systems/video#Video-multiple-sources) for more details.
   */
  src: Source,
  /**
   * Set the current play time in seconds the video will start from. See [MDN Web Docs: HTMLMediaElement.currentTime](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/currentTime)
   */
  startTime?: number,
  /**
   * Specifies the volume of the video audio: 0 for muted, 1 for max. See the [video controls variant](https://gestalt.pinterest.systems/video#Video-controls) to learn more.
   */
  volume?: number,
|};

/**
 * [Video](https://gestalt.pinterest.systems/video) is used for media layout.
 *
 * ![Video light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Video.spec.mjs-snapshots/Video-chromium-darwin.png)
 */
const VideoWithForwardRef: React$AbstractComponent<Props, HTMLVideoElement> = forwardRef<
  Props,
  HTMLVideoElement,
>(function Video(
  {
    accessibilityHideCaptionsLabel,
    accessibilityMaximizeLabel,
    accessibilityMinimizeLabel,
    accessibilityMuteLabel,
    accessibilityPauseLabel,
    accessibilityPlayLabel,
    accessibilityProgressBarLabel,
    accessibilityShowCaptionsLabel,
    accessibilityUnmuteLabel,
    autoplay = false,
    aspectRatio,
    backgroundColor = 'black',
    captions,
    children,
    controls,
    crossOrigin,
    disableRemotePlayback = false,
    loop,
    objectFit,
    onControlsPlay,
    onControlsPause,
    onDurationChange,
    onEnded,
    onError,
    onPause,
    onPlay,
    onPlayError,
    onFullscreenChange,
    onLoadedChange,
    onLoadStart,
    onPlaying,
    onPlayheadDown,
    onPlayheadUp,
    onReady,
    onSeek,
    onSeeking,
    onStalled,
    onTimeChange,
    onVolumeChange,
    onWaiting,
    playbackRate = 1,
    playing = false,
    playsInline,
    poster,
    preload = 'auto',
    src,
    startTime = 0,
    volume = 0,
  }: Props,
  ref,
): Node {
  const { anyEnabled: inVideoFunctionExp } = useExperimentContext('webVideoFunction');

  const videoRef = useRef<null | HTMLVideoElement>(null);

  useImperativeHandle(ref, () => videoRef.current);
  // useEffect(() => {
  //   console.log(
  //     inVideoFunctionExp,
  //     inVideoFunctionExp ? videoRef.current : videoRef?.current?.video,
  //     inVideoFunctionExp ? "" : videoRef?.video,

  //   );
  // }, [videoRef.current]);

  return inVideoFunctionExp ? (
    <VideoFunction
      accessibilityHideCaptionsLabel={accessibilityHideCaptionsLabel}
      accessibilityMaximizeLabel={accessibilityMaximizeLabel}
      accessibilityMinimizeLabel={accessibilityMinimizeLabel}
      accessibilityMuteLabel={accessibilityMuteLabel}
      accessibilityPauseLabel={accessibilityPauseLabel}
      accessibilityPlayLabel={accessibilityPlayLabel}
      accessibilityProgressBarLabel={accessibilityProgressBarLabel}
      accessibilityShowCaptionsLabel={accessibilityShowCaptionsLabel}
      accessibilityUnmuteLabel={accessibilityUnmuteLabel}
      autoplay={autoplay}
      aspectRatio={aspectRatio}
      backgroundColor={backgroundColor}
      captions={captions}
      controls={controls}
      crossOrigin={crossOrigin}
      disableRemotePlayback={disableRemotePlayback}
      loop={loop}
      objectFit={objectFit}
      onControlsPlay={onControlsPlay}
      onControlsPause={onControlsPause}
      onDurationChange={onDurationChange}
      onEnded={onEnded}
      onError={onError}
      onPause={onPause}
      onPlay={onPlay}
      onPlayError={onPlayError}
      onFullscreenChange={onFullscreenChange}
      onLoadedChange={onLoadedChange}
      onLoadStart={onLoadStart}
      onPlaying={onPlaying}
      onPlayheadDown={onPlayheadDown}
      onPlayheadUp={onPlayheadUp}
      onReady={onReady}
      onSeek={onSeek}
      onSeeking={onSeeking}
      onStalled={onStalled}
      onTimeChange={onTimeChange}
      onVolumeChange={onVolumeChange}
      onWaiting={onWaiting}
      playbackRate={playbackRate}
      playing={playing}
      playsInline={playsInline}
      poster={poster}
      preload={preload}
      src={src}
      startTime={startTime}
      volume={volume}
      ref={videoRef}
    >
      {children}
    </VideoFunction>
  ) : (
    <VideoClass
      accessibilityHideCaptionsLabel={accessibilityHideCaptionsLabel}
      accessibilityMaximizeLabel={accessibilityMaximizeLabel}
      accessibilityMinimizeLabel={accessibilityMinimizeLabel}
      accessibilityMuteLabel={accessibilityMuteLabel}
      accessibilityPauseLabel={accessibilityPauseLabel}
      accessibilityPlayLabel={accessibilityPlayLabel}
      accessibilityProgressBarLabel={accessibilityProgressBarLabel}
      accessibilityShowCaptionsLabel={accessibilityShowCaptionsLabel}
      accessibilityUnmuteLabel={accessibilityUnmuteLabel}
      autoplay={autoplay}
      aspectRatio={aspectRatio}
      backgroundColor={backgroundColor}
      captions={captions}
      controls={controls}
      crossOrigin={crossOrigin}
      disableRemotePlayback={disableRemotePlayback}
      loop={loop}
      objectFit={objectFit}
      onControlsPlay={onControlsPlay}
      onControlsPause={onControlsPause}
      onDurationChange={onDurationChange}
      onEnded={onEnded}
      onError={onError}
      onPause={onPause}
      onPlay={onPlay}
      onPlayError={onPlayError}
      onFullscreenChange={onFullscreenChange}
      onLoadedChange={onLoadedChange}
      onLoadStart={onLoadStart}
      onPlaying={onPlaying}
      onPlayheadDown={onPlayheadDown}
      onPlayheadUp={onPlayheadUp}
      onReady={onReady}
      onSeek={onSeek}
      onSeeking={onSeeking}
      onStalled={onStalled}
      onTimeChange={onTimeChange}
      onVolumeChange={onVolumeChange}
      onWaiting={onWaiting}
      playbackRate={playbackRate}
      playing={playing}
      playsInline={playsInline}
      poster={poster}
      preload={preload}
      src={src}
      startTime={startTime}
      volume={volume}
      // $FlowFixMe[incompatible-type]
      ref={videoRef}
    >
      {children}
    </VideoClass>
  );
});

VideoWithForwardRef.displayName = 'Video';

export default VideoWithForwardRef;
