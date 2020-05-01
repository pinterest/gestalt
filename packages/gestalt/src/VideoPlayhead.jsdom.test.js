// @flow strict
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import VideoPlayhead from './VideoPlayhead.js';

test('VideoPlayhead handles on mouse down and up events', () => {
  const mockOnPlayheadDown = jest.fn();
  const mockOnPlayheadUp = jest.fn();
  const { getByRole } = render(
    <VideoPlayhead
      currentTime={50}
      duration={100}
      seek={() => {}}
      onPlayheadDown={mockOnPlayheadDown}
      onPlayheadUp={mockOnPlayheadUp}
    />
  );

  fireEvent.mouseDown(getByRole('progressbar'), {
    clientX: 0,
    preventDefault: jest.fn(),
  });
  expect(mockOnPlayheadDown).toHaveBeenCalledTimes(1);
  expect(mockOnPlayheadUp).toHaveBeenCalledTimes(0);

  fireEvent.mouseUp(getByRole('progressbar'), { clientX: 0 });
  expect(mockOnPlayheadDown).toHaveBeenCalledTimes(1);
  expect(mockOnPlayheadUp).toHaveBeenCalledTimes(1);
});

test('VideoPlayhead ends seek when mouse leaves', () => {
  const mockOnPlayheadDown = jest.fn();
  const mockOnPlayheadUp = jest.fn();
  const { getByRole } = render(
    <VideoPlayhead
      currentTime={50}
      duration={100}
      seek={() => {}}
      onPlayheadDown={mockOnPlayheadDown}
      onPlayheadUp={mockOnPlayheadUp}
    />
  );
  fireEvent.mouseDown(getByRole('progressbar'), {
    preventDefault: jest.fn(),
  });
  expect(mockOnPlayheadDown).toHaveBeenCalledTimes(1);
  expect(mockOnPlayheadUp).toHaveBeenCalledTimes(0);

  fireEvent.mouseLeave(getByRole('progressbar'), {
    preventDefault: jest.fn(),
  });
  expect(mockOnPlayheadDown).toHaveBeenCalledTimes(1);
  expect(mockOnPlayheadUp).toHaveBeenCalledTimes(1);
});
