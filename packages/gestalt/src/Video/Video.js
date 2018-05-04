// @flow

import * as React from 'react';
import VideoControls from './VideoControls';
import PropTypes from 'prop-types';
import styles from './Video.css';

type Props = {|
  accessibilityMaximizeLabel?: string,
  accessibilityMinimizeLabel?: string,
  accessibilityMuteLabel?: string,
  accessibilityPauseLabel?: string,
  accessibilityPlayLabel?: string,
  accessibilityUnmuteLabel?: string,
  autoPlay?: boolean,
  captions: string,
  controls?: boolean,
  loop?: boolean,
  muted?: boolean,
  onDurationChange?: ({ event: SyntheticEvent<HTMLVideoElement> }) => void,
  onFullScreenChange?: ({ event: Event }) => void,
  onPlay?: ({ event: SyntheticEvent<HTMLVideoElement> }) => void,
  onPause?: ({ event: SyntheticEvent<HTMLVideoElement> }) => void,
  onTimeUpdate?: ({ event: SyntheticEvent<HTMLVideoElement> }) => void,
  onVolumeChange?: ({ event: SyntheticEvent<HTMLVideoElement> }) => void,
  poster?: string,
  preload: 'auto' | 'metadata' | 'none',
  src:
    | string
    | Array<{| type: 'video/m3u8' | 'video/mp4' | 'video/ogg', src: string |}>,
|};

type State = {|
  currentTime: number,
  duration: number,
  fullscreen: boolean,
  paused: boolean,
  muted: boolean,
|};

// For more information on fullscreen and vendor prefixes see
// https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API

const requestFullScreen = (element: HTMLElement) => {
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

const exitFullScreen = () => {
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

const fullScreenEnabled = () =>
  document.fullscreenEnabled ||
  document.webkitFullscreenEnabled ||
  document.mozFullScreenEnabled ||
  // $FlowIssue - missing from Flow
  document.msFullscreenEnabled;

// Normally document.fullscreen suffices here as a flag, but IE11 does not
// have a vendor specific version so we must instead use the actual element
const isFullscreen = () =>
  document.fullscreenElement ||
  document.webkitFullscreenElement ||
  document.mozFullScreenElement ||
  // $FlowIssue - missing from Flow
  document.msFullscreenElement;

const addFullScreenEventListener = (handler: Function) => {
  document.addEventListener('fullscreenchange', handler);
  document.addEventListener('webkitfullscreenchange', handler);
  document.addEventListener('mozfullscreenchange', handler);
  document.addEventListener('MSFullscreenChange', handler);
};

const removeFullScreenEventListener = (handler: Function) => {
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
    autoPlay: PropTypes.bool,
    captions: PropTypes.string.isRequired,
    controls: PropTypes.bool,
    loop: PropTypes.bool,
    muted: PropTypes.bool,
    onDurationChange: PropTypes.func,
    onFullScreenChange: PropTypes.func,
    onPlay: PropTypes.func,
    onPause: PropTypes.func,
    onTimeUpdate: PropTypes.func,
    onVolumeChange: PropTypes.func,
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
  };

  static defaultProps = {
    preload: 'auto',
  };

  state = {
    currentTime: 0,
    duration: 0,
    fullscreen: false,
    paused: true,
    muted: this.props.muted || false,
  };

  /**
   * React lifecycle hooks pertinent to Video
   */

  componentDidMount() {
    // Set up event listeners to catch backdoors in fullscreen
    // changes such as using the ESC key to exit
    if (document) {
      addFullScreenEventListener(this.handleFullScreenChange);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.src !== nextProps.src) {
      this.setState({ paused: true });
    }
    this.setState({ muted: nextProps.muted });
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.src !== this.props.src) {
      this.load();
    }
  }

  componentWillUnmount() {
    removeFullScreenEventListener(this.handleFullScreenChange);
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

  player: ?HTMLDivElement;
  video: ?HTMLVideoElement;

  /**
   * Functions that directly interact with the HTML video element
   */

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

  // Enter/exit fullscreen video player mode
  toggleFullscreen = () => {
    if (fullScreenEnabled()) {
      if (isFullscreen()) {
        exitFullScreen();
      } else if (this.player) {
        requestFullScreen(this.player);
      }
    }
  };

  // Mute/unmute the video
  toggleMute = () => {
    if (this.video) {
      this.video.muted = !this.video.muted;
    }
  };

  // Play/pause the video
  togglePlay = () => {
    if (this.video) {
      if (this.video.paused) {
        this.video.play();
      } else {
        this.video.pause();
      }
    }
  };

  /**
   * Handlers for various media events on the video
   */

  // The metadata has loaded or changed, indicating a change in
  // duration of the media
  handleDurationChange = (event: SyntheticEvent<HTMLVideoElement>) => {
    const { onDurationChange } = this.props;
    const duration = (this.video && this.video.duration) || 0;
    this.setState({ duration });

    if (onDurationChange) {
      onDurationChange({ event });
    }
  };

  // Sent when the video is switched to/out-of fullscreen mode
  handleFullScreenChange = (event: Event) => {
    const { onFullScreenChange } = this.props;
    this.setState({ fullscreen: !!isFullscreen() });

    if (onFullScreenChange) {
      onFullScreenChange({ event });
    }
  };

  // Sent when the media begins to play (either for the first time,
  // after having been paused, or after ending and then restarting).
  handlePlay = (event: SyntheticEvent<HTMLVideoElement>) => {
    const { onPlay } = this.props;
    this.setState({ paused: false });

    if (onPlay) {
      onPlay({ event });
    }
  };

  // Sent when playback is paused.
  handlePause = (event: SyntheticEvent<HTMLVideoElement>) => {
    const { onPause } = this.props;
    this.setState({ paused: true });

    if (onPause) {
      onPause({ event });
    }
  };

  // The time indicated by the element's currentTime attribute has changed
  handleTimeUpdate = (event: SyntheticEvent<HTMLVideoElement>) => {
    const { onTimeUpdate } = this.props;
    this.setState({ currentTime: (this.video && this.video.currentTime) || 0 });

    if (onTimeUpdate) {
      onTimeUpdate({ event });
    }
  };

  // Sent when the audio volume changes
  handleVolumeChange = (event: SyntheticEvent<HTMLVideoElement>) => {
    const { onVolumeChange } = this.props;
    this.setState({ muted: (this.video && this.video.muted) || false });

    if (onVolumeChange) {
      onVolumeChange({ event });
    }
  };

  render() {
    const {
      accessibilityMaximizeLabel,
      accessibilityMinimizeLabel,
      accessibilityMuteLabel,
      accessibilityPauseLabel,
      accessibilityPlayLabel,
      accessibilityUnmuteLabel,
      autoPlay,
      captions,
      controls,
      loop,
      poster,
      preload,
      src,
    } = this.props;
    const { currentTime, duration, fullscreen, muted, paused } = this.state;

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
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          poster={poster}
          preload={preload}
          src={typeof src === 'string' ? src : undefined}
          ref={this.setVideoRef}
          className={styles.video}
          onDurationChange={this.handleDurationChange}
          onPlaying={this.handlePlay}
          onPause={this.handlePause}
          onTimeUpdate={this.handleTimeUpdate}
          onVolumeChange={this.handleVolumeChange}
        >
          {Array.isArray(src) &&
            src.map(source => (
              <source key={source.src} src={source.src} type={source.type} />
            ))}
          <track kind="captions" src={captions} />
        </video>
        {controls && (
          <VideoControls
            accessibilityMaximizeLabel={accessibilityMaximizeLabel}
            accessibilityMinimizeLabel={accessibilityMinimizeLabel}
            accessibilityMuteLabel={accessibilityMuteLabel}
            accessibilityPauseLabel={accessibilityPauseLabel}
            accessibilityPlayLabel={accessibilityPlayLabel}
            accessibilityUnmuteLabel={accessibilityUnmuteLabel}
            currentTime={currentTime}
            duration={duration}
            fullscreen={fullscreen}
            muted={muted}
            paused={paused}
            seek={this.seek}
            toggleFullscreen={this.toggleFullscreen}
            toggleMute={this.toggleMute}
            togglePlay={this.togglePlay}
          />
        )}
      </div>
    );
  }
}
