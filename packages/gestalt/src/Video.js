// @flow strict
import { forwardRef, useEffect, useImperativeHandle, useRef, useState, type Node } from 'react';
import classnames from 'classnames';
import VideoControls from './VideoControls.js';
import styles from './Video.css';
import colors from './Colors.css';
import Box from './Box.js';

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
   * Specifies the volume of the video audio: 0 for muted, 1 for max. See the [video controls variant](https://gestalt.pinterest.systems/video#Video-controls) to learn more.
   */
  volume?: number,
|};

// For more information on fullscreen and vendor prefixes see
// https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
const requestFullscreen = (element: HTMLElement) => {
  // $FlowFixMe[method-unbinding]
  if (element.requestFullscreen) {
    element.requestFullscreen();
    // $FlowFixMe[prop-missing]
  } else if (element.webkitRequestFullscreen) {
    // $FlowFixMe[not-a-function]
    element.webkitRequestFullscreen();
    // $FlowFixMe[prop-missing]
  } else if (element.mozRequestFullScreen) {
    // $FlowFixMe[not-a-function]
    element.mozRequestFullScreen();
    // $FlowFixMe[prop-missing]
  } else if (element.msRequestFullscreen) {
    // $FlowFixMe[not-a-function]
    element.msRequestFullscreen();
  }
};

const exitFullscreen = () => {
  // $FlowFixMe[method-unbinding]
  if (document.exitFullscreen) {
    document.exitFullscreen();
    // $FlowFixMe[prop-missing]
  } else if (document.webkitExitFullscreen) {
    // $FlowFixMe[not-a-function]
    document.webkitExitFullscreen();
    // $FlowFixMe[prop-missing]
  } else if (document.mozCancelFullScreen) {
    // $FlowFixMe[not-a-function]
    document.mozCancelFullScreen();
    // $FlowFixMe[prop-missing]
  } else if (document.msExitFullscreen) {
    // $FlowFixMe[not-a-function]
    document.msExitFullscreen();
  }
};

// Normally document.fullscreen suffices here as a flag, but IE11 does not
// have a vendor specific version so we must instead use the actual element
const isFullscreen = () =>
  document.fullscreenElement ||
  // $FlowFixMe[prop-missing]
  document.webkitFullscreenElement ||
  // $FlowFixMe[prop-missing]
  document.mozFullScreenElement ||
  // $FlowFixMe[prop-missing]
  document.msFullscreenElement;

const addFullscreenEventListener = (listener: EventListener) => {
  document.addEventListener('fullscreenchange', listener);
  document.addEventListener('webkitfullscreenchange', listener);
  document.addEventListener('mozfullscreenchange', listener);
  document.addEventListener('MSFullscreenChange', listener);
};

const removeFullscreenEventListener = (listener: EventListener) => {
  document.removeEventListener('fullscreenchange', listener);
  document.removeEventListener('webkitfullscreenchange', listener);
  document.removeEventListener('mozfullscreenchange', listener);
  document.removeEventListener('MSFullscreenChange', listener);
};

const isNewSource = (oldSource: Source, newSource: Source): boolean => {
  if (typeof oldSource !== typeof newSource) {
    // If the source type changed from string to Array
    // or vice versa, we have a new source
    return true;
  }
  if (Array.isArray(newSource)) {
    if (oldSource.length !== newSource.length) {
      // If the sources are both an Array, and the lengths
      // do not match we evaluate as a new source
      return true;
    }
    // If the sources are both an Array and the same length,
    // verify every element stayed the same
    return newSource.some(
      (source, index) =>
        !Array.isArray(oldSource) ||
        source.type !== oldSource[index].type ||
        source.src !== oldSource[index].src,
    );
  }
  // If the sources are both a string, simply compare
  // the new with the old
  return newSource !== oldSource;
};

/**
 * [Video](https://gestalt.pinterest.systems/video) is used for media layout.
 *
 * ![Video light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/cypress/integration/visual-test/__image_snapshots__/Video%20%230.png)
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
    volume = 0,
  }: Props,
  ref,
): Node {
  const videoRef = useRef<null | HTMLVideoElement>(null);
  const playerRef = useRef<null | HTMLDivElement>(null);

  useImperativeHandle(ref, () => videoRef.current);

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [captionsButton, setCaptionsButton] = useState<'enabled' | 'disabled' | null>(
    captions ? 'enabled' : null,
  );
  const [previousSrc, setPreviousSrc] = useState<Source>(src);

  /**
   * Functions that directly interact with the HTML video element
   */

  // Set the video to the desired playback rate: 1 (normal)
  const setPlaybackRate: (newPlaybackRate: number) => void = (newPlaybackRate) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = newPlaybackRate;
    }
  };

  // Set the video to the desired volume: 0 (muted) -> 1 (max)
  const setVolume: (newVolume: number) => void = (newVolume) => {
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  // Change the video source and re-load the video
  const load: () => void = () => videoRef?.current?.load();

  // Pause the video
  const pause: () => void = () => videoRef?.current?.pause();

  // Play the video
  const play: () => Promise<void> = async () => {
    if (videoRef.current) {
      const isPlaying =
        videoRef.current.currentTime > 0 &&
        !videoRef.current.paused &&
        !videoRef.current.ended &&
        videoRef.current.readyState > 2;
      if (!isPlaying) {
        const startPlayPromise = videoRef.current.play();
        if (startPlayPromise !== undefined) {
          startPlayPromise.then().catch((error) => onPlayError?.({ error }));
        }
      }
    }
  };

  // Seek the video to the desired time
  const seek: (time: number) => void = (time) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  // Toggle captions on/off
  const toggleCaptions: () => void = () => {
    const [videoTrack] = videoRef.current?.textTracks || [];
    if (videoTrack) {
      const isShowing = videoTrack.mode === 'showing';
      videoTrack.mode = isShowing ? 'disabled' : 'showing';
      setCaptionsButton(isShowing ? 'disabled' : 'enabled');
    }
  };

  // Enter/exit fullscreen video player mode
  const toggleFullscreen: () => void = () => {
    if (isFullscreen()) {
      exitFullscreen();
    } else if (playerRef.current) {
      requestFullscreen(playerRef.current);
    }
  };

  /**
   * Handlers for various media events on the video
   */

  // Sent when enough data is available that the media can be played
  const handleCanPlay: (event: SyntheticEvent<HTMLVideoElement>) => void = (event) =>
    onReady?.({ event });

  // Sent when playback of the media starts after having been paused.
  const handleControlsPlay: (
    event: SyntheticEvent<HTMLDivElement> | SyntheticEvent<HTMLAnchorElement>,
  ) => void = (event) => onControlsPlay?.({ event });

  // Sent when playback is paused.
  const handleControlsPause: (
    event: SyntheticEvent<HTMLDivElement> | SyntheticEvent<HTMLAnchorElement>,
  ) => void = (event) => onControlsPause?.({ event });

  // The metadata has loaded or changed, indicating a change in
  // duration of the media
  const handleDurationChange: (event: SyntheticEvent<HTMLVideoElement>) => void = (event) => {
    const newDuration = videoRef?.current?.duration || 0;
    setDuration(newDuration);
    onDurationChange?.({ event, duration: newDuration });
  };

  // Sent when playback completes.
  const handleEnded: (event: SyntheticEvent<HTMLVideoElement>) => void = (event) =>
    onEnded?.({ event });

  // Sent when an error occurs.
  const handleError: (event: SyntheticEvent<HTMLVideoElement>) => void = (event) =>
    onError?.({ event });

  // Sent when the video is switched to/out-of fullscreen mode
  const handleFullscreenChange: EventListener = (event) => {
    const newFullscreen = !!isFullscreen();
    setFullscreen(newFullscreen);
    onFullscreenChange?.({ event, fullscreen: newFullscreen });
  };

  // Sent when the video has started to load
  const handleLoadStart: (event: SyntheticEvent<HTMLVideoElement>) => void = (event) =>
    onLoadStart?.({ event });

  // Sent when playback of the media is paused.
  const handlePause: (event: SyntheticEvent<HTMLVideoElement>) => void = (event) =>
    onPause?.({ event });

  // Sent when playback of the media is ready to start after having been paused.
  const handlePlay: (event: SyntheticEvent<HTMLVideoElement>) => void = (event) =>
    onPlay?.({ event });

  // Sent when playback of the media is ready to start after having been paused.
  const handlePlaying: (event: SyntheticEvent<HTMLVideoElement>) => void = (event) =>
    onPlaying?.({ event });

  // Sent when mouse down event happens on playhead
  const handlePlayheadDown: (event: SyntheticMouseEvent<HTMLDivElement>) => void = (event) =>
    onPlayheadDown?.({ event });

  // Sent when mouse up event happens on playhead
  const handlePlayheadUp: (event: SyntheticMouseEvent<HTMLDivElement>) => void = (event) =>
    onPlayheadUp?.({ event });

  // Sent periodically to inform interested parties of progress downloading the media
  const handleProgress: (event: SyntheticEvent<HTMLVideoElement>) => void = (event) => {
    const { buffered } = videoRef.current || {};
    const loaded = buffered && buffered.length > 0 ? buffered.end(buffered.length - 1) : 0;
    onLoadedChange?.({ event, loaded });
  };

  // Sent when a seek operation completes.
  const handleSeek: (event: SyntheticEvent<HTMLVideoElement>) => void = (event) =>
    onSeek?.({ event });

  // Sent when a seek operation beings.
  const handleSeeking: (event: SyntheticEvent<HTMLVideoElement>) => void = (event) =>
    onSeeking?.({ event });

  // Sent when trying to fetch data but the data is unexpectedly not forthcoming.
  const handleStalled: (event: SyntheticEvent<HTMLVideoElement>) => void = (event) =>
    onStalled?.({ event });

  // The time indicated by the element's currentTime attribute has changed
  const handleTimeUpdate: (event: SyntheticEvent<HTMLVideoElement>) => void = (event) => {
    const newCurrentTime = videoRef?.current?.currentTime || 0;
    setCurrentTime(newCurrentTime);
    onTimeChange?.({ event, time: newCurrentTime });
  };

  // Sent when the audio volume changes
  const handleVolumeChange: (
    event: SyntheticEvent<HTMLDivElement> | SyntheticEvent<HTMLAnchorElement>,
  ) => void = (event) => {
    const muted = videoRef?.current?.muted || false;
    onVolumeChange?.({ event, volume: muted ? 1 : 0 });
  };

  // Sent when playback has stopped because of a temporary lack of data.
  const handleWaiting: (event: SyntheticEvent<HTMLVideoElement>) => void = (event) =>
    onWaiting?.({ event });

  useEffect(() => {
    // Set up event listeners to catch backdoors in fullscreen
    // changes such as using the ESC key to exit
    if (typeof document !== 'undefined') addFullscreenEventListener(handleFullscreenChange);

    // Load the video to hydrate the DOM after a server render
    load();
    // Set the initial volume
    setVolume(volume);
    // Set the initial playback rate
    setPlaybackRate(playbackRate);

    if (!autoplay && playing) play();

    if (captions && videoRef?.current?.textTracks[0]) {
      videoRef.current.textTracks[0].mode = 'showing';
    }

    return () => removeFullscreenEventListener(handleFullscreenChange);
  }, []);

  useEffect(() => {
    // If the video source changed, reload the video
    if (isNewSource(previousSrc, src)) {
      setPreviousSrc(src);
      load();
    }
  }, [setPreviousSrc, src]);

  useEffect(() => {
    // If the volume changed, set the new volume
    setVolume(volume);
  }, [volume]);

  useEffect(() => {
    // If the playback rate changed, set the new rate
    setPlaybackRate(playbackRate);
  }, [playbackRate]);

  useEffect(() => {
    // If the playback changed, play or pause the video
    if (playing) {
      play();
    } else {
      if (videoRef.current) {
        const isPlaying =
          videoRef.current.currentTime > 0 &&
          !videoRef.current.paused &&
          !videoRef.current.ended &&
          videoRef.current.readyState > 2;
        isPlaying && pause(); // this is messy. there should be a better way t prevent the initial pause. Use useRef to save prevState and see change in value!
      }
    }
  }, [play, playing]);

  let crossOriginPolicy = crossOrigin || undefined;
  if (captions && crossOriginPolicy !== 'anonymous') {
    if (crossOriginPolicy === undefined) {
      crossOriginPolicy = 'anonymous';
    } else {
      throw new Error(`"The crossOrigin policy must be set to 'anonymous' for captions to work."`);
    }
  }

  return (
    <div
      ref={playerRef}
      className={classnames(styles.player, {
        [colors.blackBg]: backgroundColor === 'black',
        [colors.transparentBg]: backgroundColor === 'transparent',
      })}
      style={{
        paddingBottom: (fullscreen && '0') || `${(1 / aspectRatio) * 100}%`,
        height: fullscreen ? '100%' : 0,
      }}
    >
      <video
        autoPlay={autoplay}
        className={styles.video}
        {...((crossOrigin ? { crossOrigin } : { ...null }): {|
          crossOrigin?: CrossOrigin,
        |})}
        disableRemotePlayback={disableRemotePlayback}
        loop={loop}
        muted={volume === 0}
        {...(objectFit ? { style: { objectFit } } : null)}
        onCanPlay={handleCanPlay}
        onDurationChange={handleDurationChange}
        onEnded={handleEnded}
        onError={handleError}
        onLoadStart={handleLoadStart}
        onPlay={handlePlay}
        onPause={handlePause}
        onPlaying={handlePlaying}
        onProgress={handleProgress}
        onSeeked={handleSeek}
        onSeeking={handleSeeking}
        onStalled={handleStalled}
        onTimeUpdate={handleTimeUpdate}
        onWaiting={handleWaiting}
        playsInline={playsInline}
        poster={poster}
        preload={preload}
        src={typeof src === 'string' ? src : undefined}
        ref={videoRef}
      >
        {Array.isArray(src) &&
          src.map((source) => <source key={source.src} src={source.src} type={source.type} />)}
        <track kind="captions" src={captions} />
      </video>
      {Boolean(children) && (
        <Box position="absolute" top left bottom right overflow="hidden">
          {children}
        </Box>
      )}
      {/* Need to use full path for these props so Flow can infer correct subtype */}
      {controls && (
        <VideoControls
          accessibilityHideCaptionsLabel={accessibilityHideCaptionsLabel || ''}
          accessibilityShowCaptionsLabel={accessibilityShowCaptionsLabel || ''}
          accessibilityMaximizeLabel={accessibilityMaximizeLabel}
          accessibilityMinimizeLabel={accessibilityMinimizeLabel}
          accessibilityMuteLabel={accessibilityMuteLabel}
          accessibilityPauseLabel={accessibilityPauseLabel}
          accessibilityPlayLabel={accessibilityPlayLabel}
          accessibilityProgressBarLabel={accessibilityProgressBarLabel}
          accessibilityUnmuteLabel={accessibilityUnmuteLabel}
          captionsButton={captionsButton}
          currentTime={currentTime}
          duration={duration}
          fullscreen={fullscreen}
          onCaptionsChange={toggleCaptions}
          onPlay={handleControlsPlay}
          onPlayheadDown={handlePlayheadDown}
          onPlayheadUp={handlePlayheadUp}
          onPause={handleControlsPause}
          onFullscreenChange={toggleFullscreen}
          onVolumeChange={handleVolumeChange}
          playing={playing}
          seek={seek}
          volume={volume}
        />
      )}
    </div>
  );
});

VideoWithForwardRef.displayName = 'Video';

export default VideoWithForwardRef;
