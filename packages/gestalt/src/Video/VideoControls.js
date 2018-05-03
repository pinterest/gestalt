// @flow

import * as React from 'react';
import Box from '../Box/Box';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';
import Touchable from '../Touchable/Touchable';
import VideoScrubber from './VideoScrubber';
import PropTypes from 'prop-types';

type Props = {|
  currentTime: number,
  duration: number,
  fullscreen: boolean,
  muted: boolean,
  paused: boolean,
  toggleFullscreen: () => void,
  toggleMute: () => void,
  togglePlay: () => void,
|};

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
    currentTime,
    duration,
    fullscreen,
    paused,
    muted,
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
      width="100%"
      padding={2}
      display="flex"
      alignItems="center"
    >
      <Box padding={2}>
        <Touchable onTouch={togglePlay} fullWidth={false}>
          <Icon
            accessibilityLabel=""
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
        <VideoScrubber currentTime={currentTime} duration={duration} />
      </Box>
      <Box width={50} padding={2}>
        <Text color="white" align="right" size="xs">
          {timeToString(duration)}
        </Text>
      </Box>
      <Box padding={2}>
        <Touchable onTouch={toggleMute} fullWidth={false}>
          <Icon
            accessibilityLabel=""
            color="white"
            icon={muted ? 'mute' : 'sound'}
            size={20}
          />
        </Touchable>
      </Box>
      <Box padding={2}>
        <Touchable onTouch={toggleFullscreen} fullWidth={false}>
          <Icon
            accessibilityLabel=""
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
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  fullscreen: PropTypes.bool.isRequired,
  muted: PropTypes.bool.isRequired,
  paused: PropTypes.bool.isRequired,
  toggleFullscreen: PropTypes.func.isRequired,
  toggleMute: PropTypes.func.isRequired,
  togglePlay: PropTypes.func.isRequired,
};
