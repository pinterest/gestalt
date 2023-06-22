// @flow strict
import { fireEvent, render } from '@testing-library/react';
import VideoPlayhead from './Playhead.js';

test('VideoPlayhead handles on mouse down and up events', () => {
  const mockOnPlayheadDown = jest.fn<[SyntheticMouseEvent<HTMLDivElement>], void>();
  const mockOnPlayheadUp = jest.fn<[SyntheticMouseEvent<HTMLDivElement>], void>();
  const { getByRole } = render(
    <VideoPlayhead
      accessibilityProgressBarLabel="Progress bar"
      currentTime={50}
      duration={100}
      seek={() => {}}
      onPlayheadDown={mockOnPlayheadDown}
      onPlayheadUp={mockOnPlayheadUp}
    />,
  );

  // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
  fireEvent.mouseDown(getByRole('progressbar'), {
    clientX: 0,
    preventDefault: jest.fn(),
  });
  expect(mockOnPlayheadDown).toHaveBeenCalledTimes(1);
  expect(mockOnPlayheadUp).toHaveBeenCalledTimes(0);

  // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
  fireEvent.mouseUp(getByRole('progressbar'), { clientX: 0 });
  expect(mockOnPlayheadDown).toHaveBeenCalledTimes(1);
  expect(mockOnPlayheadUp).toHaveBeenCalledTimes(1);
});

test('VideoPlayhead ends seek when mouse leaves', () => {
  const mockOnPlayheadDown = jest.fn<[SyntheticMouseEvent<HTMLDivElement>], void>();
  const mockOnPlayheadUp = jest.fn<[SyntheticMouseEvent<HTMLDivElement>], void>();
  const { getByRole } = render(
    <VideoPlayhead
      accessibilityProgressBarLabel="Progress bar"
      currentTime={50}
      duration={100}
      seek={() => {}}
      onPlayheadDown={mockOnPlayheadDown}
      onPlayheadUp={mockOnPlayheadUp}
    />,
  );
  // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
  fireEvent.mouseDown(getByRole('progressbar'), {
    preventDefault: jest.fn(),
  });
  expect(mockOnPlayheadDown).toHaveBeenCalledTimes(1);
  expect(mockOnPlayheadUp).toHaveBeenCalledTimes(0);

  // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
  fireEvent.mouseLeave(getByRole('progressbar'), {
    preventDefault: jest.fn(),
  });
  expect(mockOnPlayheadDown).toHaveBeenCalledTimes(1);
  expect(mockOnPlayheadUp).toHaveBeenCalledTimes(1);
});
