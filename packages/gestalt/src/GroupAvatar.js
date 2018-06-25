// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import styles from './GroupAvatar.css';
import Box from './Box.js';
import Image from './Image.js';
import typography from './Typography.css';

function zip(a, b) {
  return a.map((item, idx) => [item, b[idx]]);
}

const BORDER_WIDTH = 2;

const AVATAR_SIZES = {
  sm: 24,
  md: 40,
  lg: 72,
};

type Props = {|
  collaborators: Array<{|
    name: string,
    src?: string,
  |}>,
  outline?: boolean,
  size?: 'sm' | 'md' | 'lg',
|};

const avatarLayout = (n, size) => {
  switch (n) {
    case 0:
    case 1:
      return [
        { top: 0, left: 0, width: size, height: size, textLayout: 'center' },
      ];
    case 2:
      return [
        {
          top: 0,
          left: 0,
          width: `calc(50% - ${BORDER_WIDTH / 2}px)`,
          height: size,
          textLayout: 'center',
        },
        {
          top: 0,
          left: `calc(50% + ${BORDER_WIDTH / 2}px)`,
          width: `calc(50% - ${BORDER_WIDTH / 2}px)`,
          height: size,
          textLayout: 'center',
        },
      ];
    default:
      return [
        {
          top: 0,
          left: 0,
          width: `calc(50% - ${BORDER_WIDTH / 2}px)`,
          height: size,
          textLayout: 'center',
        },
        {
          top: 0,
          left: `calc(50% + ${BORDER_WIDTH / 2}px)`,
          width: 'calc(50%)',
          height: `calc(50% - ${BORDER_WIDTH / 2}px)`,
          textLayout: 'topLeft',
        },
        {
          top: `calc(50% + ${BORDER_WIDTH / 2}px)`,
          left: `calc(50% + ${BORDER_WIDTH / 2}px)`,
          width: 'calc(50%)',
          height: `calc(50% - ${BORDER_WIDTH / 2}px)`,
          textLayout: 'bottomLeft',
        },
      ];
  }
};

const degToRad = deg => deg * (Math.PI / 180);

const DefaultAvatar = (props: {|
  size: string | number,
  name: string,
  textLayout: 'center' | 'topLeft' | 'bottomLeft',
|}) => {
  const { size, name, textLayout } = props;

  const quarterPadding = `calc(${Math.sin(degToRad(45))} * (${size}) / 2)`;

  const initial = (
    <svg
      width="100%"
      viewBox="-50 -50 100 100"
      version="1.1"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{name}</title>
      <text
        fontSize="50px"
        fill="#fff"
        dominantBaseline="central"
        textAnchor="middle"
        className={[
          typography.antialiased,
          typography.sansSerif,
          typography.leadingSmall,
          typography.fontWeightBold,
        ].join(' ')}
      >
        {name ? [...name][0].toUpperCase() : ''}
      </text>
    </svg>
  );
  switch (textLayout) {
    case 'bottomLeft':
      return (
        <Box
          aria-label={name}
          color="gray"
          height="100%"
          display="flex"
          alignItems="end"
          dangerouslySetInlineStyle={{
            __style: {
              paddingBottom: quarterPadding,
              paddingRight: quarterPadding,
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
          height="100%"
          display="flex"
          alignItems="start"
          dangerouslySetInlineStyle={{
            __style: {
              paddingTop: quarterPadding,
              paddingRight: quarterPadding,
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
          height="100%"
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
  const avatarWidth = size ? AVATAR_SIZES[size] : '100%';
  const avatarHeight = size ? AVATAR_SIZES[size] : '';
  const positions = avatarLayout(collaborators.length, avatarWidth);
  return (
    <Box
      color="white"
      overflow="hidden"
      shape="circle"
      width={avatarWidth}
      height={avatarHeight}
      position="relative"
      dangerouslySetInlineStyle={{
        __style: {
          ...(outline ? { boxShadow: '0 0 0 2px #fff' } : {}),
          // willChange: transform fixes a strange behavior where the border of the children
          // are not properly trimmed even though overflow: hidden is set
          willChange: 'transform',
        },
      }}
    >
      <Box dangerouslySetInlineStyle={{ __style: { paddingBottom: '100%' } }} />
      {zip(positions, collaborators).map(
        ([position, collaborator = { name: '', src: undefined }], idx) => {
          const { width, height, top, left, textLayout } = position;
          const { name, src } = collaborator;
          return (
            <Box
              key={idx}
              position="absolute"
              width={width}
              height={height}
              dangerouslySetInlineStyle={{ __style: { top, left } }}
            >
              {src ? (
                <Image
                  alt={name}
                  color="#EFEFEF"
                  src={src}
                  naturalWidth={1}
                  naturalHeight={1}
                  fit="cover"
                />
              ) : (
                <DefaultAvatar
                  name={name}
                  textLayout={textLayout}
                  size={height}
                />
              )}
              <div className={styles.wash} />
            </Box>
          );
        }
      )}
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
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};
