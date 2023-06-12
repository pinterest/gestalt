// @flow strict
import { render, screen } from '@testing-library/react';
import Video from './Video.js';

describe('Video loading', () => {
  beforeEach(() => {
    window.HTMLMediaElement.prototype.load = () => {};
  });

  it('Does not load when string src does not change', () => {
    const props = {
      onPlay: () => {},
      onPlayError: () => {},
      aspectRatio: 1,
      captions: 'https://media.w3.org/2010/05/sintel/captions.vtt',
      src: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
    };

    const { container, rerender } = render(<Video {...props} />);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access -- Please fix the next time this file is touched!
    const spy = jest.spyOn(container.querySelector('video'), 'load');

    rerender(<Video {...props} volume={0} />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Does not load when array src does not change', () => {
    const props = {
      onPlay: () => {},
      onPlayError: () => {},
      aspectRatio: 1,
      captions: 'https://media.w3.org/2010/05/sintel/captions.vtt',
      src: [
        {
          type: 'video/mp4',
          src: 'https://media.w3.org/2010/05/bunny/movie.mp4',
        },
      ],
    };

    const { container, rerender } = render(<Video {...props} />);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access -- Please fix the next time this file is touched!
    const spy = jest.spyOn(container.querySelector('video'), 'load');

    rerender(<Video {...props} volume={0} />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Loads when string src changes to new string src', () => {
    const props = {
      onPlay: () => {},
      onPlayError: () => {},
      aspectRatio: 1,
      captions: 'https://media.w3.org/2010/05/sintel/captions.vtt',
      src: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
    };

    const { container, rerender } = render(<Video {...props} />);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access -- Please fix the next time this file is touched!
    const spy = jest.spyOn(container.querySelector('video'), 'load');

    rerender(<Video {...props} src="https://media.w3.org/2010/05/bunny/movie.mp4" />);
    expect(spy).toHaveBeenCalled();
  });

  it('Loads when string src changes to new array src', () => {
    const props = {
      onPlay: () => {},
      onPlayError: () => {},
      aspectRatio: 1,
      captions: 'https://media.w3.org/2010/05/sintel/captions.vtt',
      src: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
    };

    const { container, rerender } = render(<Video {...props} />);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access -- Please fix the next time this file is touched!
    const spy = jest.spyOn(container.querySelector('video'), 'load');

    rerender(
      <Video
        {...props}
        src={[
          {
            type: 'video/mp4',
            src: 'https://media.w3.org/2010/05/bunny/movie.mp4',
          },
        ]}
      />,
    );
    expect(spy).toHaveBeenCalled();
  });

  it('Loads when array src changes to new string src', () => {
    const props = {
      onPlay: () => {},
      onPlayError: () => {},
      aspectRatio: 1,
      captions: 'https://media.w3.org/2010/05/sintel/captions.vtt',
      src: [
        {
          type: 'video/mp4',
          src: 'https://media.w3.org/2010/05/bunny/movie.mp4',
        },
      ],
    };

    const { container, rerender } = render(<Video {...props} />);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access -- Please fix the next time this file is touched!
    const spy = jest.spyOn(container.querySelector('video'), 'load');

    rerender(<Video {...props} src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />);
    expect(spy).toHaveBeenCalled();
  });

  it('Loads when array src changes to new array src', () => {
    const props = {
      onPlay: () => {},
      onPlayError: () => {},
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
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access -- Please fix the next time this file is touched!
    const spy = jest.spyOn(container.querySelector('video'), 'load');

    rerender(
      <Video
        {...props}
        src={[
          {
            type: 'video/mp4',
            src: 'https://media.w3.org/2010/05/bunny/movie.mp4',
          },
        ]}
      />,
    );
    expect(spy).toHaveBeenCalled();
  });

  it('Loads when array src changes to new length array src', () => {
    const props = {
      onPlay: () => {},
      onPlayError: () => {},
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
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access -- Please fix the next time this file is touched!
    const spy = jest.spyOn(container.querySelector('video'), 'load');

    rerender(
      <Video
        {...props}
        src={[
          {
            type: 'video/mp4',
            src: 'https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4',
          },
          {
            type: 'video/ogg',
            src: 'https://archive.org/download/ElephantsDream/ed_hd.ogv',
          },
        ]}
      />,
    );
    expect(spy).toHaveBeenCalled();
  });

  it('DisableRemotePlayback is set on <video />', () => {
    const props = {
      onPlay: () => {},
      onPlayError: () => {},
      aspectRatio: 1,
      captions: 'https://media.w3.org/2010/05/sintel/captions.vtt',
      src: [
        {
          type: 'video/mp4',
          src: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
        },
      ],
      disableRemotePlayback: true,
    };

    const { container } = render(<Video {...props} />);

    // $FlowFixMe[prop-missing] disableremoteplayback is not available on attributes
    expect(container.querySelector('video')?.attributes.disableremoteplayback).toBeDefined(); // eslint-disable-line testing-library/no-container, testing-library/no-node-access -- Please fix the next time this file is touched!
  });

  it('DisableRemotePlayback is not set on <video />', () => {
    const props = {
      onPlay: () => {},
      onPlayError: () => {},
      aspectRatio: 1,
      captions: 'https://media.w3.org/2010/05/sintel/captions.vtt',
      src: [
        {
          type: 'video/mp4',
          src: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
        },
      ],
      disableRemotePlayback: false,
    };

    const { container } = render(<Video {...props} />);
    // $FlowFixMe[prop-missing] disableremoteplayback is not available on attributes
    expect(container.querySelector('video')?.attributes.disableremoteplayback).toBeUndefined(); // eslint-disable-line testing-library/no-container, testing-library/no-node-access -- Please fix the next time this file is touched!
  });

  it('Progress bar label is set', () => {
    const props = {
      onPlay: () => {},
      onPlayError: () => {},
      aspectRatio: 1,
      captions: 'https://media.w3.org/2010/05/sintel/captions.vtt',
      controls: true,
      src: [
        {
          type: 'video/mp4',
          src: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
        },
      ],
    };

    render(<Video {...props} />);
    expect(screen.getByLabelText('Video progress')).toBeDefined();
  });
});
