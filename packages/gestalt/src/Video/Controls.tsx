import {ReactNode, useEffect, useState} from 'react';
import VideoPlayhead from './Playhead';
import Box from '../Box';
import { useDefaultLabelContext } from '../contexts/DefaultLabelProvider';
import Icon from '../Icon';
import TapArea from '../TapArea';
import Text from '../Text';
import styles from '../Video.css';

type Props = {
  captionsButton: "enabled" | "disabled" | null,
  currentTime: number,
  duration: number,
  fullscreen: boolean,
  onCaptionsChange: (event: React.SyntheticEvent<HTMLDivElement>) => void,
  onFullscreenChange: () => void,
  onPause: (event: React.SyntheticEvent<HTMLDivElement>) => void,
  onPlay: (event: React.SyntheticEvent<HTMLDivElement>) => void,
  onPlayheadDown: (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => void,
  onPlayheadUp: (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => void,
  onVolumeChange: (event: React.SyntheticEvent<HTMLDivElement>) => void,
  playing: boolean,
  seek: (time: number) => void,
  volume: number
};

const timeToString = (time?: number) => {
  const rounded = Math.floor(time || 0);
  const minutes = Math.floor(rounded / 60);
  const seconds = rounded - minutes * 60;
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
  const secondsStr = seconds < 10 ? `0${seconds}` : seconds;
  return `${minutesStr}:${secondsStr}`;
};

function VideoControls(
  {
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
  }: Props,
) {
  const handleFullscreenChange = ({
    event,
  }: {
    event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
  }) => {
    event.stopPropagation();
    onFullscreenChange();
  };

  const handlePlayingChange = ({
    event,
  }: {
    event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
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
    event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
  }) => {
    event.stopPropagation();
    onCaptionsChange(event);
  };

  const handleVolumeChange = ({
    event,
  }: {
    event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
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
          !!document.webkitFullscreenEnabled ||
          !!document.mozFullScreenEnabled ||
          !!document.msFullscreenEnabled),
    );
  }, []);

  return (
    <div className={styles.controls}>
      <Box padding={2}>
        <TapArea fullWidth={false} onTap={handlePlayingChange}>
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
          <TapArea fullWidth={false} onTap={handleCaptionsChange}>
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
                color="light"
                height={2}
                marginTop={1}
                position="absolute"
                rounding={4}
                width={20}
              />
            )}
          </TapArea>
        </Box>
      )}
      <Box padding={2} width={50}>
        <Text align="end" color="light" overflow="normal" size="100">
          {timeToString(currentTime)}
        </Text>
      </Box>
      <Box flex="grow" padding={2}>
        <VideoPlayhead
          accessibilityProgressBarLabel={defaultAccessibilityProgressLabel}
          currentTime={currentTime}
          duration={duration}
          onPlayheadDown={onPlayheadDown}
          onPlayheadUp={onPlayheadUp}
          seek={seek}
        />
      </Box>
      <Box padding={2} width={50}>
        <Text align="end" color="light" overflow="normal" size="100">
          {timeToString(duration)}
        </Text>
      </Box>
      <Box padding={2}>
        <TapArea fullWidth={false} onTap={handleVolumeChange}>
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
          <TapArea fullWidth={false} onTap={handleFullscreenChange}>
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
