// @flow

import * as React from 'react';
import VideoControls from './VideoControls';
import PropTypes from 'prop-types';
import styles from './Video.css';

type VideoWithControls = {|
  accessibilityMaximizeLabel: string,
  accessibilityMinimizeLabel: string,
  accessibilityMuteLabel: string,
  accessibilityPauseLabel: string,
  accessibilityPlayLabel: string,
  accessibilityUnmuteLabel: string,
  controls: boolean,
|};

type VideoNoControls = {|
  accessibilityMaximizeLabel?: string,
  accessibilityMinimizeLabel?: string,
  accessibilityMuteLabel?: string,
  accessibilityPauseLabel?: string,
  accessibilityPlayLabel?: string,
  accessibilityUnmuteLabel?: string,
  controls?: null,
|};

type Controls = VideoWithControls | VideoNoControls;

type Props = {|
  captions: string,
  loop?: boolean,
  onDurationChange?: ({
    event: SyntheticEvent<HTMLVideoElement>,
    duration: number,
  }) => void,
  onFullscreenChange?: ({ event: Event, fullscreen: boolean }) => void,
  onPlay?: () => void,
  onPause?: () => void,
  onTimeUpdate?: ({
    event: SyntheticEvent<HTMLVideoElement>,
    currentTime: number,
  }) => void,
  onVolumeChange?: ({ volume: number }) => void,
  playing: boolean,
  playsInline?: boolean,
  poster?: string,
  preload: 'auto' | 'metadata' | 'none',
  src:
    | string
    | Array<{| type: 'video/m3u8' | 'video/mp4' | 'video/ogg', src: string |}>,
  volume: number,
  ...Controls,
|};

type State = {|
  currentTime: number,
  duration: number,
  fullscreen: boolean,
|};

// For more information on fullscreen and vendor prefixes see
// https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API

const requestFullscreen = (element: HTMLElement) => {
  if (element.requestFullscreen) {
    element.requestFullscreen();
    // $FlowIssue - vendor prefix missing from Flow
  } else if (element.webkitRequestFullscreen) {
    // $FlowIssue - vendor prefix missing from Flow
    element.webkitRequestFullscreen();
    // $FlowIssue - vendor prefix missing from Flow
  } else if (element.mozRequestFullScreen) {
    // $FlowIssue - vendor prefix missing from Flow
    element.mozRequestFullScreen();
    // $FlowIssue - vendor prefix missing from Flow
  } else if (element.msRequestFullscreen) {
    // $FlowIssue - vendor prefix missing from Flow
    element.msRequestFullscreen();
  }
};

const exitFullscreen = () => {
  // $FlowIssue - vendor prefix missing from Flow
  if (document.exitFullscreen) {
    // $FlowIssue - vendor prefix missing from Flow
    document.exitFullscreen();
    // $FlowIssue - vendor prefix missing from Flow
  } else if (document.webkitExitFullscreen) {
    // $FlowIssue - vendor prefix missing from Flow
    document.webkitExitFullscreen();
    // $FlowIssue - vendor prefix missing from Flow
  } else if (document.mozCancelFullScreen) {
    // $FlowIssue - vendor prefix missing from Flow
    document.mozCancelFullScreen();
    // $FlowIssue - vendor prefix missing from Flow
  } else if (document.msExitFullscreen) {
    // $FlowIssue - vendor prefix missing from Flow
    document.msExitFullscreen();
  }
};

const fullscreenEnabled = () =>
  // $FlowIssue - vendor prefix missing from Flow
  document.fullscreenEnabled ||
  // $FlowIssue - vendor prefix missing from Flow
  document.webkitFullscreenEnabled ||
  // $FlowIssue - vendor prefix missing from Flow
  document.mozFullScreenEnabled ||
  // $FlowIssue - vendor prefix missing from Flow
  document.msFullscreenEnabled;

// Normally document.fullscreen suffices here as a flag, but IE11 does not
// have a vendor specific version so we must instead use the actual element
const isFullscreen = () =>
  // $FlowIssue - vendor prefix missing from Flow
  document.fullscreenElement ||
  // $FlowIssue - vendor prefix missing from Flow
  document.webkitFullscreenElement ||
  // $FlowIssue - vendor prefix missing from Flow
  document.mozFullScreenElement ||
  // $FlowIssue - vendor prefix missing from Flow
  document.msFullscreenElement;

const addFullscreenEventListener = (handler: Function) => {
  document.addEventListener('fullscreenchange', handler);
  document.addEventListener('webkitfullscreenchange', handler);
  document.addEventListener('mozfullscreenchange', handler);
  document.addEventListener('MSFullscreenChange', handler);
};

const removeFullscreenEventListener = (handler: Function) => {
  document.removeEventListener('fullscreenchange', handler);
  document.removeEventListener('webkitfullscreenchange', handler);
  document.removeEventListener('mozfullscreenchange', handler);
  document.removeEventListener('MSFullscreenChange', handler);
};

export default class Video extends React.PureComponent<Props, State> {
  static propTypes = {
    accessibilityMaximizeLabel: PropTypes.string,
    accessibilityMinimizeLabel: PropTypes.string,
    accessibilityMuteLabel: PropTypes.string,
    accessibilityPauseLabel: PropTypes.string,
    accessibilityPlayLabel: PropTypes.string,
    accessibilityUnmuteLabel: PropTypes.string,
    captions: PropTypes.string.isRequired,
    controls: PropTypes.bool,
    loop: PropTypes.bool,
    onDurationChange: PropTypes.func,
    onFullscreenChange: PropTypes.func,
    onPlay: PropTypes.func,
    onPause: PropTypes.func,
    onTimeUpdate: PropTypes.func,
    onVolumeChange: PropTypes.func,
    playing: PropTypes.bool,
    playsInline: PropTypes.bool,
    poster: PropTypes.string,
    preload: PropTypes.oneOf(['auto', 'metadata', 'none']),
    src: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(
        PropTypes.shape({
          type: PropTypes.oneOf(['video/m3u8', 'video/mp4', 'video/ogg'])
            .isRequired,
          src: PropTypes.string.isRequired,
        })
      ),
    ]).isRequired,
    volume: PropTypes.number,
  };

  static defaultProps = {
    playing: false,
    preload: 'auto',
    volume: 1,
  };

  state = {
    currentTime: 0,
    duration: 0,
    fullscreen: false,
  };

  /**
   * React lifecycle hooks pertinent to Video
   */

  componentDidMount() {
    // Set up event listeners to catch backdoors in fullscreen
    // changes such as using the ESC key to exit
    if (typeof document !== 'undefined') {
      addFullscreenEventListener(this.handleFullscreenChange);
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.src !== this.props.src) {
      this.load();
    }
    if (prevProps.volume !== this.props.volume) {
      this.setVolume(this.props.volume);
    }
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
  setPlayerRef = (ref: ?HTMLDivElement) => {
    this.player = ref;
  };

  // The actual reference to the video HTML DOM element
  setVideoRef = (ref: ?HTMLVideoElement) => {
    this.video = ref;
  };

  /**
   * Functions that directly interact with the HTML video element
   */

  // Set the video to the desired volume: 0 (muted) -> 1 (max)
  setVolume = (volume: number) => {
    if (this.video) {
      this.video.volume = volume;
    }
  };

  // Change the video source and re-load the video
  load = () => {
    if (this.video) {
      this.video.load();
    }
  };

  // Seek the video to the desired time
  seek = (time: number) => {
    if (this.video) {
      this.video.currentTime = time;
    }
  };

  // Pause the video
  pause = () => {
    if (this.video) {
      this.video.pause();
    }
  };

  // Play the video
  play = () => {
    if (this.video) {
      this.video.play();
    }
  };

  video: ?HTMLVideoElement;
  player: ?HTMLDivElement;

  // Enter/exit fullscreen video player mode
  toggleFullscreen = () => {
    if (fullscreenEnabled()) {
      if (isFullscreen()) {
        exitFullscreen();
      } else if (this.player) {
        requestFullscreen(this.player);
      }
    }
  };

  /**
   * Handlers for various media events on the video
   */

  // Sent when enough data is available that the media can be played
  handleCanPlay = () => {
    // Simulate an autoplay effect if the component was mounted with
    // playing set to true
    if (this.props.playing) {
      this.play();
    }
  };

  // The metadata has loaded or changed, indicating a change in
  // duration of the media
  handleDurationChange = (event: SyntheticEvent<HTMLVideoElement>) => {
    const { onDurationChange } = this.props;
    const duration = (this.video && this.video.duration) || 0;
    this.setState({ duration });

    if (onDurationChange) {
      onDurationChange({ event, duration });
    }
  };

  // Sent when the video is switched to/out-of fullscreen mode
  handleFullscreenChange = (event: Event) => {
    const { onFullscreenChange } = this.props;
    const fullscreen = !!isFullscreen();
    this.setState({ fullscreen });

    if (onFullscreenChange) {
      onFullscreenChange({ event, fullscreen });
    }
  };

  // Sent when playback of the media starts after having been paused.
  handlePlay = () => {
    const { onPlay } = this.props;

    if (onPlay) {
      onPlay();
    }
  };

  // Sent when playback is paused.
  handlePause = () => {
    const { onPause } = this.props;

    if (onPause) {
      onPause();
    }
  };

  // The time indicated by the element's currentTime attribute has changed
  handleTimeUpdate = (event: SyntheticEvent<HTMLVideoElement>) => {
    const { onTimeUpdate } = this.props;
    const currentTime = (this.video && this.video.currentTime) || 0;
    this.setState({ currentTime });

    if (onTimeUpdate) {
      onTimeUpdate({ event, currentTime });
    }
  };

  // Sent when the audio volume changes
  handleVolumeChange = () => {
    const { onVolumeChange } = this.props;
    const muted = (this.video && this.video.muted) || false;

    if (onVolumeChange) {
      onVolumeChange({ volume: muted ? 1 : 0 });
    }
  };

  render() {
    const {
      captions,
      loop,
      playing,
      playsInline,
      poster,
      preload,
      src,
      volume,
    } = this.props;
    const { currentTime, duration, fullscreen } = this.state;

    const paddingBottom =
      // In full screen the padding bottom is 0 to fit the screen
      (fullscreen && '0') ||
      // If video data is present, use the correct aspect ratio
      (this.video &&
        `${this.video.videoHeight / this.video.videoWidth * 100}%`) ||
      // If the video metadata is missing, default to a standard 16:9 ratio
      `${9 / 16 * 100}%`;

    return (
      <div
        ref={this.setPlayerRef}
        className={styles.player}
        style={{ paddingBottom, height: fullscreen ? '100%' : 0 }}
      >
        <video
          loop={loop}
          muted={volume === 0}
          playsInline={playsInline}
          poster={poster}
          preload={preload}
          src={typeof src === 'string' ? src : undefined}
          ref={this.setVideoRef}
          className={styles.video}
          onCanPlay={this.handleCanPlay}
          onDurationChange={this.handleDurationChange}
          onTimeUpdate={this.handleTimeUpdate}
        >
          {Array.isArray(src) &&
            src.map(source => (
              <source key={source.src} src={source.src} type={source.type} />
            ))}
          <track kind="captions" src={captions} />
        </video>
        {/* Need to use full path for these props so Flow can infer correct subtype */}
        {this.props.controls && (
          <VideoControls
            accessibilityMaximizeLabel={this.props.accessibilityMaximizeLabel}
            accessibilityMinimizeLabel={this.props.accessibilityMinimizeLabel}
            accessibilityMuteLabel={this.props.accessibilityMuteLabel}
            accessibilityPauseLabel={this.props.accessibilityPauseLabel}
            accessibilityPlayLabel={this.props.accessibilityPlayLabel}
            accessibilityUnmuteLabel={this.props.accessibilityUnmuteLabel}
            currentTime={currentTime}
            duration={duration}
            fullscreen={fullscreen}
            onPlay={this.handlePlay}
            onPause={this.handlePause}
            onVolumeChange={this.handleVolumeChange}
            playing={playing}
            seek={this.seek}
            toggleFullscreen={this.toggleFullscreen}
            volume={volume}
          />
        )}
      </div>
    );
  }
}
