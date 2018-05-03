// @flow

import * as React from 'react';
import Box from '../Box/Box';
import PropTypes from 'prop-types';
import styles from './Video.css';

type Props = {|
  currentTime: number,
  duration: number,
  seek: (time: number) => void,
|};

type State = {|
  seeking: boolean,
|};

export default class VideoPlayhead extends React.PureComponent<Props, State> {
  state = {
    seeking: false,
  };

  setPlayheadRef = (ref: ?HTMLDivElement) => {
    this.playhead = ref;
  };

  seek = (clientX: number) => {
    if (this.playhead) {
      const { duration, seek } = this.props;
      const { left, width } = this.playhead.getBoundingClientRect();
      const percent = Math.max(0, Math.min((clientX - left) / width, 1));
      const newTime = percent * duration;
      seek(newTime);
    }
  };

  handleMouseDown = (event: SyntheticMouseEvent<HTMLDivElement>) => {
    this.setState({ seeking: true });
    this.seek(event.clientX);
  };

  handleMouseMove = (event: SyntheticMouseEvent<HTMLDivElement>) => {
    const { seeking } = this.state;
    if (seeking) {
      this.seek(event.clientX);
    }
  };

  handleMouseUp = () => {
    this.setState({ seeking: false });
  };

  playhead: ?HTMLDivElement;

  render() {
    const { currentTime, duration } = this.props;
    const width = `${Math.floor(currentTime * 10000 / duration) / 100}%`;
    return (
      <Box
        position="relative"
        display="flex"
        flex="grow"
        alignItems="center"
        height={16}
      >
        <div
          role="presentation"
          ref={this.setPlayheadRef}
          className={styles.playhead}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
        >
          <Box
            left
            right
            position="absolute"
            color="lightGray"
            shape="rounded"
            height={4}
          >
            <Box color="white" shape="rounded" height="100%" width={width} />
          </Box>
          <Box
            position="absolute"
            shape="rounded"
            height={4}
            dangerouslySetInlineStyle={{ __style: { left: width } }}
          >
            <Box
              shape="circle"
              width={16}
              height={16}
              color="white"
              marginLeft={-2}
              dangerouslySetInlineStyle={{ __style: { marginTop: -6 } }}
            />
          </Box>
        </div>
      </Box>
    );
  }
}

VideoPlayhead.propTypes = {
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  seek: PropTypes.func.isRequired,
};
