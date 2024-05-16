import { fireEvent, render, screen } from '@testing-library/react';
import VideoControls from './Controls';

test('VideoControls handles play events', () => {
  const mockOnPlay = jest.fn<
    [React.SyntheticEvent<HTMLDivElement> | React.SyntheticEvent<HTMLAnchorElement>],
// @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
    undefined
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
    [React.SyntheticEvent<HTMLDivElement> | React.SyntheticEvent<HTMLAnchorElement>],
// @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
    undefined
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
    [React.SyntheticEvent<HTMLDivElement> | React.SyntheticEvent<HTMLAnchorElement>],
// @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
    undefined
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
