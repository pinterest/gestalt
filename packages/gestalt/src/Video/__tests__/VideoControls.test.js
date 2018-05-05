/* eslint-env jest */
import React from 'react';
import { create } from 'react-test-renderer';
import VideoControls, { timeToString } from '../VideoControls';

test('Video controls show correct icons', () => {
  const tree = create(
    <VideoControls
      accessibilityMaximizeLabel="Maximize"
      accessibilityMinimizeLabel="Minimize"
      accessibilityMuteLabel="Mute"
      accessibilityPauseLabel="Pause"
      accessibilityPlayLabel="Play"
      accessibilityUnmuteLabel="Unmute"
      currentTime={0}
      duration={10}
      fullscreen={false}
      muted={false}
      paused={false}
      seek={() => {}}
      toggleFullscreen={() => {}}
      toggleMute={() => {}}
      togglePlay={() => {}}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('timeToString for single digit seconds', () => {
  expect(timeToString(5)).toBe('00:05');
});

test('timeToString for double digit seconds', () => {
  expect(timeToString(15)).toBe('00:15');
});

test('timeToString for single digit minutes', () => {
  expect(timeToString(65)).toBe('01:05');
});

test('timeToString for double digit minutes', () => {
  expect(timeToString(905)).toBe('15:05');
});

test('timeToString rounds for partial seconds', () => {
  expect(timeToString(67.3)).toBe('01:07');
});
