/* eslint-env jest */
import React from 'react';
import { create } from 'react-test-renderer';
import VideoControls, { timeToString } from '../VideoControls';

describe('VideoControls', () => {
  it('Video controls show correct icons', () => {
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
});

describe('timeToString', () => {
  it('timeToString for single digit seconds', () => {
    expect(timeToString(5)).toBe('00:05');
  });

  it('timeToString for double digit seconds', () => {
    expect(timeToString(15)).toBe('00:15');
  });

  it('timeToString for single digit minutes', () => {
    expect(timeToString(65)).toBe('01:05');
  });

  it('timeToString for double digit minutes', () => {
    expect(timeToString(905)).toBe('15:05');
  });

  it('timeToString rounds for partial seconds', () => {
    expect(timeToString(67.3)).toBe('01:07');
  });
});
