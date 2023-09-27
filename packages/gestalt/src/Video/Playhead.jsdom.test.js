// @flow strict
import { fireEvent, render, screen } from '@testing-library/react';
import VideoPlayhead from './Playhead.js';

test('VideoPlayhead handles on mouse down and up events', () => {
  const mockOnPlayheadDown = jest.fn<[SyntheticMouseEvent<HTMLDivElement>], void>();
  const mockOnPlayheadUp = jest.fn<[SyntheticMouseEvent<HTMLDivElement>], void>();
  render(
    <VideoPlayhead
      accessibilityProgressBarLabel="Progress bar"
      currentTime={50}
      duration={100}
      seek={() => {}}
      onPlayheadDown={mockOnPlayheadDown}
      onPlayheadUp={mockOnPlayheadUp}
    />,
  );

  fireEvent.mouseDown(screen.getByRole('progressbar'), {
    clientX: 0,
    preventDefault: jest.fn(),
  });
  expect(mockOnPlayheadDown).toHaveBeenCalledTimes(1);
  expect(mockOnPlayheadUp).toHaveBeenCalledTimes(0);

  fireEvent.mouseUp(screen.getByRole('progressbar'), { clientX: 0 });
  expect(mockOnPlayheadDown).toHaveBeenCalledTimes(1);
  expect(mockOnPlayheadUp).toHaveBeenCalledTimes(1);
});

test('VideoPlayhead ends seek when mouse leaves', () => {
  const mockOnPlayheadDown = jest.fn<[SyntheticMouseEvent<HTMLDivElement>], void>();
  const mockOnPlayheadUp = jest.fn<[SyntheticMouseEvent<HTMLDivElement>], void>();
  render(
    <VideoPlayhead
      accessibilityProgressBarLabel="Progress bar"
      currentTime={50}
      duration={100}
      seek={() => {}}
      onPlayheadDown={mockOnPlayheadDown}
      onPlayheadUp={mockOnPlayheadUp}
    />,
  );
  fireEvent.mouseDown(screen.getByRole('progressbar'), {
    preventDefault: jest.fn(),
  });
  expect(mockOnPlayheadDown).toHaveBeenCalledTimes(1);
  expect(mockOnPlayheadUp).toHaveBeenCalledTimes(0);

  fireEvent.mouseLeave(screen.getByRole('progressbar'), {
    preventDefault: jest.fn(),
  });
  expect(mockOnPlayheadDown).toHaveBeenCalledTimes(1);
  expect(mockOnPlayheadUp).toHaveBeenCalledTimes(1);
});
