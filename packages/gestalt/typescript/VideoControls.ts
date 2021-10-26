import type { Node } from "react";
import Box from "./Box";
import Icon from "./Icon";
import Text from "./Text";
import TapArea from "./TapArea";
import VideoPlayhead from "./VideoPlayhead";
import styles from "./Video.css";
type Props = {
  accessibilityHideCaptionsLabel: string;
  accessibilityShowCaptionsLabel: string;
  accessibilityMaximizeLabel: string;
  accessibilityMinimizeLabel: string;
  accessibilityMuteLabel: string;
  accessibilityPauseLabel: string;
  accessibilityPlayLabel: string;
  accessibilityUnmuteLabel: string;
  captionsButton: "enabled" | "disabled" | null;
  currentTime: number;
  duration: number;
  fullscreen: boolean;
  onCaptionsChange: (
    event:
      | React.SyntheticEvent<HTMLDivElement>
      | React.SyntheticEvent<HTMLAnchorElement>
  ) => void;
  onFullscreenChange: () => void;
  onPause: (
    event:
      | React.SyntheticEvent<HTMLDivElement>
      | React.SyntheticEvent<HTMLAnchorElement>
  ) => void;
  onPlay: (
    event:
      | React.SyntheticEvent<HTMLDivElement>
      | React.SyntheticEvent<HTMLAnchorElement>
  ) => void;
  onPlayheadDown: (event: React.MouseEvent<HTMLDivElement>) => void;
  onPlayheadUp: (event: React.MouseEvent<HTMLDivElement>) => void;
  onVolumeChange: (
    event:
      | React.SyntheticEvent<HTMLDivElement>
      | React.SyntheticEvent<HTMLAnchorElement>
  ) => void;
  playing: boolean;
  seek: (time: number) => void;
  volume: number;
};

const fullscreenEnabled = () =>
  document.fullscreenEnabled || // $FlowFixMe[prop-missing]
  document.webkitFullscreenEnabled || // $FlowFixMe[prop-missing]
  document.mozFullScreenEnabled || // $FlowFixMe[prop-missing]
  document.msFullscreenEnabled;

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
  const handleFullscreenChange = ({ event }) => {
    event.stopPropagation();
    onFullscreenChange();
  };

  const handlePlayingChange = ({ event }) => {
    if (playing) {
      onPause(event);
    } else {
      onPlay(event);
    }
  };

  const handleCaptionsChange = ({ event }) => {
    event.stopPropagation();
    onCaptionsChange(event);
  };

  const handleVolumeChange = ({ event }) => {
    onVolumeChange(event);
  };

  const muted = volume === 0;
  const showFullscreenButton =
    typeof document !== "undefined" && !!fullscreenEnabled();
  return (
    <div className={styles.controls}>
      <Box padding={2}>
        <TapArea onTap={handlePlayingChange} fullWidth={false}>
          <Icon
            accessibilityLabel={
              playing ? accessibilityPauseLabel : accessibilityPlayLabel
            }
            color="white"
            icon={playing ? "pause" : "play"}
            size={20}
          />
        </TapArea>
      </Box>
      {captionsButton && (
        <Box padding={2}>
          <TapArea onTap={handleCaptionsChange} fullWidth={false}>
            <Icon
              accessibilityLabel={
                captionsButton === "enabled"
                  ? accessibilityHideCaptionsLabel
                  : accessibilityShowCaptionsLabel
              }
              color="white"
              icon={captionsButton === "enabled" ? "speech-ellipsis" : "speech"}
              size={20}
            />
          </TapArea>
        </Box>
      )}
      <Box width={50} padding={2}>
        <Text align="end" color="white" overflow="normal" size="sm">
          {timeToString(currentTime)}
        </Text>
      </Box>
      <Box padding={2} flex="grow">
        <VideoPlayhead
          currentTime={currentTime}
          duration={duration}
          onPlayheadDown={onPlayheadDown}
          onPlayheadUp={onPlayheadUp}
          seek={seek}
        />
      </Box>
      <Box width={50} padding={2}>
        <Text align="end" color="white" overflow="normal" size="sm">
          {timeToString(duration)}
        </Text>
      </Box>
      <Box padding={2}>
        <TapArea onTap={handleVolumeChange} fullWidth={false}>
          <Icon
            accessibilityLabel={
              muted ? accessibilityUnmuteLabel : accessibilityMuteLabel
            }
            color="white"
            icon={muted ? "mute" : "sound"}
            size={20}
          />
        </TapArea>
      </Box>
      {showFullscreenButton && (
        <Box padding={2}>
          <TapArea onTap={handleFullscreenChange} fullWidth={false}>
            <Icon
              accessibilityLabel={
                fullscreen
                  ? accessibilityMinimizeLabel
                  : accessibilityMaximizeLabel
              }
              color="white"
              icon={fullscreen ? "minimize" : "maximize"}
              size={20}
            />
          </TapArea>
        </Box>
      )}
    </div>
  );
}

export default VideoControls;