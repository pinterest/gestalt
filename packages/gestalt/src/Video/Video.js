// @flow

import * as React from 'react';
import PropTypes from 'prop-types';

type Props = {|
  autoPlay?: boolean,
  loop?: boolean,
  muted?: boolean,
  poster?: string,
  preload: 'auto' | 'metadata' | 'none',
  src?: string,
|};

export default class Video extends React.PureComponent<Props> {
  static propTypes = {
    autoPlay: PropTypes.bool,
    loop: PropTypes.bool,
    muted: PropTypes.bool,
    poster: PropTypes.string,
    preload: PropTypes.oneOf(['auto', 'metadata', 'none']),
    src: PropTypes.string,
  };

  static defaultProps = {
    preload: 'auto',
  };

  setVideoRef = (ref: ?HTMLVideoElement) => {
    this.video = ref;
  };

  video: ?HTMLVideoElement;

  render() {
    const { autoPlay, loop, muted, poster, preload, src } = this.props;
    return (
      // eslint-disable-next-line jsx-a11y/media-has-caption
      <video
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        poster={poster}
        preload={preload}
        ref={this.setVideoRef}
      >
        {src && <source src={src} type="video/mp4" />}
      </video>
    );
  }
}
