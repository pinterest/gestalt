// @flow strict

import * as React from 'react';
import PropTypes from 'prop-types';
import VideoControls from './VideoControls.js';
import { ColorSchemeProvider } from './contexts/ColorScheme.js';
import styles from './Video.css';
import Box from './Box.js';

type Source =
  | string
  | Array<{| type: 'video/m3u8' | 'video/mp4' | 'video/ogg', src: string |}>;

type Props = {|
  accessibilityHideCaptionsLabel?: string,
  accessibilityShowCaptionsLabel?: string,
  accessibilityMaximizeLabel: string,
  accessibilityMinimizeLabel: string,
  accessibilityMuteLabel: string,
  accessibilityPauseLabel: string,
  accessibilityPlayLabel: string,
  accessibilityUnmuteLabel: string,
  aspectRatio: number,
  captions: string,
  children?: React.Node,
  controls?: boolean,
  loop?: boolean,
  onDurationChange?: ({|
    event: SyntheticEvent<HTMLVideoElement>,
    duration: number,
  |}) => void,
  onEnded?: ({| event: SyntheticEvent<HTMLVideoElement> |}) => void,
  onFullscreenChange?: ({| event: Event, fullscreen: boolean |}) => void,
  onLoadedChange?: ({|
    event: SyntheticEvent<HTMLVideoElement>,
    loaded: number,
  |}) => void,
  onPlay?: ({| event: SyntheticEvent<HTMLDivElement> |}) => void,
  onPlayheadDown?: ({| event: SyntheticMouseEvent<HTMLDivElement> |}) => void,
  onPlayheadUp?: ({| event: SyntheticMouseEvent<HTMLDivElement> |}) => void,
  onPause?: ({| event: SyntheticEvent<HTMLDivElement> |}) => void,
  onReady?: ({| event: SyntheticEvent<HTMLVideoElement> |}) => void,
  onSeek?: ({| event: SyntheticEvent<HTMLVideoElement> |}) => void,
  onTimeChange?: ({|
    event: SyntheticEvent<HTMLVideoElement>,
    time: number,
  |}) => void,
  onVolumeChange?: ({|
    event: SyntheticEvent<HTMLDivElement>,
    volume: number,
  |}) => void,
  playbackRate: number,
  playing: boolean,
  playsInline?: boolean,
  poster?: string,
  preload: 'auto' | 'metadata' | 'none',
  src: Source,
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
        source.src !== oldSource[index].src
    );
  }
  // If the sources are both a string, simply compare
  // the new with the old
  return newSource !== oldSource;
};

export default class Video extends React.PureComponent<Props, State> {
  video: ?HTMLVideoElement;

  player: ?HTMLDivElement;

  static propTypes = {
    accessibilityHideCaptionsLabel: PropTypes.string,
    accessibilityShowCaptionsLabel: PropTypes.string,
    accessibilityMaximizeLabel: PropTypes.string,
    accessibilityMinimizeLabel: PropTypes.string,
    accessibilityMuteLabel: PropTypes.string,
    accessibilityPauseLabel: PropTypes.string,
    accessibilityPlayLabel: PropTypes.string,
    accessibilityUnmuteLabel: PropTypes.string,
    aspectRatio: PropTypes.number.isRequired,
    captions: PropTypes.string.isRequired,
    children: PropTypes.node,
    controls: PropTypes.bool,
    loop: PropTypes.bool,
    onDurationChange: PropTypes.func,
    onEnded: PropTypes.func,
    onFullscreenChange: PropTypes.func,
    onLoadedChange: PropTypes.func,
    onPlay: PropTypes.func,
    onPause: PropTypes.func,
    onReady: PropTypes.func,
    onSeek: PropTypes.func,
    onTimeChange: PropTypes.func,
    onVolumeChange: PropTypes.func,
    playbackRate: PropTypes.number,
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

  static defaultProps: {|
    playbackRate: number,
    playing: boolean,
    preload: 'auto' | 'metadata' | 'none',
    volume: number,
  |} = {
    playbackRate: 1,
    playing: false,
    preload: 'auto',
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
    const { captions, playbackRate, playing, volume } = this.props;
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
      this.video.textTracks[0].mode = 'showing';
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
  setPlayerRef: (ref: ?HTMLDivElement) => void = ref => {
    this.player = ref;
  };

  // The actual reference to the video HTML DOM element
  setVideoRef: (ref: ?HTMLVideoElement) => void = ref => {
    this.video = ref;
  };

  /**
   * Functions that directly interact with the HTML video element
   */

  // Set the video to the desired playback rate: 1 (normal)
  setPlaybackRate: (playbackRate: number) => void = playbackRate => {
    if (this.video) {
      this.video.playbackRate = playbackRate;
    }
  };

  // Set the video to the desired volume: 0 (muted) -> 1 (max)
  setVolume: (volume: number) => void = volume => {
    if (this.video) {
      this.video.volume = volume;
    }
  };

  // Change the video source and re-load the video
  load: () => void = () => {
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
  seek: (time: number) => void = time => {
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
  handleCanPlay: (event: SyntheticEvent<HTMLVideoElement>) => void = event => {
    const { onReady } = this.props;

    if (onReady) {
      onReady({ event });
    }
  };

  // The metadata has loaded or changed, indicating a change in
  // duration of the media
  handleDurationChange: (
    event: SyntheticEvent<HTMLVideoElement>
  ) => void = event => {
    const { onDurationChange } = this.props;
    const duration = (this.video && this.video.duration) || 0;
    this.setState({ duration });

    if (onDurationChange) {
      onDurationChange({ event, duration });
    }
  };

  // Sent when playback completes.
  handleEnded: (event: SyntheticEvent<HTMLVideoElement>) => void = event => {
    const { onEnded } = this.props;

    if (onEnded) {
      onEnded({ event });
    }
  };

  // Sent when the video is switched to/out-of fullscreen mode
  handleFullscreenChange: (event: Event) => void = event => {
    const { onFullscreenChange } = this.props;
    const fullscreen = !!isFullscreen();
    this.setState({ fullscreen });

    if (onFullscreenChange) {
      onFullscreenChange({ event, fullscreen });
    }
  };

  // Sent when playback of the media starts after having been paused.
  handlePlay: (event: SyntheticEvent<HTMLDivElement>) => void = event => {
    const { onPlay } = this.props;

    if (onPlay) {
      onPlay({ event });
    }
  };

  // Sent when mouse down event happens on playhead
  handlePlayheadDown: (
    event: SyntheticMouseEvent<HTMLDivElement>
  ) => void = event => {
    const { onPlayheadDown } = this.props;

    if (onPlayheadDown) {
      onPlayheadDown({ event });
    }
  };

  // Sent when mouse up event happens on playhead
  handlePlayheadUp: (
    event: SyntheticMouseEvent<HTMLDivElement>
  ) => void = event => {
    const { onPlayheadUp } = this.props;

    if (onPlayheadUp) {
      onPlayheadUp({ event });
    }
  };

  // Sent when playback is paused.
  handlePause: (event: SyntheticEvent<HTMLDivElement>) => void = event => {
    const { onPause } = this.props;

    if (onPause) {
      onPause({ event });
    }
  };

  // Sent periodically to inform interested parties of progress downloading the media
  handleProgress: (event: SyntheticEvent<HTMLVideoElement>) => void = event => {
    const { onLoadedChange } = this.props;
    const { buffered } = this.video || {};
    const loaded =
      buffered && buffered.length > 0 ? buffered.end(buffered.length - 1) : 0;

    if (onLoadedChange) {
      onLoadedChange({ event, loaded });
    }
  };

  // Sent when a seek operation completes.
  handleSeek: (event: SyntheticEvent<HTMLVideoElement>) => void = event => {
    const { onSeek } = this.props;

    if (onSeek) {
      onSeek({ event });
    }
  };

  // The time indicated by the element's currentTime attribute has changed
  handleTimeUpdate: (
    event: SyntheticEvent<HTMLVideoElement>
  ) => void = event => {
    const { onTimeChange } = this.props;
    const currentTime = (this.video && this.video.currentTime) || 0;
    this.setState({ currentTime });

    if (onTimeChange) {
      onTimeChange({ event, time: currentTime });
    }
  };

  // Sent when the audio volume changes
  handleVolumeChange: (
    event: SyntheticEvent<HTMLDivElement>
  ) => void = event => {
    const { onVolumeChange } = this.props;
    const muted = (this.video && this.video.muted) || false;

    if (onVolumeChange) {
      onVolumeChange({ event, volume: muted ? 1 : 0 });
    }
  };

  render(): React.Node {
    const {
      aspectRatio,
      captions,
      children,
      loop,
      playing,
      playsInline,
      poster,
      preload,
      src,
      volume,
    } = this.props;
    const { currentTime, duration, fullscreen, captionsButton } = this.state;

    const paddingBottom = (fullscreen && '0') || `${(1 / aspectRatio) * 100}%`;

    return (
      <div
        ref={this.setPlayerRef}
        className={styles.player}
        style={{ paddingBottom, height: fullscreen ? '100%' : 0 }}
      >
        <ColorSchemeProvider id="Video" colorScheme="light">
          <video
            autoPlay={playing}
            crossOrigin="anonymous"
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
            onEnded={this.handleEnded}
            onSeeked={this.handleSeek}
            onTimeUpdate={this.handleTimeUpdate}
            onProgress={this.handleProgress}
          >
            {Array.isArray(src) &&
              src.map(source => (
                <source key={source.src} src={source.src} type={source.type} />
              ))}
            <track kind="captions" src={captions} />
          </video>
          {children && (
            <Box position="absolute" top left bottom right overflow="hidden">
              {children}
            </Box>
          )}
          {/* Need to use full path for these props so Flow can infer correct subtype */}
          {this.props.controls && (
            <VideoControls
              accessibilityHideCaptionsLabel={
                this.props.accessibilityHideCaptionsLabel || ''
              }
              accessibilityShowCaptionsLabel={
                this.props.accessibilityShowCaptionsLabel || ''
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
