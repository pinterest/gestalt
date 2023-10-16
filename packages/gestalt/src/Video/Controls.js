// @flow strict
import { type Node, useEffect, useState } from 'react';
import VideoPlayhead from './Playhead.js';
import Box from '../Box.js';
import { useDefaultLabelContext } from '../contexts/DefaultLabelProvider.js';
import Icon from '../Icon.js';
import TapArea from '../TapArea.js';
import Text from '../Text.js';
import styles from '../Video.css';

type Props = {
  captionsButton: 'enabled' | 'disabled' | null,
  currentTime: number,
  duration: number,
  fullscreen: boolean,
  onCaptionsChange: (event: SyntheticEvent<HTMLDivElement>) => void,
  onFullscreenChange: () => void,
  onPause: (event: SyntheticEvent<HTMLDivElement>) => void,
  onPlay: (event: SyntheticEvent<HTMLDivElement>) => void,
  onPlayheadDown: (event: SyntheticMouseEvent<HTMLDivElement>) => void,
  onPlayheadUp: (event: SyntheticMouseEvent<HTMLDivElement>) => void,
  onVolumeChange: (event: SyntheticEvent<HTMLDivElement>) => void,
  playing: boolean,
  seek: (time: number) => void,
  volume: number,
};

const timeToString = (time?: number) => {
  const rounded = Math.floor(time || 0);
  const minutes = Math.floor(rounded / 60);
  const seconds = rounded - minutes * 60;
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
  const secondsStr = seconds < 10 ? `0${seconds}` : seconds;
  return `${minutesStr}:${secondsStr}`;
};

function VideoControls({
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
  }: {
    event: SyntheticMouseEvent<HTMLDivElement> | SyntheticKeyboardEvent<HTMLDivElement>,
  }) => {
    event.stopPropagation();
    onFullscreenChange();
  };

  const handlePlayingChange = ({
    event,
  }: {
    event: SyntheticMouseEvent<HTMLDivElement> | SyntheticKeyboardEvent<HTMLDivElement>,
  }) => {
    if (playing) {
      onPause(event);
    } else {
      onPlay(event);
    }
  };

  const handleCaptionsChange = ({
    event,
  }: {
    event: SyntheticMouseEvent<HTMLDivElement> | SyntheticKeyboardEvent<HTMLDivElement>,
  }) => {
    event.stopPropagation();
    onCaptionsChange(event);
  };

  const handleVolumeChange = ({
    event,
  }: {
    event: SyntheticMouseEvent<HTMLDivElement> | SyntheticKeyboardEvent<HTMLDivElement>,
  }) => {
    onVolumeChange(event);
  };

  const muted = volume === 0;

  const [showFullscreenButton, setShowFullscreenButton] = useState<boolean>(false);

  const {
    accessibilityHideCaptionsLabel: defaultAccessibilityHideCaptionsLabel,
    accessibilityShowCaptionsLabel: defaultAccessibilityShowCaptionsLabel,
    accessibilityMaximizeLabel: defaultAccessibilityMaximizeLabel,
    accessibilityMinimizeLabel: defaultAccessibilityMinimizeLabel,
    accessibilityMuteLabel: defaultAccessibilityMuteLabel,
    accessibilityPauseLabel: defaultAccessibilityPauseLabel,
    accessibilityPlayLabel: defaultAccessibilityPlayLabel,
    accessibilityProgressLabel: defaultAccessibilityProgressLabel,
    accessibilityUnmuteLabel: defaultAccessibilityUnmuteLabel,
  } = useDefaultLabelContext('Video');

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
            accessibilityLabel={
              playing ? defaultAccessibilityPauseLabel : defaultAccessibilityPlayLabel
            }
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
                  ? defaultAccessibilityHideCaptionsLabel
                  : defaultAccessibilityShowCaptionsLabel
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
          accessibilityProgressBarLabel={defaultAccessibilityProgressLabel}
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
            accessibilityLabel={
              muted ? defaultAccessibilityUnmuteLabel : defaultAccessibilityMuteLabel
            }
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
                fullscreen ? defaultAccessibilityMinimizeLabel : defaultAccessibilityMaximizeLabel
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
