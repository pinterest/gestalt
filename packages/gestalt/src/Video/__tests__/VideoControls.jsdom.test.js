// @flow
import React from 'react';
import { mount } from 'enzyme';
import VideoControls from '../VideoControls';

test('VideoControls handles play events', () => {
  const mockOnPlay = jest.fn();
  const wrapper = mount(
    <VideoControls
      accessibilityMaximizeLabel="Maximize"
      accessibilityMinimizeLabel="Minimize"
      accessibilityMuteLabel="Mute"
      accessibilityPauseLabel="Pause"
      accessibilityPlayLabel="Play"
      accessibilityUnmuteLabel="Unmute"
      currentTime={67.3}
      duration={67.3}
      fullscreen={false}
      onFullscreenChange={() => {}}
      onPause={() => {}}
      onPlay={mockOnPlay}
      onVolumeChange={() => {}}
      playing={false}
      seek={() => {}}
      volume={0}
    />
  );
  wrapper.find('Icon[icon="play"]').simulate('click');
  expect(mockOnPlay).toBeCalled();
});

test('VideoControls handles pause events', () => {
  const mockOnPause = jest.fn();
  const wrapper = mount(
    <VideoControls
      accessibilityMaximizeLabel="Maximize"
      accessibilityMinimizeLabel="Minimize"
      accessibilityMuteLabel="Mute"
      accessibilityPauseLabel="Pause"
      accessibilityPlayLabel="Play"
      accessibilityUnmuteLabel="Unmute"
      currentTime={67.3}
      duration={67.3}
      fullscreen={false}
      onFullscreenChange={() => {}}
      onPause={mockOnPause}
      onPlay={() => {}}
      onVolumeChange={() => {}}
      playing
      seek={() => {}}
      volume={0}
    />
  );
  wrapper.find('Icon[icon="pause"]').simulate('click');
  expect(mockOnPause).toBeCalled();
});

test('VideoControls handles volume events', () => {
  const mockOnVolumeChange = jest.fn();
  const wrapper = mount(
    <VideoControls
      accessibilityMaximizeLabel="Maximize"
      accessibilityMinimizeLabel="Minimize"
      accessibilityMuteLabel="Mute"
      accessibilityPauseLabel="Pause"
      accessibilityPlayLabel="Play"
      accessibilityUnmuteLabel="Unmute"
      currentTime={67.3}
      duration={67.3}
      fullscreen={false}
      onFullscreenChange={() => {}}
      onPause={() => {}}
      onPlay={() => {}}
      onVolumeChange={mockOnVolumeChange}
      playing={false}
      seek={() => {}}
      volume={0}
    />
  );
  wrapper.find('Icon[icon="mute"]').simulate('click');
  expect(mockOnVolumeChange).toBeCalled();
});
