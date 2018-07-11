// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from './Box.js';
import Icon from './Icon.js';
import GroupAvatar from './GroupAvatar.js';

type AvatarProps = {|
  name: string,
  outline?: boolean,
  size?: 'sm' | 'md' | 'lg',
  src?: string,
  verified?: boolean,
|};

const sizes = {
  sm: 24,
  md: 40,
  lg: 72,
};

export default class Avatar extends React.PureComponent<AvatarProps> {
  static propTypes = {
    name: PropTypes.string.isRequired,
    outline: PropTypes.bool,
    src: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    verified: PropTypes.bool,
  };

  render() {
    const { name, outline, size, src, verified } = this.props;
    const width = size ? sizes[size] : '100%';
    const height = size ? sizes[size] : '';
    return (
      <Box
        color="white"
        {...(outline
          ? {
              dangerouslySetInlineStyle: {
                __style: {
                  boxShadow: '0 0 0 2px #fff',
                },
              },
            }
          : {})}
        width={width}
        height={height}
        position="relative"
        shape="circle"
      >
        <GroupAvatar collaborators={[{ name, src }]} />
        {verified && (
          <Box
            position="absolute"
            width="20%"
            height="20%"
            minWidth={8}
            minHeight={8}
            dangerouslySetInlineStyle={{
              __style: {
                bottom: '4%',
                right: '4%',
              },
            }}
          >
            <Box
              color="white"
              width="100%"
              height="100%"
              shape="circle"
              dangerouslySetInlineStyle={{
                __style: {
                  boxShadow: '0 0 0 2px #fff',
                },
              }}
            >
              <Icon
                color="red"
                icon="check-circle"
                accessibilityLabel=""
                size="100%"
              />
            </Box>
          </Box>
        )}
      </Box>
    );
  }
}
