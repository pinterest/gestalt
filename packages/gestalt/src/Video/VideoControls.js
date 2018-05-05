// @flow

import * as React from 'react';
import Box from '../Box/Box';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';
import Touchable from '../Touchable/Touchable';
import VideoPlayhead from './VideoPlayhead';
import PropTypes from 'prop-types';

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
  muted: boolean,
  paused: boolean,
  seek: (time: number) => void,
  toggleFullscreen: () => void,
  toggleMute: () => void,
  togglePlay: () => void,
|};

export const timeToString = (time?: number) => {
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
    paused,
    muted,
    seek,
    toggleFullscreen,
    toggleMute,
    togglePlay,
  } = props;
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
        <Touchable onTouch={togglePlay} fullWidth={false}>
          <Icon
            accessibilityLabel={
              paused ? accessibilityPlayLabel : accessibilityPauseLabel
            }
            color="white"
            icon={paused ? 'play' : 'pause'}
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
        <Touchable onTouch={toggleMute} fullWidth={false}>
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
      <Box padding={2}>
        <Touchable onTouch={toggleFullscreen} fullWidth={false}>
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
  muted: PropTypes.bool.isRequired,
  paused: PropTypes.bool.isRequired,
  seek: PropTypes.func.isRequired,
  toggleFullscreen: PropTypes.func.isRequired,
  toggleMute: PropTypes.func.isRequired,
  togglePlay: PropTypes.func.isRequired,
};
