import type { Node } from "react";
import classnames from "classnames";
import { PureComponent } from "react";
import VideoControls from "./VideoControls";
import ColorSchemeProvider from "./contexts/ColorScheme";
import styles from "./Video.css";
import colors from "./Colors.css";
import Box from "./Box";
import type { AbstractEventHandler } from "./AbstractEventHandler";
import "./AbstractEventHandler";
type Source =
  | string
  | ReadonlyArray<{
      type: "video/m3u8" | "video/mp4" | "video/ogg";
      src: string;
    }>;
type ObjectFit = "fill" | "contain" | "cover" | "none" | "scale-down";
type CrossOrigin = "anonymous" | "use-credentials";
type BackgroundColor = "black" | "transparent";
type Props = {
  accessibilityHideCaptionsLabel?: string;
  accessibilityShowCaptionsLabel?: string;
  accessibilityMaximizeLabel: string;
  accessibilityMinimizeLabel: string;
  accessibilityMuteLabel: string;
  accessibilityPauseLabel: string;
  accessibilityPlayLabel: string;
  accessibilityUnmuteLabel: string;
  aspectRatio: number;
  backgroundColor: BackgroundColor;
  captions: string;
  crossOrigin?: CrossOrigin;
  children?: Node;
  controls?: boolean;
  disableRemotePlayback?: boolean;
  loop?: boolean;
  objectFit?: ObjectFit;
  onDurationChange?: (arg0: {
    event: React.SyntheticEvent<HTMLVideoElement>;
    duration: number;
  }) => void;
  onEnded?: AbstractEventHandler<React.SyntheticEvent<HTMLVideoElement>>;
  onError?: AbstractEventHandler<React.SyntheticEvent<HTMLVideoElement>>;
  onFullscreenChange?: AbstractEventHandler<
    Event,
    {
      fullscreen: boolean;
    }
  >;
  onLoadedChange?: AbstractEventHandler<
    React.SyntheticEvent<HTMLVideoElement>,
    {
      loaded: number;
    }
  >;
  onLoadStart?: AbstractEventHandler<React.SyntheticEvent<HTMLVideoElement>>;
  onPlay?: AbstractEventHandler<
    | React.SyntheticEvent<HTMLDivElement>
    | React.SyntheticEvent<HTMLAnchorElement>
  >;
  onPlaying?: AbstractEventHandler<React.SyntheticEvent<HTMLVideoElement>>;
  onPlayheadDown?: AbstractEventHandler<React.MouseEvent<HTMLDivElement>>;
  onPlayheadUp?: AbstractEventHandler<React.MouseEvent<HTMLDivElement>>;
  onPause?: AbstractEventHandler<
    | React.SyntheticEvent<HTMLDivElement>
    | React.SyntheticEvent<HTMLAnchorElement>
  >;
  onReady?: AbstractEventHandler<React.SyntheticEvent<HTMLVideoElement>>;
  onSeek?: AbstractEventHandler<React.SyntheticEvent<HTMLVideoElement>>;
  onSeeking?: AbstractEventHandler<React.SyntheticEvent<HTMLVideoElement>>;
  onStalled?: AbstractEventHandler<React.SyntheticEvent<HTMLVideoElement>>;
  onTimeChange?: AbstractEventHandler<
    React.SyntheticEvent<HTMLVideoElement>,
    {
      time: number;
    }
  >;
  onVolumeChange?: AbstractEventHandler<
    | React.SyntheticEvent<HTMLDivElement>
    | React.SyntheticEvent<HTMLAnchorElement>,
    {
      volume: number;
    }
  >;
  onWaiting?: AbstractEventHandler<React.SyntheticEvent<HTMLVideoElement>>;
  playbackRate: number;
  playing: boolean;
  playsInline?: boolean;
  poster?: string;
  preload: "auto" | "metadata" | "none";
  src: Source;
  volume: number;
};
type State = {
  currentTime: number;
  duration: number;
  fullscreen: boolean;
  captionsButton: "enabled" | "disabled" | null;
};

// For more information on fullscreen and vendor prefixes see
// https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
const requestFullscreen = (element: HTMLElement) => {
  // $FlowFixMe[method-unbinding]
  if (element.requestFullscreen) {
    element.requestFullscreen(); // $FlowFixMe[prop-missing]
  } else if (element.webkitRequestFullscreen) {
    // $FlowFixMe[not-a-function]
    element.webkitRequestFullscreen(); // $FlowFixMe[prop-missing]
  } else if (element.mozRequestFullScreen) {
    // $FlowFixMe[not-a-function]
    element.mozRequestFullScreen(); // $FlowFixMe[prop-missing]
  } else if (element.msRequestFullscreen) {
    // $FlowFixMe[not-a-function]
    element.msRequestFullscreen();
  }
};

const exitFullscreen = () => {
  // $FlowFixMe[method-unbinding]
  if (document.exitFullscreen) {
    document.exitFullscreen(); // $FlowFixMe[prop-missing]
  } else if (document.webkitExitFullscreen) {
    // $FlowFixMe[not-a-function]
    document.webkitExitFullscreen(); // $FlowFixMe[prop-missing]
  } else if (document.mozCancelFullScreen) {
    // $FlowFixMe[not-a-function]
    document.mozCancelFullScreen(); // $FlowFixMe[prop-missing]
  } else if (document.msExitFullscreen) {
    // $FlowFixMe[not-a-function]
    document.msExitFullscreen();
  }
};

// Normally document.fullscreen suffices here as a flag, but IE11 does not
// have a vendor specific version so we must instead use the actual element
const isFullscreen = () =>
  document.fullscreenElement || // $FlowFixMe[prop-missing]
  document.webkitFullscreenElement || // $FlowFixMe[prop-missing]
  document.mozFullScreenElement || // $FlowFixMe[prop-missing]
  document.msFullscreenElement;

const addFullscreenEventListener = (listener: EventListener) => {
  document.addEventListener("fullscreenchange", listener);
  document.addEventListener("webkitfullscreenchange", listener);
  document.addEventListener("mozfullscreenchange", listener);
  document.addEventListener("MSFullscreenChange", listener);
};

const removeFullscreenEventListener = (listener: EventListener) => {
  document.removeEventListener("fullscreenchange", listener);
  document.removeEventListener("webkitfullscreenchange", listener);
  document.removeEventListener("mozfullscreenchange", listener);
  document.removeEventListener("MSFullscreenChange", listener);
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
        source.src !== oldSource[index].src
    );
  }

  // If the sources are both a string, simply compare
  // the new with the old
  return newSource !== oldSource;
};
/**
 * https://gestalt.pinterest.systems/Video
 */

export default class Video extends PureComponent<Props, State> {
  video: HTMLVideoElement | null | undefined;
  player: HTMLDivElement | null | undefined;
  static defaultProps: {
    disableRemotePlayback: boolean;
    backgroundColor: BackgroundColor;
    playbackRate: number;
    playing: boolean;
    preload: "auto" | "metadata" | "none";
    volume: number;
  } = {
    disableRemotePlayback: false,
    // eslint-disable-next-line react/default-props-match-prop-types
    backgroundColor: "black",
    // eslint-disable-next-line react/default-props-match-prop-types
    playbackRate: 1,
    // eslint-disable-next-line react/default-props-match-prop-types
    playing: false,
    // eslint-disable-next-line react/default-props-match-prop-types
    preload: "auto",
    // eslint-disable-next-line react/default-props-match-prop-types
    volume: 0,
  };
  state: State = {
    currentTime: 0,
    duration: 0,
    fullscreen: false,
    captionsButton: this.props.captions ? "enabled" : null,
  };

  /**
   * React lifecycle hooks pertinent to Video
   */
  componentDidMount() {
    const { captions, playbackRate, playing, volume } = this.props;

    // Set up event listeners to catch backdoors in fullscreen
    // changes such as using the ESC key to exit
    if (typeof document !== "undefined") {
      addFullscreenEventListener(this.handleFullscreenChange);
    }

    // Load the video to hydrate the DOM after a server render
    this.load();
    // Set the initial volume
    this.setVolume(volume);
    // Set the initial playback rate
    this.setPlaybackRate(playbackRate);

    // Simulate an autoplay effect if the component
    if (playing) {
      this.play();
    }

    if (
      captions &&
      this.video &&
      this.video.textTracks &&
      this.video.textTracks[0]
    ) {
      this.video.textTracks[0].mode = "showing";
    }
  }

  componentDidUpdate(prevProps: Props) {
    // If the video source changed, reload the video
    if (isNewSource(prevProps.src, this.props.src)) {
      this.load();
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
  setPlayerRef: (ref: HTMLDivElement | null | undefined) => void = (ref) => {
    this.player = ref;
  };
  // The actual reference to the video HTML DOM element
  setVideoRef: (ref: HTMLVideoElement | null | undefined) => void = (ref) => {
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
  play: () => void = () => {
    if (this.video) {
      const isPlaying =
        this.video.currentTime > 0 &&
        !this.video.paused &&
        !this.video.ended &&
        this.video.readyState > 2;
      if (!isPlaying) this.video.play();
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
      const isShowing = videoTrack.mode === "showing";
      videoTrack.mode = isShowing ? "disabled" : "showing";
      this.setState({
        captionsButton: isShowing ? "disabled" : "enabled",
      });
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
  handleCanPlay: (event: React.SyntheticEvent<HTMLVideoElement>) => void = (
    event
  ) => {
    const { onReady } = this.props;

    if (onReady) {
      onReady({
        event,
      });
    }
  };
  // The metadata has loaded or changed, indicating a change in
  // duration of the media
  handleDurationChange: (
    event: React.SyntheticEvent<HTMLVideoElement>
  ) => void = (event) => {
    const { onDurationChange } = this.props;
    const duration = (this.video && this.video.duration) || 0;
    this.setState({
      duration,
    });

    if (onDurationChange) {
      onDurationChange({
        event,
        duration,
      });
    }
  };
  // Sent when playback completes.
  handleEnded: (event: React.SyntheticEvent<HTMLVideoElement>) => void = (
    event
  ) => {
    const { onEnded } = this.props;

    if (onEnded) {
      onEnded({
        event,
      });
    }
  };
  // Sent when an error occurs.
  handleError: (event: React.SyntheticEvent<HTMLVideoElement>) => void = (
    event
  ) => {
    const { onError } = this.props;
    onError?.({
      event,
    });
  };
  // Sent when the video is switched to/out-of fullscreen mode
  handleFullscreenChange: EventListener = (event) => {
    const { onFullscreenChange } = this.props;
    const fullscreen = !!isFullscreen();
    this.setState({
      fullscreen,
    });

    if (onFullscreenChange) {
      onFullscreenChange({
        event,
        fullscreen,
      });
    }
  };
  // Sent when the video has started to load
  handleLoadStart: (event: React.SyntheticEvent<HTMLVideoElement>) => void = (
    event
  ) => {
    const { onLoadStart } = this.props;
    onLoadStart?.({
      event,
    });
  };
  // Sent when playback of the media starts after having been paused.
  handlePlay: (
    event:
      | React.SyntheticEvent<HTMLDivElement>
      | React.SyntheticEvent<HTMLAnchorElement>
  ) => void = (event) => {
    const { onPlay } = this.props;

    if (onPlay) {
      onPlay({
        event,
      });
    }
  };
  // Sent when playback of the media is ready to start after having been paused.
  handlePlaying: (event: React.SyntheticEvent<HTMLVideoElement>) => void = (
    event
  ) => {
    const { onPlaying } = this.props;
    onPlaying?.({
      event,
    });
  };
  // Sent when mouse down event happens on playhead
  handlePlayheadDown: (event: React.MouseEvent<HTMLDivElement>) => void = (
    event
  ) => {
    const { onPlayheadDown } = this.props;

    if (onPlayheadDown) {
      onPlayheadDown({
        event,
      });
    }
  };
  // Sent when mouse up event happens on playhead
  handlePlayheadUp: (event: React.MouseEvent<HTMLDivElement>) => void = (
    event
  ) => {
    const { onPlayheadUp } = this.props;

    if (onPlayheadUp) {
      onPlayheadUp({
        event,
      });
    }
  };
  // Sent when playback is paused.
  handlePause: (
    event:
      | React.SyntheticEvent<HTMLDivElement>
      | React.SyntheticEvent<HTMLAnchorElement>
  ) => void = (event) => {
    const { onPause } = this.props;

    if (onPause) {
      onPause({
        event,
      });
    }
  };
  // Sent periodically to inform interested parties of progress downloading the media
  handleProgress: (event: React.SyntheticEvent<HTMLVideoElement>) => void = (
    event
  ) => {
    const { onLoadedChange } = this.props;
    const { buffered } = this.video || {};
    const loaded =
      buffered && buffered.length > 0 ? buffered.end(buffered.length - 1) : 0;

    if (onLoadedChange) {
      onLoadedChange({
        event,
        loaded,
      });
    }
  };
  // Sent when a seek operation completes.
  handleSeek: (event: React.SyntheticEvent<HTMLVideoElement>) => void = (
    event
  ) => {
    const { onSeek } = this.props;

    if (onSeek) {
      onSeek({
        event,
      });
    }
  };
  // Sent when a seek operation beings.
  handleSeeking: (event: React.SyntheticEvent<HTMLVideoElement>) => void = (
    event
  ) => {
    const { onSeeking } = this.props;
    onSeeking?.({
      event,
    });
  };
  // Sent when trying to fetch data but the data is unexpectedly not forthcoming.
  handleStalled: (event: React.SyntheticEvent<HTMLVideoElement>) => void = (
    event
  ) => {
    const { onStalled } = this.props;
    onStalled?.({
      event,
    });
  };
  // The time indicated by the element's currentTime attribute has changed
  handleTimeUpdate: (event: React.SyntheticEvent<HTMLVideoElement>) => void = (
    event
  ) => {
    const { onTimeChange } = this.props;
    const currentTime = (this.video && this.video.currentTime) || 0;
    this.setState({
      currentTime,
    });

    if (onTimeChange) {
      onTimeChange({
        event,
        time: currentTime,
      });
    }
  };
  // Sent when the audio volume changes
  handleVolumeChange: (
    event:
      | React.SyntheticEvent<HTMLDivElement>
      | React.SyntheticEvent<HTMLAnchorElement>
  ) => void = (event) => {
    const { onVolumeChange } = this.props;
    const muted = (this.video && this.video.muted) || false;

    if (onVolumeChange) {
      onVolumeChange({
        event,
        volume: muted ? 1 : 0,
      });
    }
  };
  // Sent when playback has stopped because of a temporary lack of data.
  handleWaiting: (event: React.SyntheticEvent<HTMLVideoElement>) => void = (
    event
  ) => {
    const { onWaiting } = this.props;
    onWaiting?.({
      event,
    });
  };

  render(): Node {
    const {
      aspectRatio,
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
    const paddingBottom = (fullscreen && "0") || `${(1 / aspectRatio) * 100}%`;
    const playerClasses = classnames(styles.player, {
      [colors.blackBg]: backgroundColor === "black",
      [colors.transparentBg]: backgroundColor === "transparent",
    });
    return (
      <div
        ref={this.setPlayerRef}
        className={playerClasses}
        style={{
          paddingBottom,
          height: fullscreen ? "100%" : 0,
        }}
      >
        <ColorSchemeProvider id="Video" colorScheme="light">
          <video
            autoPlay={playing}
            loop={loop}
            muted={volume === 0}
            playsInline={playsInline}
            poster={poster}
            preload={preload}
            src={typeof src === "string" ? src : undefined}
            ref={this.setVideoRef}
            className={styles.video}
            disableRemotePlayback={disableRemotePlayback}
            onCanPlay={this.handleCanPlay}
            onDurationChange={this.handleDurationChange}
            onEnded={this.handleEnded}
            onError={this.handleError}
            onLoadStart={this.handleLoadStart}
            onPlaying={this.handlePlaying}
            onSeeked={this.handleSeek}
            onSeeking={this.handleSeeking}
            onStalled={this.handleStalled}
            onTimeUpdate={this.handleTimeUpdate}
            onProgress={this.handleProgress}
            onWaiting={this.handleWaiting}
            {...(objectFit
              ? {
                  style: {
                    objectFit,
                  },
                }
              : null)}
            {...((crossOrigin
              ? {
                  crossOrigin,
                }
              : { ...null }) as {
              crossOrigin?: CrossOrigin;
            })}
          >
            {Array.isArray(src) &&
              src.map((source) => (
                <source key={source.src} src={source.src} type={source.type} />
              ))}
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
              accessibilityHideCaptionsLabel={
                this.props.accessibilityHideCaptionsLabel || ""
              }
              accessibilityShowCaptionsLabel={
                this.props.accessibilityShowCaptionsLabel || ""
              }
              accessibilityMaximizeLabel={this.props.accessibilityMaximizeLabel}
              accessibilityMinimizeLabel={this.props.accessibilityMinimizeLabel}
              accessibilityMuteLabel={this.props.accessibilityMuteLabel}
              accessibilityPauseLabel={this.props.accessibilityPauseLabel}
              accessibilityPlayLabel={this.props.accessibilityPlayLabel}
              accessibilityUnmuteLabel={this.props.accessibilityUnmuteLabel}
              captionsButton={captionsButton}
              currentTime={currentTime}
              duration={duration}
              fullscreen={fullscreen}
              onCaptionsChange={this.toggleCaptions}
              onPlay={this.handlePlay}
              onPlayheadDown={this.handlePlayheadDown}
              onPlayheadUp={this.handlePlayheadUp}
              onPause={this.handlePause}
              onFullscreenChange={this.toggleFullscreen}
              onVolumeChange={this.handleVolumeChange}
              playing={playing}
              seek={this.seek}
              volume={volume}
            />
          )}
        </ColorSchemeProvider>
      </div>
    );
  }
}