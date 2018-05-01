// @flow

import * as React from 'react';
import Box from '../Box/Box';
import Icon from '../Icon/Icon';
import Touchable from '../Touchable/Touchable';
import PropTypes from 'prop-types';

type Props = {|
  autoPlay?: boolean,
  controls?: boolean,
  loop?: boolean,
  muted?: boolean,
  onPlay?: ({ event: SyntheticEvent<HTMLVideoElement> }) => void,
  onPause?: ({ event: SyntheticEvent<HTMLVideoElement> }) => void,
  onVolumeChange?: ({ event: SyntheticEvent<HTMLVideoElement> }) => void,
  poster?: string,
  preload: 'auto' | 'metadata' | 'none',
  src?: string,
|};

type State = {|
  paused: boolean,
  muted: boolean,
|};

export default class Video extends React.PureComponent<Props, State> {
  static defaultProps = {
    preload: 'auto',
  };

  state = {
    paused: true,
    muted: this.props.muted || false,
  };

  setVideoRef = (ref: ?HTMLVideoElement) => {
    this.video = ref;
  };

  video: ?HTMLVideoElement;

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

  // Fires whenever the media has been started
  handlePlay = (event: SyntheticEvent<HTMLVideoElement>) => {
    const { onPlay } = this.props;
    this.setState({ paused: false });

    if (onPlay) {
      onPlay({ event });
    }
  };

  // Fires whenever the media has been paused
  handlePause = (event: SyntheticEvent<HTMLVideoElement>) => {
    const { onPause } = this.props;
    this.setState({ paused: true });

    if (onPause) {
      onPause({ event });
    }
  };

  // Fires when the volume has been changed
  handleVolumeChange = (event: SyntheticEvent<HTMLVideoElement>) => {
    const { onVolumeChange } = this.props;
    this.setState({ muted: Boolean(this.video && this.video.muted) });

    if (onVolumeChange) {
      onVolumeChange({ event });
    }
  };

  render() {
    const { autoPlay, controls, loop, poster, preload, src } = this.props;
    const { muted, paused } = this.state;
    return (
      <Box position="relative">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          poster={poster}
          preload={preload}
          ref={this.setVideoRef}
          style={{ width: '100%' }}
          onPlay={this.handlePlay}
          onPause={this.handlePause}
          onVolumeChange={this.handleVolumeChange}
        >
          {src && <source src={src} type="video/mp4" />}
        </video>
        {controls && (
          <Box
            position="absolute"
            bottom
            left
            width="100%"
            padding={4}
            display="flex"
            alignItems="center"
          >
            <Touchable onTouch={this.togglePlay} fullWidth={false}>
              <Icon
                accessibilityLabel="Play"
                color="white"
                icon={paused ? 'play' : 'pause'}
                size={20}
              />
            </Touchable>
            <Touchable onTouch={this.toggleMute} fullWidth={false}>
              <Icon
                accessibilityLabel="Mute"
                color="white"
                icon={muted ? 'mute' : 'sound'}
                size={20}
              />
            </Touchable>
            <Touchable fullWidth={false}>
              <Icon
                accessibilityLabel="Fullscreen"
                color="white"
                icon="maximize"
                size={20}
              />
            </Touchable>
          </Box>
        )}
      </Box>
    );
  }
}

Video.propTypes = {
  autoPlay: PropTypes.bool,
  controls: PropTypes.bool,
  loop: PropTypes.bool,
  muted: PropTypes.bool,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onVolumeChange: PropTypes.func,
  poster: PropTypes.string,
  preload: PropTypes.oneOf(['auto', 'metadata', 'none']),
  src: PropTypes.string,
};
