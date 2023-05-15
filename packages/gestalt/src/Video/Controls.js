// @flow strict
import { type Node, useEffect, useState } from 'react';
import Box from '../Box.js';
import Icon from '../Icon.js';
import TapArea from '../TapArea.js';
import Text from '../Text.js';
import styles from '../Video.css';
import VideoPlayhead from './Playhead.js';

type Props = {|
  accessibilityHideCaptionsLabel: string,
  accessibilityShowCaptionsLabel: string,
  accessibilityMaximizeLabel: string,
  accessibilityMinimizeLabel: string,
  accessibilityMuteLabel: string,
  accessibilityPauseLabel: string,
  accessibilityPlayLabel: string,
  accessibilityProgressBarLabel: string,
  accessibilityUnmuteLabel: string,
  captionsButton: 'enabled' | 'disabled' | null,
  currentTime: number,
  duration: number,
  fullscreen: boolean,
  onCaptionsChange: (
    event: SyntheticEvent<HTMLDivElement> | SyntheticEvent<HTMLAnchorElement>,
  ) => void,
  onFullscreenChange: () => void,
  onPause: (event: SyntheticEvent<HTMLDivElement> | SyntheticEvent<HTMLAnchorElement>) => void,
  onPlay: (event: SyntheticEvent<HTMLDivElement> | SyntheticEvent<HTMLAnchorElement>) => void,
  onPlayheadDown: (event: SyntheticMouseEvent<HTMLDivElement>) => void,
  onPlayheadUp: (event: SyntheticMouseEvent<HTMLDivElement>) => void,
  onVolumeChange: (
    event: SyntheticEvent<HTMLDivElement> | SyntheticEvent<HTMLAnchorElement>,
  ) => void,
  playing: boolean,
  seek: (time: number) => void,
  volume: number,
|};

const timeToString = (time?: number) => {
  const rounded = Math.floor(time || 0);
  const minutes = Math.floor(rounded / 60);
  const seconds = rounded - minutes * 60;
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
  const secondsStr = seconds < 10 ? `0${seconds}` : seconds;
  return `${minutesStr}:${secondsStr}`;
};

function VideoControls({
  accessibilityHideCaptionsLabel,
  accessibilityShowCaptionsLabel,
  accessibilityMaximizeLabel,
  accessibilityMinimizeLabel,
  accessibilityMuteLabel,
  accessibilityPauseLabel,
  accessibilityPlayLabel,
  accessibilityProgressBarLabel,
  accessibilityUnmuteLabel,
  captionsButton,
  currentTime,
  duration,
  fullscreen,
  onCaptionsChange,
  onFullscreenChange,
  onPause,
  onPlay,
  onPlayheadDown,
  onPlayheadUp,
  onVolumeChange,
  playing,
  seek,
  volume,
}: Props): Node {
  const handleFullscreenChange = ({
    event,
  }: {|
    dangerouslyDisableOnNavigation: () => void,
    event:
      | SyntheticMouseEvent<HTMLDivElement>
      | SyntheticKeyboardEvent<HTMLDivElement>
      | SyntheticMouseEvent<HTMLAnchorElement>
      | SyntheticKeyboardEvent<HTMLAnchorElement>,
  |}) => {
    event.stopPropagation();
    onFullscreenChange();
  };

  const handlePlayingChange = ({
    event,
  }: {|
    dangerouslyDisableOnNavigation: () => void,
    event:
      | SyntheticMouseEvent<HTMLDivElement>
      | SyntheticKeyboardEvent<HTMLDivElement>
      | SyntheticMouseEvent<HTMLAnchorElement>
      | SyntheticKeyboardEvent<HTMLAnchorElement>,
  |}) => {
    if (playing) {
      onPause(event);
    } else {
      onPlay(event);
    }
  };

  const handleCaptionsChange = ({
    event,
  }: {|
    dangerouslyDisableOnNavigation: () => void,
    event:
      | SyntheticMouseEvent<HTMLDivElement>
      | SyntheticKeyboardEvent<HTMLDivElement>
      | SyntheticMouseEvent<HTMLAnchorElement>
      | SyntheticKeyboardEvent<HTMLAnchorElement>,
  |}) => {
    event.stopPropagation();
    onCaptionsChange(event);
  };

  const handleVolumeChange = ({
    event,
  }: {|
    dangerouslyDisableOnNavigation: () => void,
    event:
      | SyntheticMouseEvent<HTMLDivElement>
      | SyntheticKeyboardEvent<HTMLDivElement>
      | SyntheticMouseEvent<HTMLAnchorElement>
      | SyntheticKeyboardEvent<HTMLAnchorElement>,
  |}) => {
    onVolumeChange(event);
  };

  const muted = volume === 0;

  const [showFullscreenButton, setShowFullscreenButton] = useState<boolean>(false);

  useEffect(() => {
    setShowFullscreenButton(
      typeof document !== 'undefined' &&
        (!!document.fullscreenEnabled ||
          // $FlowExpectedError[prop-missing]
          !!document.webkitFullscreenEnabled ||
          // $FlowExpectedError[prop-missing]
          !!document.mozFullScreenEnabled ||
          // $FlowExpectedError[prop-missing]
          !!document.msFullscreenEnabled),
    );
  }, []);

  return (
    <div className={styles.controls}>
      <Box padding={2}>
        <TapArea onTap={handlePlayingChange} fullWidth={false}>
          <Icon
            accessibilityLabel={playing ? accessibilityPauseLabel : accessibilityPlayLabel}
            color="light"
            icon={playing ? 'pause' : 'play'}
            size={20}
          />
        </TapArea>
      </Box>
      {captionsButton && (
        <Box padding={2}>
          <TapArea onTap={handleCaptionsChange} fullWidth={false}>
            <Icon
              accessibilityLabel={
                captionsButton === 'enabled'
                  ? accessibilityHideCaptionsLabel
                  : accessibilityShowCaptionsLabel
              }
              color="light"
              icon="captions"
              size={20}
            />
            {captionsButton === 'enabled' && (
              <Box
                position="absolute"
                marginTop={1}
                color="light"
                width={20}
                height={2}
                rounding={4}
              />
            )}
          </TapArea>
        </Box>
      )}
      <Box width={50} padding={2}>
        <Text align="end" color="light" overflow="normal" size="100">
          {timeToString(currentTime)}
        </Text>
      </Box>
      <Box padding={2} flex="grow">
        <VideoPlayhead
          accessibilityProgressBarLabel={accessibilityProgressBarLabel}
          currentTime={currentTime}
          duration={duration}
          onPlayheadDown={onPlayheadDown}
          onPlayheadUp={onPlayheadUp}
          seek={seek}
        />
      </Box>
      <Box width={50} padding={2}>
        <Text align="end" color="light" overflow="normal" size="100">
          {timeToString(duration)}
        </Text>
      </Box>
      <Box padding={2}>
        <TapArea onTap={handleVolumeChange} fullWidth={false}>
          <Icon
            accessibilityLabel={muted ? accessibilityUnmuteLabel : accessibilityMuteLabel}
            color="light"
            icon={muted ? 'mute' : 'sound'}
            size={20}
          />
        </TapArea>
      </Box>
      {showFullscreenButton && (
        <Box padding={2}>
          <TapArea onTap={handleFullscreenChange} fullWidth={false}>
            <Icon
              accessibilityLabel={
                fullscreen ? accessibilityMinimizeLabel : accessibilityMaximizeLabel
              }
              color="light"
              icon={fullscreen ? 'minimize' : 'maximize'}
              size={20}
            />
          </TapArea>
        </Box>
      )}
    </div>
  );
}

export default VideoControls;
