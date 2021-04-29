// @flow strict
import { type Node } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Avatar from './Avatar.js';
import Box from './Box.js';
import { FixedZIndex } from './zIndex.js';
import styles from './AvatarGroup.css';
import AvatarFoundation from './AvatarFoundation.js';

/*  FLOWTYPES */

export type Size = 'xs' | 'sm' | 'md' | 'fit';

type BaseStackType = {|
  hovered: boolean,
  pileCount: number,
  size: Size,
|};

type CollaboratorAvatarType = {|
  ...BaseStackType,
  index: number,
  name: string,
  src: string,
|};

type CollaboratorsCountType = {|
  ...BaseStackType,
  hasCollaboratorsButton: boolean,
  count: number,
|};

type HoverOverlayType = {|
  children: Node,
  hovered: boolean,
  size: Size,
|};

type PositioningWrapperType = {|
  children: Node,
  pileCount: number,
  index: number,
  size: Size,
|};

/*  SUBCOMPONENT HELPERS */

const SIZE_MAP = { 'xs': 24, 'sm': 32, 'md': 48, 'fit': '100%' };

// HoverOverlay adds a pseudo-element on hover so that avatars get covered in a darker wash individually.
function HoverOverlay({ children, hovered, size }: HoverOverlayType) {
  return (
    <Box
      height={SIZE_MAP[size]}
      // position="relative" is required to create a stacking context so that pseudo-elements can be positioned in front of their parent element
      position="relative"
      width={SIZE_MAP[size]}
      zIndex={new FixedZIndex(1)}
    >
      <div className={hovered ? classnames(styles.overlay) : ''}>{children}</div>
    </Box>
  );
}

// PositioningWrapper provides a width and height for each avatar and positions them correctly in the superposed stack.
function PositioningWrapper({ size, pileCount, index, children }: PositioningWrapperType): Node {
  const FIT_SIZING_DENOMINATOR_MAP = { '1': 3, '2': 5, '3': 7, '4': 9 };

  const isFitSize = size === 'fit';

  let marginStart = index === 0 ? '0px' : `${(-1 * Number(SIZE_MAP[size]) ?? 0) / 3}px`;

  if (isFitSize) {
    // Each avatar superposes a third of the previous one. Each avatar equals 3/3 parts. Two avatars are 5/5, each of them being 3/5 parts of the whole sharing a 1/5 overlapping part, and so forth. To provide a perfect-pixel positioning on any responsive size, we use the 2/3 part on each index position to place the next superposed avatar.
    marginStart = `${((2 * index) / FIT_SIZING_DENOMINATOR_MAP[pileCount]) * 100}%`;
  }

  // To provide a perfect-pixel width for each responsive avatar, we use the ratio of 3 parts of the total parts of the whole GroupAvatar. A 4-avatar component has 9 total parts, and each avatar's witdh is 3/9 of the total width.
  const width = isFitSize ? `${(3 / FIT_SIZING_DENOMINATOR_MAP[pileCount]) * 100}%` : undefined;

  return (
    <Box
      aria-hidden="true"
      dangerouslySetInlineStyle={{
        __style: {
          marginInlineStart: marginStart,
          top: isFitSize ? 0 : undefined,
        },
      }}
      position={isFitSize ? 'absolute' : 'static'}
      width={width}
    >
      {children}
    </Box>
  );
}

/*  SUBCOMPONENT EXPORTS */

export function AddCollaboratorsButton({ hovered, pileCount, size }: BaseStackType): Node {
  return (
    <PositioningWrapper index={pileCount - 1} pileCount={pileCount} size={size}>
      <HoverOverlay hovered={hovered} size={size}>
        <AvatarFoundation outline content="icon" />
      </HoverOverlay>
    </PositioningWrapper>
  );
}

export function CollaboratorAvatar({
  hovered,
  index,
  name,
  pileCount,
  size,
  src,
}: CollaboratorAvatarType): Node {
  return (
    <PositioningWrapper index={index} pileCount={pileCount} size={size}>
      <HoverOverlay hovered={hovered} size={size}>
        <Avatar name={name} outline size={size} src={src} />
      </HoverOverlay>
    </PositioningWrapper>
  );
}

export function CollaboratorsCount({
  hasCollaboratorsButton,
  pileCount,
  hovered,
  count,
  size,
}: CollaboratorsCountType): Node {
  const isOverNineCount = count > 9;
  const isAbove99Count = count > 99;

  let translate;
  if (isOverNineCount && !isAbove99Count && hasCollaboratorsButton) {
    translate = 'translateX10';
  }
  if (isAbove99Count && hasCollaboratorsButton) {
    translate = 'translateX15';
  }

  return (
    <PositioningWrapper index={2} pileCount={pileCount} size={size}>
      <HoverOverlay hovered={hovered} size={size}>
        <AvatarFoundation
          fontSize={isAbove99Count && hasCollaboratorsButton ? '30px' : '40px'}
          outline
          textAnchor="middle"
          translate={translate}
        >
          {isAbove99Count ? '99+' : count}
        </AvatarFoundation>
      </HoverOverlay>
    </PositioningWrapper>
  );
}

/*  PROPTYPES */

export const SizeProptype: React$PropType$Primitive<Size> = PropTypes.oneOf([
  'xs',
  'sm',
  'md',
  'fit',
]);

PositioningWrapper.propTypes = {
  children: PropTypes.node,
  pileCount: PropTypes.number,
  size: SizeProptype,
  index: PropTypes.number,
};

HoverOverlay.propTypes = {
  children: PropTypes.node,
  hovered: PropTypes.bool,
  size: SizeProptype,
};

CollaboratorAvatar.propTypes = {
  index: PropTypes.number,
  name: PropTypes.string,
  src: PropTypes.string,
  hovered: PropTypes.bool,
  pileCount: PropTypes.number,
  size: SizeProptype,
};

CollaboratorsCount.propTypes = {
  count: PropTypes.number,
  hasCollaboratorsButton: PropTypes.bool,
  hovered: PropTypes.bool,
  pileCount: PropTypes.number,
  size: SizeProptype,
};

AddCollaboratorsButton.propTypes = {
  hovered: PropTypes.bool,
  pileCount: PropTypes.number,
  size: SizeProptype,
};
