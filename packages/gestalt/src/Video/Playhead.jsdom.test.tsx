import { fireEvent, render, screen } from '@testing-library/react';
import VideoPlayhead from './Playhead';

test('VideoPlayhead handles on mouse down and up events', () => {
  const mockOnPlayheadDown = jest.fn<
    [React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>],
// @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
    undefined
  >();
  const mockOnPlayheadUp = jest.fn<
    [React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>],
// @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
    undefined
  >();
  render(
    <VideoPlayhead
      accessibilityProgressBarLabel="Progress bar"
      currentTime={50}
      duration={100}
      onPlayheadDown={mockOnPlayheadDown}
      onPlayheadUp={mockOnPlayheadUp}
      seek={() => {}}
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
  const mockOnPlayheadDown = jest.fn<
    [React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>],
// @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
    undefined
  >();
  const mockOnPlayheadUp = jest.fn<
    [React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>],
// @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
    undefined
  >();
  render(
    <VideoPlayhead
      accessibilityProgressBarLabel="Progress bar"
      currentTime={50}
      duration={100}
      onPlayheadDown={mockOnPlayheadDown}
      onPlayheadUp={mockOnPlayheadUp}
      seek={() => {}}
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
