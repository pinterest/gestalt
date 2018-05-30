// @flow
import React from 'react';
import { create } from 'react-test-renderer';
import VideoControls from '../VideoControls';

test('VideoControls for single digit seconds', () => {
  const tree = create(
    <VideoControls
      accessibilityMaximizeLabel="Maximize"
      accessibilityMinimizeLabel="Minimize"
      accessibilityMuteLabel="Mute"
      accessibilityPauseLabel="Pause"
      accessibilityPlayLabel="Play"
      accessibilityUnmuteLabel="Unmute"
      currentTime={5}
      duration={5}
      fullscreen={false}
      onFullscreenChange={() => {}}
      onPause={() => {}}
      onPlay={() => {}}
      onVolumeChange={() => {}}
      playing={false}
      seek={() => {}}
      volume={0}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('VideoControls for double digit seconds', () => {
  const tree = create(
    <VideoControls
      accessibilityMaximizeLabel="Maximize"
      accessibilityMinimizeLabel="Minimize"
      accessibilityMuteLabel="Mute"
      accessibilityPauseLabel="Pause"
      accessibilityPlayLabel="Play"
      accessibilityUnmuteLabel="Unmute"
      currentTime={15}
      duration={15}
      fullscreen={false}
      onFullscreenChange={() => {}}
      onPause={() => {}}
      onPlay={() => {}}
      onVolumeChange={() => {}}
      playing={false}
      seek={() => {}}
      volume={0}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('VideoControls for single digit minutes', () => {
  const tree = create(
    <VideoControls
      accessibilityMaximizeLabel="Maximize"
      accessibilityMinimizeLabel="Minimize"
      accessibilityMuteLabel="Mute"
      accessibilityPauseLabel="Pause"
      accessibilityPlayLabel="Play"
      accessibilityUnmuteLabel="Unmute"
      currentTime={65}
      duration={65}
      fullscreen={false}
      onFullscreenChange={() => {}}
      onPause={() => {}}
      onPlay={() => {}}
      onVolumeChange={() => {}}
      playing={false}
      seek={() => {}}
      volume={0}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('VideoControls for double digit minutes', () => {
  const tree = create(
    <VideoControls
      accessibilityMaximizeLabel="Maximize"
      accessibilityMinimizeLabel="Minimize"
      accessibilityMuteLabel="Mute"
      accessibilityPauseLabel="Pause"
      accessibilityPlayLabel="Play"
      accessibilityUnmuteLabel="Unmute"
      currentTime={905}
      duration={905}
      fullscreen={false}
      onFullscreenChange={() => {}}
      onPause={() => {}}
      onPlay={() => {}}
      onVolumeChange={() => {}}
      playing={false}
      seek={() => {}}
      volume={0}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('VideoControls rounds for partial seconds', () => {
  const tree = create(
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
      onVolumeChange={() => {}}
      playing={false}
      seek={() => {}}
      volume={0}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
