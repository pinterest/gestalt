// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/prop-types */
// @flow strict
import React, { useState, type Node } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Avatar from './Avatar.js';
import Box from './Box.js';
import Flex from './Flex.js';
import TapArea from './TapArea.js';
import { FixedZIndex } from './zIndex.js';
import { type AbstractEventHandler } from './AbstractEventHandler.js';
import styles from './AvatarGroup.css';

type Size = 'xs' | 'sm' | 'md' | 'fit';

type Role = 'link' | 'button' | null;

type Collaborators = $ReadOnlyArray<{|
  name: string,
  src?: string,
|}>;

type Props = {|
  accessibilityLabel: string,
  accessibilityControls?: string,
  accessibilityExpanded?: boolean,
  accessibilityHaspopup?: boolean,
  collaborators: Collaborators,
  href?: string,
  onClick?: AbstractEventHandler<
    | SyntheticMouseEvent<HTMLDivElement>
    | SyntheticKeyboardEvent<HTMLDivElement>
    | SyntheticMouseEvent<HTMLAnchorElement>
    | SyntheticKeyboardEvent<HTMLAnchorElement>,
    {| disableOnNavigation: () => void |},
  >,
  role?: Role,
  size?: Size,
|};

type CollaboratorAvatarType = ({|
  count: number,
  hovered: boolean,
  index: number,
  name: string,
  size: Size,
  src: string,
|}) => Node;

type HoverOverlayType = ({|
  children: Node,
  hovered: boolean,
  size: Size,
|}) => Node;

const BASE_ZINDEX = new FixedZIndex(1); // hover overlay needs z-index = 1

const SIZE_MAP = { 'xs': 24, 'sm': 32, 'md': 48, 'fit': '100%' };

const FIT_SIZING_DENOMINATOR_MAP = { '1': 3, '2': 5, '3': 7, '4': 9 };

const CollaboratorAvatar: CollaboratorAvatarType = ({ count, index, name, size, src }) => {
  const margin = size === 'xs' ? -3 : -4;

  return (
    <Box
      position="absolute"
      width={`calc(${(3 / FIT_SIZING_DENOMINATOR_MAP[count]) * 100}%`}
      dangerouslySetInlineStyle={{
        __style: {
          'margin-inline-start':
            index === 0 ? 0 : `calc(${((2 * index) / FIT_SIZING_DENOMINATOR_MAP[count]) * 100}%`,
          top: 0,
        },
      }}
    >
      <Avatar name={name} outline size={size} src={src} />
    </Box>
  );
};

export default function AvatarGroup({
  accessibilityLabel,
  accessibilityControls,
  accessibilityExpanded,
  accessibilityHaspopup,
  collaborators,
  href,
  onClick,
  role = null,
  size = 'fit',
}: Props): Node {
  const [hovered, setHovered] = useState(false);

  const MAX_COLLABORATOR_AVATARS = 3;

  const isAboveMaxCollaborators = collaborators.length > MAX_COLLABORATOR_AVATARS;

  const maxAvatarPileCount = isAboveMaxCollaborators ? 2 : 3;

  const isClickable = !!onClick && role !== null;

  const slicedCollaborators = collaborators.slice(0, maxAvatarPileCount);

  const totalCount = slicedCollaborators.length + isAboveMaxCollaborators + isClickable;

  const collaboratorStack = slicedCollaborators.map(({ src, name }, index) => {
    return (
      <CollaboratorAvatar
        count={totalCount}
        key={`collaboratorStack-${name}-${index}`}
        hovered={hovered}
        index={index}
        name={name}
        size={size}
        src={src || ''}
      />
    );
  });

  const AvatarGroupStack = () => (
    <Box
      position="relative"
      dangerouslySetInlineStyle={{
        __style: {
          isolation: 'isolate',
        },
      }}
    >
      {collaboratorStack}
    </Box>
  );

  if (isClickable && role === 'link' && href) {
    return (
      <TapArea
        tapStyle="compress"
        accessibilityLabel={accessibilityLabel}
        rounding="pill"
        role="link"
        href={href}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTap={onClick}
      >
        <AvatarGroupStack />
      </TapArea>
    );
  }

  if (isClickable && !(role === 'link' && href)) {
    return (
      <TapArea
        tapStyle="compress"
        accessibilityLabel={accessibilityLabel}
        accessibilityControls={accessibilityControls}
        accessibilityExpanded={accessibilityExpanded}
        accessibilityHaspopup={accessibilityHaspopup}
        rounding="pill"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTap={onClick}
      >
        <AvatarGroupStack />
      </TapArea>
    );
  }

  return <AvatarGroupStack />;
}

AvatarGroup.propTypes = {
  accessibilityLabel: PropTypes.string,
  accessibilityControls: PropTypes.string,
  accessibilityExpanded: PropTypes.bool,
  accessibilityHaspopup: PropTypes.bool,
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  collaborators: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      src: PropTypes.string,
    }),
  ).isRequired,
  href: PropTypes.string,
  onClick: PropTypes.func,
  role: (PropTypes.oneOf(['link', 'button', null]): React$PropType$Primitive<Role>),
  size: (PropTypes.oneOf(['xs', 'sm', 'md', 'fit']): React$PropType$Primitive<Size>),
};
