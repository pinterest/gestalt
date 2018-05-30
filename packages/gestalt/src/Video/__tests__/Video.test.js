// @flow
import React from 'react';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';
import Video from '../Video';

test('Video with source', () => {
  const tree = create(
    <Video
      aspectRatio={1}
      captions="https://media.w3.org/2010/05/sintel/captions.vtt"
      src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Video with multiple sources', () => {
  const tree = create(
    <Video
      aspectRatio={1}
      captions="https://media.w3.org/2010/05/sintel/captions.vtt"
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
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Video with media attributes', () => {
  const tree = create(
    <Video
      aspectRatio={1}
      captions="https://media.w3.org/2010/05/sintel/captions.vtt"
      loop
      volume={0}
      preload="metadata"
      src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Video with callbacks', () => {
  const tree = create(
    <Video
      aspectRatio={1}
      captions="https://media.w3.org/2010/05/sintel/captions.vtt"
      onDurationChange={() => {}}
      onEnded={() => {}}
      onFullscreenChange={() => {}}
      onLoadedChange={() => {}}
      onPause={() => {}}
      onPlay={() => {}}
      onReady={() => {}}
      onSeek={() => {}}
      onTimeChange={() => {}}
      onVolumeChange={() => {}}
      src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

describe('Video loading', () => {
  it('Does not load when string src does not change', () => {
    const wrapper = shallow(
      <Video
        aspectRatio={1}
        captions="https://media.w3.org/2010/05/sintel/captions.vtt"
        src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
      />
    );
    const spy = jest.spyOn(wrapper.instance(), 'load');
    wrapper.setProps({ volume: 0 });
    expect(spy).not.toHaveBeenCalled();
  });

  it('Does not load when array src does not change', () => {
    const wrapper = shallow(
      <Video
        aspectRatio={1}
        captions="https://media.w3.org/2010/05/sintel/captions.vtt"
        src={[
          {
            type: 'video/mp4',
            src: 'http://media.w3.org/2010/05/bunny/movie.mp4',
          },
        ]}
      />
    );
    const spy = jest.spyOn(wrapper.instance(), 'load');
    wrapper.setProps({ volume: 0 });
    expect(spy).not.toHaveBeenCalled();
  });

  it('Loads when string src changes to new string src', () => {
    const wrapper = shallow(
      <Video
        aspectRatio={1}
        captions="https://media.w3.org/2010/05/sintel/captions.vtt"
        src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
      />
    );
    const spy = jest.spyOn(wrapper.instance(), 'load');
    wrapper.setProps({ src: 'http://media.w3.org/2010/05/bunny/movie.mp4' });
    expect(spy).toHaveBeenCalled();
  });

  it('Loads when string src changes to new array src', () => {
    const wrapper = shallow(
      <Video
        aspectRatio={1}
        captions="https://media.w3.org/2010/05/sintel/captions.vtt"
        src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
      />
    );
    const spy = jest.spyOn(wrapper.instance(), 'load');
    wrapper.setProps({
      src: [
        {
          type: 'video/mp4',
          src: 'http://media.w3.org/2010/05/bunny/movie.mp4',
        },
      ],
    });
    expect(spy).toHaveBeenCalled();
  });

  it('Loads when array src changes to new string src', () => {
    const wrapper = shallow(
      <Video
        aspectRatio={1}
        captions="https://media.w3.org/2010/05/sintel/captions.vtt"
        src={[
          {
            type: 'video/mp4',
            src: 'http://media.w3.org/2010/05/bunny/movie.mp4',
          },
        ]}
      />
    );
    const spy = jest.spyOn(wrapper.instance(), 'load');
    wrapper.setProps({
      src: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
    });
    expect(spy).toHaveBeenCalled();
  });

  it('Loads when array src changes to new array src', () => {
    const wrapper = shallow(
      <Video
        aspectRatio={1}
        captions="https://media.w3.org/2010/05/sintel/captions.vtt"
        src={[
          {
            type: 'video/mp4',
            src: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
          },
        ]}
      />
    );
    const spy = jest.spyOn(wrapper.instance(), 'load');
    wrapper.setProps({
      src: [
        {
          type: 'video/mp4',
          src: 'http://media.w3.org/2010/05/bunny/movie.mp4',
        },
      ],
    });
    expect(spy).toHaveBeenCalled();
  });

  it('Loads when array src changes to new length array src', () => {
    const wrapper = shallow(
      <Video
        aspectRatio={1}
        captions="https://media.w3.org/2010/05/sintel/captions.vtt"
        src={[
          {
            type: 'video/mp4',
            src: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
          },
        ]}
      />
    );
    const spy = jest.spyOn(wrapper.instance(), 'load');
    wrapper.setProps({
      src: [
        {
          type: 'video/mp4',
          src: 'https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4',
        },
        {
          type: 'video/ogg',
          src: 'https://archive.org/download/ElephantsDream/ed_hd.ogv',
        },
      ],
    });
    expect(spy).toHaveBeenCalled();
  });
});
