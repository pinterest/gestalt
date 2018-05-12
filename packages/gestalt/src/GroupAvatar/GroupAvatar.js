// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import styles from './GroupAvatar.css';
import Box from '../Box/Box';
import Text from '../Text/Text';
import Image from '../Image/Image';
import Collection from '../Collection/Collection';

const BORDER_WIDTH = 2;

const AVATAR_SIZES = {
  sm: 24,
  md: 40,
  lg: 72,
};

const DEFAULT_AVATAR_TEXT_SIZES = {
  sm: 7,
  md: 11,
  lg: 21,
};

type Props = {|
  collaborators: Array<{|
    name: string,
    src?: string,
  |}>,
  outline?: boolean,
  size: 'sm' | 'md' | 'lg',
|};

const avatarLayout = (n, size) => {
  switch (n) {
    case 0:
    case 1:
      return [{ top: 0, left: 0, width: size, height: size }];
    case 2:
      return [
        {
          top: 0,
          left: 0,
          width: size / 2 - BORDER_WIDTH / 2,
          height: size,
        },
        {
          top: 0,
          left: size / 2 + BORDER_WIDTH / 2,
          width: size / 2 - BORDER_WIDTH / 2,
          height: size,
        },
      ];
    default:
      return [
        {
          top: 0,
          left: 0,
          width: size / 2 - BORDER_WIDTH / 2,
          height: size,
        },
        {
          top: 0,
          left: size / 2 + BORDER_WIDTH / 2,
          width: size / 2,
          height: size / 2 - BORDER_WIDTH / 2,
        },
        {
          top: size / 2 + BORDER_WIDTH / 2,
          left: size / 2 + BORDER_WIDTH / 2,
          width: size / 2,
          height: size / 2 - BORDER_WIDTH / 2,
        },
      ];
  }
};

const degToRad = deg => deg * (Math.PI / 180);

const DefaultAvatar = (props: {
  height: number,
  name: string,
  textLayout: 'center' | 'topLeft' | 'bottomLeft',
  size: 'sm' | 'md' | 'lg',
  fontSize: number,
}) => {
  const { fontSize, height, name, textLayout } = props;
  const size = AVATAR_SIZES[props.size];

  const quarterPadding = Math.floor(
    (size / 2 - fontSize) / 2 * Math.sin(degToRad(45))
  );

  const initial = (
    <Text bold color="white">
      <Box
        dangerouslySetInlineStyle={{
          __style: {
            fontSize,
            lineHeight: `${fontSize}px`,
          },
        }}
      >
        {[...name][0].toUpperCase()}
      </Box>
    </Text>
  );

  switch (textLayout) {
    case 'bottomLeft':
      return (
        <Box
          aria-label={name}
          color="gray"
          height={height}
          display="flex"
          alignItems="end"
          dangerouslySetInlineStyle={{
            __style: {
              padding: quarterPadding,
            },
          }}
        >
          {initial}
        </Box>
      );
    case 'topLeft':
      return (
        <Box
          aria-label={name}
          color="gray"
          height={height}
          display="flex"
          alignItems="start"
          dangerouslySetInlineStyle={{
            __style: {
              padding: quarterPadding,
            },
          }}
        >
          {initial}
        </Box>
      );
    default:
      return (
        <Box
          aria-label={name}
          color="gray"
          height={height}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {initial}
        </Box>
      );
  }
};

export default function GroupAvatar(props: Props) {
  const { collaborators, outline, size } = props;
  const layout = avatarLayout(collaborators.length, AVATAR_SIZES[size]);
  const avatarSize = AVATAR_SIZES[size];
  return (
    <Box
      color="white"
      height={avatarSize}
      overflow="hidden"
      shape="circle"
      width={avatarSize}
      dangerouslySetInlineStyle={{
        __style: {
          ...(outline ? { boxShadow: '0 0 0 2px #fff' } : {}),
          // willChange: transform fixes a strange behavior where the border of the children
          // are not properly trimmed even though overflow: hidden is set
          willChange: 'transform',
        },
      }}
    >
      <Collection
        layout={layout}
        Item={({ idx }) => {
          const fontSize =
            collaborators.length <= 1
              ? DEFAULT_AVATAR_TEXT_SIZES[props.size] * 2
              : DEFAULT_AVATAR_TEXT_SIZES[props.size];

          if (!collaborators[idx]) {
            return (
              <DefaultAvatar
                name=" "
                fontSize={fontSize}
                textLayout="center"
                height={layout[0].height}
                size={size}
              />
            );
          }

          const { name, src } = collaborators[idx];
          const { width, height } = layout[idx];
          if (!src) {
            return (
              <DefaultAvatar
                name={name}
                fontSize={fontSize}
                textLayout={
                  collaborators.length >= 3
                    ? ['center', 'bottomLeft', 'topLeft'][idx]
                    : 'center'
                }
                height={height}
                size={size}
              />
            );
          }
          return (
            <Box position="relative" width={width} height={height}>
              <Image
                alt={name}
                color="#EFEFEF"
                src={src}
                naturalWidth={1}
                naturalHeight={1}
                fit="cover"
              />
              <div className={styles.wash} />
            </Box>
          );
        }}
      />
    </Box>
  );
}

GroupAvatar.propTypes = {
  collaborators: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string.isRequired,
      src: PropTypes.string,
    })
  ).isRequired,
  outline: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']).isRequired,
};
