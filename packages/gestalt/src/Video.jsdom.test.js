// @flow strict
import React from 'react';
import { render } from '@testing-library/react';
import Video from './Video.js';

const A11Y_LABELS = Object.freeze({
  accessibilityMaximizeLabel: 'Maximize',
  accessibilityMinimizeLabel: 'Minimize',
  accessibilityMuteLabel: 'Mute',
  accessibilityPauseLabel: 'Pause',
  accessibilityPlayLabel: 'Play',
  accessibilityUnmuteLabel: 'Unmute',
});

describe('Video loading', () => {
  beforeEach(() => {
    window.HTMLMediaElement.prototype.load = () => {};
  });

  it('Does not load when string src does not change', () => {
    const props = {
      ...A11Y_LABELS,
      aspectRatio: 1,
      captions: 'https://media.w3.org/2010/05/sintel/captions.vtt',
      src: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
    };

    const { container, rerender } = render(<Video {...props} />);
    const spy = jest.spyOn(container.querySelector('video'), 'load');

    rerender(<Video {...props} volume={0} />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Does not load when array src does not change', () => {
    const props = {
      ...A11Y_LABELS,
      aspectRatio: 1,
      captions: 'https://media.w3.org/2010/05/sintel/captions.vtt',
      src: [
        {
          type: 'video/mp4',
          src: 'http://media.w3.org/2010/05/bunny/movie.mp4',
        },
      ],
    };

    const { container, rerender } = render(<Video {...props} />);
    const spy = jest.spyOn(container.querySelector('video'), 'load');

    rerender(<Video {...props} volume={0} />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Loads when string src changes to new string src', () => {
    const props = {
      ...A11Y_LABELS,
      aspectRatio: 1,
      captions: 'https://media.w3.org/2010/05/sintel/captions.vtt',
      src: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
    };

    const { container, rerender } = render(<Video {...props} />);
    const spy = jest.spyOn(container.querySelector('video'), 'load');

    rerender(
      <Video {...props} src="http://media.w3.org/2010/05/bunny/movie.mp4" />
    );
    expect(spy).toHaveBeenCalled();
  });

  it('Loads when string src changes to new array src', () => {
    const props = {
      ...A11Y_LABELS,
      aspectRatio: 1,
      captions: 'https://media.w3.org/2010/05/sintel/captions.vtt',
      src: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
    };

    const { container, rerender } = render(<Video {...props} />);
    const spy = jest.spyOn(container.querySelector('video'), 'load');

    rerender(
      <Video
        {...props}
        src={[
          {
            type: 'video/mp4',
            src: 'http://media.w3.org/2010/05/bunny/movie.mp4',
          },
        ]}
      />
    );
    expect(spy).toHaveBeenCalled();
  });

  it('Loads when array src changes to new string src', () => {
    const props = {
      ...A11Y_LABELS,
      aspectRatio: 1,
      captions: 'https://media.w3.org/2010/05/sintel/captions.vtt',
      src: [
        {
          type: 'video/mp4',
          src: 'http://media.w3.org/2010/05/bunny/movie.mp4',
        },
      ],
    };

    const { container, rerender } = render(<Video {...props} />);
    const spy = jest.spyOn(container.querySelector('video'), 'load');

    rerender(
      <Video
        {...props}
        src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
      />
    );
    expect(spy).toHaveBeenCalled();
  });

  it('Loads when array src changes to new array src', () => {
    const props = {
      ...A11Y_LABELS,
      aspectRatio: 1,
      captions: 'https://media.w3.org/2010/05/sintel/captions.vtt',
      src: [
        {
          type: 'video/mp4',
          src: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
        },
      ],
    };

    const { container, rerender } = render(<Video {...props} />);
    const spy = jest.spyOn(container.querySelector('video'), 'load');

    rerender(
      <Video
        {...props}
        src={[
          {
            type: 'video/mp4',
            src: 'http://media.w3.org/2010/05/bunny/movie.mp4',
          },
        ]}
      />
    );
    expect(spy).toHaveBeenCalled();
  });

  it('Loads when array src changes to new length array src', () => {
    const props = {
      ...A11Y_LABELS,
      aspectRatio: 1,
      captions: 'https://media.w3.org/2010/05/sintel/captions.vtt',
      src: [
        {
          type: 'video/mp4',
          src: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
        },
      ],
    };

    const { container, rerender } = render(<Video {...props} />);
    const spy = jest.spyOn(container.querySelector('video'), 'load');

    rerender(
      <Video
        {...props}
        src={[
          {
            type: 'video/mp4',
            src:
              'https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4',
          },
          {
            type: 'video/ogg',
            src: 'https://archive.org/download/ElephantsDream/ed_hd.ogv',
          },
        ]}
      />
    );
    expect(spy).toHaveBeenCalled();
  });
});
