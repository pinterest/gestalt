// @flow strict
import { fireEvent, render } from '@testing-library/react';
import VideoControls from './VideoControls.js';

test('VideoControls handles play events', () => {
  const mockOnPlay = jest.fn();
  const { getByLabelText } = render(
    <VideoControls
      accessibilityHideCaptionsLabel="Hide captions"
      accessibilityShowCaptionsLabel="Show captions"
      accessibilityMaximizeLabel="Maximize"
      accessibilityMinimizeLabel="Minimize"
      accessibilityMuteLabel="Mute"
      accessibilityPauseLabel="Pause"
      accessibilityPlayLabel="Play"
      accessibilityUnmuteLabel="Unmute"
      captionsButton={null}
      currentTime={67.3}
      duration={67.3}
      fullscreen={false}
      onCaptionsChange={() => {}}
      onFullscreenChange={() => {}}
      onPause={() => {}}
      onPlay={mockOnPlay}
      onPlayheadDown={() => {}}
      onPlayheadUp={() => {}}
      onVolumeChange={() => {}}
      playing={false}
      seek={() => {}}
      volume={0}
    />,
  );
  fireEvent.click(getByLabelText('Play'));
  expect(mockOnPlay).toHaveBeenCalled();
});

test('VideoControls handles pause events', () => {
  const mockOnPause = jest.fn();
  const { getByLabelText } = render(
    <VideoControls
      accessibilityHideCaptionsLabel="Hide captions"
      accessibilityShowCaptionsLabel="Show captions"
      accessibilityMaximizeLabel="Maximize"
      accessibilityMinimizeLabel="Minimize"
      accessibilityMuteLabel="Mute"
      accessibilityPauseLabel="Pause"
      accessibilityPlayLabel="Play"
      accessibilityUnmuteLabel="Unmute"
      captionsButton={null}
      currentTime={67.3}
      duration={67.3}
      fullscreen={false}
      onCaptionsChange={() => {}}
      onFullscreenChange={() => {}}
      onPause={mockOnPause}
      onPlay={() => {}}
      onPlayheadDown={() => {}}
      onPlayheadUp={() => {}}
      onVolumeChange={() => {}}
      playing
      seek={() => {}}
      volume={0}
    />,
  );
  fireEvent.click(getByLabelText('Pause'));
  expect(mockOnPause).toHaveBeenCalled();
});

test('VideoControls handles volume events', () => {
  const mockOnVolumeChange = jest.fn();
  const { getByLabelText } = render(
    <VideoControls
      accessibilityHideCaptionsLabel="Hide captions"
      accessibilityShowCaptionsLabel="Show captions"
      accessibilityMaximizeLabel="Maximize"
      accessibilityMinimizeLabel="Minimize"
      accessibilityMuteLabel="Mute"
      accessibilityPauseLabel="Pause"
      accessibilityPlayLabel="Play"
      accessibilityUnmuteLabel="Unmute"
      captionsButton={null}
      currentTime={67.3}
      duration={67.3}
      fullscreen={false}
      onCaptionsChange={() => {}}
      onFullscreenChange={() => {}}
      onPause={() => {}}
      onPlay={() => {}}
      onPlayheadDown={() => {}}
      onPlayheadUp={() => {}}
      onVolumeChange={mockOnVolumeChange}
      playing={false}
      seek={() => {}}
      volume={0}
    />,
  );
  fireEvent.click(getByLabelText('Unmute'));
  expect(mockOnVolumeChange).toHaveBeenCalled();
});
