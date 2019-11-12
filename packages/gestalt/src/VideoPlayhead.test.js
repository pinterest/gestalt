// @flow
import React from 'react';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';
import VideoPlayhead from './VideoPlayhead.js';

test('VideoPlayhead', () => {
  const tree = create(
    <VideoPlayhead
      currentTime={50}
      duration={100}
      seek={() => {}}
      onPlayheadDown={() => {}}
      onPlayheadUp={() => {}}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('VideoPlayhead handles on mouse down and up events', () => {
  const mockOnPlayheadDown = jest.fn();
  const mockOnPlayheadUp = jest.fn();
  const wrapper = shallow(
    <VideoPlayhead
      currentTime={50}
      duration={100}
      seek={() => {}}
      onPlayheadDown={mockOnPlayheadDown}
      onPlayheadUp={mockOnPlayheadUp}
    />
  );
  wrapper
    .find('div[role="progressbar"]')
    .simulate('mousedown', { clientX: '0' });
  expect(mockOnPlayheadDown).toHaveBeenCalledTimes(1);
  expect(mockOnPlayheadUp).toHaveBeenCalledTimes(0);

  wrapper.find('div[role="progressbar"]').simulate('mouseup', { clientX: '0' });
  expect(mockOnPlayheadDown).toHaveBeenCalledTimes(1);
  expect(mockOnPlayheadUp).toHaveBeenCalledTimes(1);
});
