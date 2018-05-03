// @flow

import * as React from 'react';
import Box from '../Box/Box';
import PropTypes from 'prop-types';

type Props = {|
  currentTime: number,
  duration: number,
|};

export default class VideoScrubber extends React.PureComponent<Props> {
  render() {
    const { currentTime, duration } = this.props;
    const scrubberWidth = `${Math.floor(currentTime * 10000 / duration) /
      100}%`;
    return (
      <Box position="relative" display="flex" flex="grow" alignItems="center">
        <Box
          left
          right
          position="absolute"
          color="lightGray"
          shape="rounded"
          height={4}
        />
        <Box
          left
          position="absolute"
          color="white"
          shape="rounded"
          height={4}
          width={scrubberWidth}
        />
        <Box
          position="absolute"
          shape="rounded"
          height={4}
          dangerouslySetInlineStyle={{ __style: { left: scrubberWidth } }}
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
      </Box>
    );
  }
}

VideoScrubber.propTypes = {
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
};
