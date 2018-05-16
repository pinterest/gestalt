// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '../Box/Box';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';
import Touchable from '../Touchable/Touchable';
import VideoPlayhead from './VideoPlayhead';

type Props = {|
  accessibilityMaximizeLabel: string,
  accessibilityMinimizeLabel: string,
  accessibilityMuteLabel: string,
  accessibilityPauseLabel: string,
  accessibilityPlayLabel: string,
  accessibilityUnmuteLabel: string,
  currentTime: number,
  duration: number,
  fullscreen: boolean,
  onFullscreenChange: () => void,
  onPause: () => void,
  onPlay: () => void,
  onVolumeChange: () => void,
  playing: boolean,
  seek: (time: number) => void,
  volume: number,
|};

const fullscreenEnabled = () =>
  // $FlowIssue - vendor prefix missing from Flow
  document.fullscreenEnabled ||
  // $FlowIssue - vendor prefix missing from Flow
  document.webkitFullscreenEnabled ||
  // $FlowIssue - vendor prefix missing from Flow
  document.mozFullScreenEnabled ||
  // $FlowIssue - vendor prefix missing from Flow
  document.msFullscreenEnabled;

const timeToString = (time?: number) => {
  const rounded = Math.floor(time || 0);
  const minutes = Math.floor(rounded / 60);
  const seconds = rounded - minutes * 60;
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
  const secondsStr = seconds < 10 ? `0${seconds}` : seconds;
  return `${minutesStr}:${secondsStr}`;
};

export default function VideoControls(props: Props) {
  const {
    accessibilityMaximizeLabel,
    accessibilityMinimizeLabel,
    accessibilityMuteLabel,
    accessibilityPauseLabel,
    accessibilityPlayLabel,
    accessibilityUnmuteLabel,
    currentTime,
    duration,
    fullscreen,
    onFullscreenChange,
    onPause,
    onPlay,
    onVolumeChange,
    playing,
    seek,
    volume,
  } = props;
  const muted = volume === 0;
  const showFullscreenButton =
    typeof document !== 'undefined' && !!fullscreenEnabled();
  return (
    <Box
      position="absolute"
      bottom
      left
      right
      column={12}
      padding={2}
      display="flex"
      alignItems="center"
    >
      <Box padding={2}>
        <Touchable onTouch={playing ? onPause : onPlay} fullWidth={false}>
          <Icon
            accessibilityLabel={
              playing ? accessibilityPauseLabel : accessibilityPlayLabel
            }
            color="white"
            icon={playing ? 'pause' : 'play'}
            size={20}
          />
        </Touchable>
      </Box>
      <Box width={50} padding={2}>
        <Text color="white" align="right" size="xs">
          {timeToString(currentTime)}
        </Text>
      </Box>
      <Box padding={2} flex="grow">
        <VideoPlayhead
          currentTime={currentTime}
          duration={duration}
          seek={seek}
        />
      </Box>
      <Box width={50} padding={2}>
        <Text color="white" align="right" size="xs">
          {timeToString(duration)}
        </Text>
      </Box>
      <Box padding={2}>
        <Touchable onTouch={onVolumeChange} fullWidth={false}>
          <Icon
            accessibilityLabel={
              muted ? accessibilityUnmuteLabel : accessibilityMuteLabel
            }
            color="white"
            icon={muted ? 'mute' : 'sound'}
            size={20}
          />
        </Touchable>
      </Box>
      {showFullscreenButton && (
        <Box padding={2}>
          <Touchable onTouch={onFullscreenChange} fullWidth={false}>
            <Icon
              accessibilityLabel={
                fullscreen
                  ? accessibilityMinimizeLabel
                  : accessibilityMaximizeLabel
              }
              color="white"
              icon={fullscreen ? 'minimize' : 'maximize'}
              size={20}
            />
          </Touchable>
        </Box>
      )}
    </Box>
  );
}

VideoControls.propTypes = {
  accessibilityMaximizeLabel: PropTypes.string.isRequired,
  accessibilityMinimizeLabel: PropTypes.string.isRequired,
  accessibilityMuteLabel: PropTypes.string.isRequired,
  accessibilityPauseLabel: PropTypes.string.isRequired,
  accessibilityPlayLabel: PropTypes.string.isRequired,
  accessibilityUnmuteLabel: PropTypes.string.isRequired,
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  fullscreen: PropTypes.bool.isRequired,
  onFullscreenChange: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired,
  onVolumeChange: PropTypes.func.isRequired,
  playing: PropTypes.bool.isRequired,
  seek: PropTypes.func.isRequired,
  volume: PropTypes.number.isRequired,
};
