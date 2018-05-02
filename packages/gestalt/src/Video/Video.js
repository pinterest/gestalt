// @flow

import * as React from 'react';
import * as fullscreen from './fullscreen';
import VideoControls from './VideoControls';
import PropTypes from 'prop-types';

type Props = {|
  autoPlay?: boolean,
  controls?: boolean,
  loop?: boolean,
  muted?: boolean,
  onDurationChange?: ({ event: SyntheticEvent<HTMLVideoElement> }) => void,
  onPlay?: ({ event: SyntheticEvent<HTMLVideoElement> }) => void,
  onPause?: ({ event: SyntheticEvent<HTMLVideoElement> }) => void,
  onTimeUpdate?: ({ event: SyntheticEvent<HTMLVideoElement> }) => void,
  onVolumeChange?: ({ event: SyntheticEvent<HTMLVideoElement> }) => void,
  poster?: string,
  preload: 'auto' | 'metadata' | 'none',
  src?: string,
|};

type State = {|
  currentTime: number,
  duration: number,
  isFullscreen: boolean,
  paused: boolean,
  muted: boolean,
|};

export default class Video extends React.PureComponent<Props, State> {
  static defaultProps = {
    preload: 'auto',
  };

  state = {
    currentTime: 0,
    duration: 0,
    isFullscreen: false,
    paused: true,
    muted: this.props.muted || false,
  };

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

  // Enter/exit fullscreen video player mode
  toggleFullscreen = () => {
    if (fullscreen.enabled()) {
      if (this.state.isFullscreen) {
        fullscreen.exit();
        this.setState({ isFullscreen: false });
      } else if (this.player) {
        fullscreen.request(this.player);
        this.setState({ isFullscreen: true });
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

  // The metadata has loaded or changed, indicating a change in
  // duration of the media
  handleDurationChange = (event: SyntheticEvent<HTMLVideoElement>) => {
    const { onDurationChange } = this.props;
    this.setState({ duration: (this.video && this.video.duration) || 0 });

    if (onDurationChange) {
      onDurationChange({ event });
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
    const { autoPlay, controls, loop, poster, preload, src } = this.props;
    const { currentTime, duration, isFullscreen, muted, paused } = this.state;
    return (
      <div ref={this.setPlayerRef} style={{ position: 'relative' }}>
        {/* eslint-disable jsx-a11y/media-has-caption */}
        <video
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          poster={poster}
          preload={preload}
          ref={this.setVideoRef}
          style={{ width: '100%' }}
          onDurationChange={this.handleDurationChange}
          onPlaying={this.handlePlay}
          onPause={this.handlePause}
          onTimeUpdate={this.handleTimeUpdate}
          onVolumeChange={this.handleVolumeChange}
        >
          {src && <source src={src} type="video/mp4" />}
        </video>
        {/* eslint-enable jsx-a11y/media-has-caption */}
        {controls && (
          <VideoControls
            currentTime={currentTime}
            duration={duration}
            fullscreen={isFullscreen}
            muted={muted}
            paused={paused}
            toggleFullscreen={this.toggleFullscreen}
            toggleMute={this.toggleMute}
            togglePlay={this.togglePlay}
          />
        )}
      </div>
    );
  }
}

Video.propTypes = {
  autoPlay: PropTypes.bool,
  controls: PropTypes.bool,
  loop: PropTypes.bool,
  muted: PropTypes.bool,
  onDurationChange: PropTypes.func,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onTimeUpdate: PropTypes.func,
  onVolumeChange: PropTypes.func,
  poster: PropTypes.string,
  preload: PropTypes.oneOf(['auto', 'metadata', 'none']),
  src: PropTypes.string,
};
