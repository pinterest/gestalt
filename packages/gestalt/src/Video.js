// @flow strict
import { type Node, PureComponent } from 'react';
import classnames from 'classnames';
import Box from './Box.js';
import colors from './Colors.css';
import styles from './Video.css';
import VideoControls from './Video/Controls.js';

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
  autoplay?: boolean,
  /**
   * Proportional relationship between width and height of the video, calculated as width / height.
   */
  aspectRatio: number,
  /**
   * Background color used to fill the video's placeholder.
   */
  backgroundColor: BackgroundColor,
  /**
   * The URL of the captions track for the video (.vtt file). See the [accessibility section](https://gestalt.pinterest.systems/web/video#Captions) to learn more.
   */
  captions?: string,
  /**
   * This `children` prop is not same as children inside the native html `video` element. Instead, it serves to add overlays on top of the html video element, while still being under the video controls. See [children example](https://gestalt.pinterest.systems/web/video#video-with-children) for more details.
   */
  children?: Node,
  /**
   * Designate CORS behavior for the video element. When not passed in, CORS checks are disabled.
   */
  crossOrigin?: CrossOrigin,
  /**
   * Show the video control interface. See the [video controls variant](https://gestalt.pinterest.systems/web/video#Video-controls) to learn more.
   */
  controls?: boolean,
  /**
   * Disable remote playback. See [MDN Web Docs: disableRemotePlayback](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/disableRemotePlayback) for more info.
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
   * Callback triggered when `pause` is changed from "true" to "false" or `autoplay`. See the [MDN Web Docs: play event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play_event) and the [autoplay and error detection variant](https://gestalt.pinterest.systems/web/video#Autoplay-and-error-detection) to learn more.
   */
  onPlay: ({| event: SyntheticEvent<HTMLVideoElement> |}) => void,
  /**
   * Callback triggered when a [play() method](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play)'s Promise is [rejected](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play#exceptions). See the [autoplay and error detection variant](https://gestalt.pinterest.systems/web/video#Autoplay-and-error-detection) to learn more.
   */
  onPlayError: ({| error: Error |}) => void,
  /**
   * Callback triggered when the video full-screen status changes. See the [video controls variant](https://gestalt.pinterest.systems/web/video#Video-controls) to learn more.
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
   * Callback triggered when mousedown event occurs on the playhead via the video control interface. See the [video controls variant](https://gestalt.pinterest.systems/web/video#Video-controls) to learn more.
   */
  onPlayheadDown?: ({| event: SyntheticMouseEvent<HTMLDivElement> |}) => void,
  /**
   * Callback triggered when mouseup event occurs on the playhead via the video control interface. See the [video controls variant](https://gestalt.pinterest.systems/web/video#Video-controls) to learn more.
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
   * Callback triggered when the audio volume changes via the video control interface. See the [video updates variant](https://gestalt.pinterest.systems/web/video#Video-updates) to learn more.
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
   * Specifies the speed at which the video plays: 1 for normal. See the [video updates variant](https://gestalt.pinterest.systems/web/video#Video-updates) to learn more.
   */
  playbackRate: number,
  /**
   * Specifies whether the video should play or not. See [autoplay and error detection variant](https://gestalt.pinterest.systems/web/video#Autoplay-and-error-detection) to learn more.
   */
  playing: boolean,
  /**
   * Serves as a hint to the user agent that the video should to be displayed "inline" in the document by default, constrained to the element's playback area, instead of being displayed fullscreen or in an independent resizable window. This attribute is mainly relevant to iOS Safari browsers. See the [MDN Web Docs: playsinline](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-playsinline)
   */
  playsInline?: boolean,
  /**
   * The image to show while the video is loading. See the [video controls variant](https://gestalt.pinterest.systems/web/video#Video-controls) to learn more.
   */
  poster?: string,
  /**
   * Specifies how, if at all, the video should be pre-loaded when the page loads. See the [MDN Web Docs: preload](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-preload)
   */
  preload: 'auto' | 'metadata' | 'none',
  /**
   * The URL of the video file to play. This can also be supplied as a list of video types to respective video source urls in fallback order for support on various browsers. See [multiple sources example](https://gestalt.pinterest.systems/web/video#Video-multiple-sources) for more details.
   */
  src: Source,
  /**
   * Set the current play time in seconds the video will start from. See [MDN Web Docs: HTMLMediaElement.currentTime](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/currentTime)
   */
  startTime?: number,
  /**
   * Specifies the volume of the video audio: 0 for muted, 1 for max. See the [video controls variant](https://gestalt.pinterest.systems/web/video#Video-controls) to learn more.
   */
  volume: number,
|};

type State = {|
  currentTime: number,
  duration: number,
  fullscreen: boolean,
  captionsButton: 'enabled' | 'disabled' | null,
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
 * [Video](https://gestalt.pinterest.systems/web/video) is used for media layout.
 *
 * ![Video light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Video.spec.mjs-snapshots/Video-chromium-darwin.png)
 */
export default class Video extends PureComponent<Props, State> {
  video: ?HTMLVideoElement;

  player: ?HTMLDivElement;

  static defaultProps: {|
    startTime: number,
    disableRemotePlayback: boolean,
    backgroundColor: BackgroundColor,
    playbackRate: number,
    playing: boolean,
    preload: 'auto' | 'metadata' | 'none',
    volume: number,
  |} = {
    startTime: 0,
    disableRemotePlayback: false,
    // eslint-disable-next-line react/default-props-match-prop-types
    backgroundColor: 'black',
    // eslint-disable-next-line react/default-props-match-prop-types
    playbackRate: 1,
    // eslint-disable-next-line react/default-props-match-prop-types
    playing: false,
    // eslint-disable-next-line react/default-props-match-prop-types
    preload: 'auto',
    // eslint-disable-next-line react/default-props-match-prop-types
    volume: 0,
  };

  state: State = {
    currentTime: 0,
    duration: 0,
    fullscreen: false,
    captionsButton: this.props.captions ? 'enabled' : null,
  };

  /**
   * React lifecycle hooks pertinent to Video
   */

  componentDidMount() {
    const { captions, playbackRate, volume, playing, autoplay, startTime } = this.props;
    // Set up event listeners to catch backdoors in fullscreen
    // changes such as using the ESC key to exit
    if (typeof document !== 'undefined') {
      addFullscreenEventListener(this.handleFullscreenChange);
    }
    // Load the video to hydrate the DOM after a server render
    this.load();
    // Set the initial volume
    this.setVolume(volume);
    // Set the initial playback rate
    this.setPlaybackRate(playbackRate);

    if (startTime) {
      this.seek(startTime);
    }

    if (!autoplay && playing) {
      this.play();
    }

    if (captions && this.video && this.video.textTracks && this.video.textTracks[0]) {
      this.video.textTracks[0].mode = 'showing';
    }
  }

  componentDidUpdate(prevProps: Props) {
    // If the video source changed, reload the video
    if (isNewSource(prevProps.src, this.props.src)) {
      this.load();
    }

    // If the startTime has changed, update
    if (prevProps.startTime !== this.props.startTime) {
      this.seek(this.props.startTime || 0);
    }

    // If the volume changed, set the new volume
    if (prevProps.volume !== this.props.volume) {
      this.setVolume(this.props.volume);
    }
    // If the playback rate changed, set the new rate
    if (prevProps.playbackRate !== this.props.playbackRate) {
      this.setPlaybackRate(this.props.playbackRate);
    }

    // If the playback changed, play or pause the video
    if (prevProps.playing !== this.props.playing) {
      if (this.props.playing) {
        this.play();
      } else {
        this.pause();
      }
    }
  }

  componentWillUnmount() {
    removeFullscreenEventListener(this.handleFullscreenChange);
  }

  /**
   * DOM reference housekeeping that is needed for functionality
   */

  // The player element encapsulates the actual video DOM
  // element as well as the controls to bring both fullscreen
  setPlayerRef: (ref: ?HTMLDivElement) => void = (ref) => {
    this.player = ref;
  };

  // The actual reference to the video HTML DOM element
  setVideoRef: (ref: ?HTMLVideoElement) => void = (ref) => {
    this.video = ref;
  };

  /**
   * Functions that directly interact with the HTML video element
   */

  // Set the video to the desired playback rate: 1 (normal)
  setPlaybackRate: (playbackRate: number) => void = (playbackRate) => {
    if (this.video) {
      this.video.playbackRate = playbackRate;
    }
  };

  // Set the video to the desired volume: 0 (muted) -> 1 (max)
  setVolume: (volume: number) => void = (volume) => {
    if (this.video) {
      this.video.volume = volume;
    }
  };

  // Change the video source and re-load the video
  load: () => void = () => {
    // $FlowFixMe[method-unbinding]
    if (this.video && this.video.load) {
      this.video.load();
    }
  };

  // Pause the video
  pause: () => void = () => {
    if (this.video) {
      this.video.pause();
    }
  };

  // Play the video
  play: () => Promise<void> = async () => {
    if (this.video) {
      const isPlaying =
        this.video.currentTime > 0 &&
        !this.video.paused &&
        !this.video.ended &&
        this.video.readyState > 2;
      if (!isPlaying) {
        const startPlayPromise = this.video.play();
        if (startPlayPromise !== undefined) {
          startPlayPromise.then().catch((error) => this.props.onPlayError?.({ error }));
        }
      }
    }
  };

  // Seek the video to the desired time
  seek: (time: number) => void = (time) => {
    if (this.video) {
      this.video.currentTime = time;
    }
  };

  // Toggle captions on/off
  toggleCaptions: () => void = () => {
    const [videoTrack] = this.video?.textTracks || [];
    if (videoTrack) {
      const isShowing = videoTrack.mode === 'showing';
      videoTrack.mode = isShowing ? 'disabled' : 'showing';
      this.setState({ captionsButton: isShowing ? 'disabled' : 'enabled' });
    }
  };

  // Enter/exit fullscreen video player mode
  toggleFullscreen: () => void = () => {
    if (isFullscreen()) {
      exitFullscreen();
    } else if (this.player) {
      requestFullscreen(this.player);
    }
  };

  /**
   * Handlers for various media events on the video
   */

  // Sent when enough data is available that the media can be played
  handleCanPlay: (event: SyntheticEvent<HTMLVideoElement>) => void = (event) => {
    const { onReady } = this.props;

    onReady?.({ event });
  };

  // Sent when playback of the media starts after having been paused.
  handleControlsPlay: (
    event: SyntheticEvent<HTMLDivElement> | SyntheticEvent<HTMLAnchorElement>,
  ) => void = (event) => {
    const { onControlsPlay } = this.props;

    onControlsPlay?.({ event });
  };

  // Sent when playback is paused.
  handleControlsPause: (
    event: SyntheticEvent<HTMLDivElement> | SyntheticEvent<HTMLAnchorElement>,
  ) => void = (event) => {
    const { onControlsPause } = this.props;

    onControlsPause?.({ event });
  };

  // The metadata has loaded or changed, indicating a change in
  // duration of the media
  handleDurationChange: (event: SyntheticEvent<HTMLVideoElement>) => void = (event) => {
    const { onDurationChange } = this.props;
    const duration = (this.video && this.video.duration) || 0;
    this.setState({ duration });

    onDurationChange?.({ event, duration });
  };

  // Sent when playback completes.
  handleEnded: (event: SyntheticEvent<HTMLVideoElement>) => void = (event) => {
    const { onEnded } = this.props;

    onEnded?.({ event });
  };

  // Sent when an error occurs.
  handleError: (event: SyntheticEvent<HTMLVideoElement>) => void = (event) => {
    const { onError } = this.props;

    onError?.({ event });
  };

  // Sent when the video is switched to/out-of fullscreen mode
  handleFullscreenChange: EventListener = (event) => {
    const { onFullscreenChange } = this.props;
    const fullscreen = !!isFullscreen();
    this.setState({ fullscreen });

    onFullscreenChange?.({ event, fullscreen });
  };

  // Sent when the video has started to load
  handleLoadStart: (event: SyntheticEvent<HTMLVideoElement>) => void = (event) => {
    const { onLoadStart } = this.props;

    onLoadStart?.({ event });
  };

  // Sent when playback of the media is paused.
  handlePause: (event: SyntheticEvent<HTMLVideoElement>) => void = (event) => {
    const { onPause } = this.props;

    onPause?.({ event });
  };

  // Sent when playback of the media is ready to start after having been paused.
  handlePlay: (event: SyntheticEvent<HTMLVideoElement>) => void = (event) => {
    const { onPlay } = this.props;

    onPlay?.({ event });
  };

  // Sent when playback of the media is ready to start after having been paused.
  handlePlaying: (event: SyntheticEvent<HTMLVideoElement>) => void = (event) => {
    const { onPlaying } = this.props;

    onPlaying?.({ event });
  };

  // Sent when mouse down event happens on playhead
  handlePlayheadDown: (event: SyntheticMouseEvent<HTMLDivElement>) => void = (event) => {
    const { onPlayheadDown } = this.props;

    onPlayheadDown?.({ event });
  };

  // Sent when mouse up event happens on playhead
  handlePlayheadUp: (event: SyntheticMouseEvent<HTMLDivElement>) => void = (event) => {
    const { onPlayheadUp } = this.props;

    onPlayheadUp?.({ event });
  };

  // Sent periodically to inform interested parties of progress downloading the media
  handleProgress: (event: SyntheticEvent<HTMLVideoElement>) => void = (event) => {
    const { onLoadedChange } = this.props;
    const buffered = this.video?.buffered;
    const loaded = buffered && buffered.length > 0 ? buffered.end(buffered.length - 1) : 0;

    onLoadedChange?.({ event, loaded });
  };

  // Sent when a seek operation completes.
  handleSeek: (event: SyntheticEvent<HTMLVideoElement>) => void = (event) => {
    const { onSeek } = this.props;

    onSeek?.({ event });
  };

  // Sent when a seek operation beings.
  handleSeeking: (event: SyntheticEvent<HTMLVideoElement>) => void = (event) => {
    const { onSeeking } = this.props;

    onSeeking?.({ event });
  };

  // Sent when trying to fetch data but the data is unexpectedly not forthcoming.
  handleStalled: (event: SyntheticEvent<HTMLVideoElement>) => void = (event) => {
    const { onStalled } = this.props;

    onStalled?.({ event });
  };

  // The time indicated by the element's currentTime attribute has changed
  handleTimeUpdate: (event: SyntheticEvent<HTMLVideoElement>) => void = (event) => {
    const { onTimeChange } = this.props;
    const currentTime = (this.video && this.video.currentTime) || 0;
    this.setState({ currentTime });

    onTimeChange?.({ event, time: currentTime });
  };

  // Sent when the audio volume changes
  handleVolumeChange: (
    event: SyntheticEvent<HTMLDivElement> | SyntheticEvent<HTMLAnchorElement>,
  ) => void = (event) => {
    const { onVolumeChange } = this.props;
    const muted = (this.video && this.video.muted) || false;

    onVolumeChange?.({ event, volume: muted ? 1 : 0 });
  };

  // Sent when playback has stopped because of a temporary lack of data.
  handleWaiting: (event: SyntheticEvent<HTMLVideoElement>) => void = (event) => {
    const { onWaiting } = this.props;

    onWaiting?.({ event });
  };

  render(): Node {
    const {
      aspectRatio,
      autoplay,
      backgroundColor,
      captions,
      children,
      crossOrigin,
      disableRemotePlayback,
      loop,
      objectFit,
      playing,
      playsInline,
      poster,
      preload,
      src,
      volume,
    } = this.props;
    const { currentTime, duration, fullscreen, captionsButton } = this.state;
    const paddingBottom = (fullscreen && '0') || `${(1 / aspectRatio) * 100}%`;
    let crossOriginPolicy = crossOrigin || undefined;
    if (captions && crossOriginPolicy !== 'anonymous') {
      if (crossOriginPolicy === undefined) {
        crossOriginPolicy = 'anonymous';
      } else {
        throw new Error(
          `"The crossOrigin policy must be set to 'anonymous' for captions to work."`,
        );
      }
    }
    const playerClasses = classnames(styles.player, {
      [colors.blackBg]: backgroundColor === 'black',
      [colors.transparentBg]: backgroundColor === 'transparent',
    });
    return (
      <div
        ref={this.setPlayerRef}
        className={playerClasses}
        style={{ paddingBottom, height: fullscreen ? '100%' : 0 }}
      >
        <video
          autoPlay={autoplay}
          className={styles.video}
          {...({ crossOrigin: crossOriginPolicy }: {|
            crossOrigin?: CrossOrigin,
          |})}
          disableRemotePlayback={disableRemotePlayback}
          loop={loop}
          muted={volume === 0}
          {...(objectFit ? { style: { objectFit } } : null)}
          onCanPlay={this.handleCanPlay}
          onDurationChange={this.handleDurationChange}
          onEnded={this.handleEnded}
          onError={this.handleError}
          onLoadStart={this.handleLoadStart}
          onPlay={this.handlePlay}
          onPause={this.handlePause}
          onPlaying={this.handlePlaying}
          onProgress={this.handleProgress}
          onSeeked={this.handleSeek}
          onSeeking={this.handleSeeking}
          onStalled={this.handleStalled}
          onTimeUpdate={this.handleTimeUpdate}
          onWaiting={this.handleWaiting}
          playsInline={playsInline}
          poster={poster}
          preload={preload}
          src={typeof src === 'string' ? src : undefined}
          ref={this.setVideoRef}
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
        {this.props.controls && (
          <VideoControls
            captionsButton={captionsButton}
            currentTime={currentTime}
            duration={duration}
            fullscreen={fullscreen}
            onCaptionsChange={this.toggleCaptions}
            onPlay={this.handleControlsPlay}
            onPlayheadDown={this.handlePlayheadDown}
            onPlayheadUp={this.handlePlayheadUp}
            onPause={this.handleControlsPause}
            onFullscreenChange={this.toggleFullscreen}
            onVolumeChange={this.handleVolumeChange}
            playing={playing}
            seek={this.seek}
            volume={volume}
          />
        )}
      </div>
    );
  }
}
