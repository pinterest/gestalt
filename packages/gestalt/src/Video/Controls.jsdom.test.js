// @flow strict
import { fireEvent, render, screen } from '@testing-library/react';
import VideoControls from './Controls.js';

test('VideoControls handles play events', () => {
  const mockOnPlay = jest.fn<
    [SyntheticEvent<HTMLDivElement> | SyntheticEvent<HTMLAnchorElement>],
    void,
  >();
  render(
    <VideoControls
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
  fireEvent.click(screen.getByLabelText('Play'));
  expect(mockOnPlay).toHaveBeenCalled();
});

test('VideoControls handles pause events', () => {
  const mockOnPause = jest.fn<
    [SyntheticEvent<HTMLDivElement> | SyntheticEvent<HTMLAnchorElement>],
    void,
  >();
  render(
    <VideoControls
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
  fireEvent.click(screen.getByLabelText('Pause'));
  expect(mockOnPause).toHaveBeenCalled();
});

test('VideoControls handles volume events', () => {
  const mockOnVolumeChange = jest.fn<
    [SyntheticEvent<HTMLDivElement> | SyntheticEvent<HTMLAnchorElement>],
    void,
  >();
  render(
    <VideoControls
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
  fireEvent.click(screen.getByLabelText('Unmute'));
  expect(mockOnVolumeChange).toHaveBeenCalled();
});
