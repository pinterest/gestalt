// @flow strict
import React, { useState, type Node } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Avatar from './Avatar.js';
import Box from './Box.js';
import Flex from './Flex.js';
import Text from './Text.js';
import Icon from './Icon.js';
import TapArea from './TapArea.js';
import { CompositeZIndex, FixedZIndex } from './zIndex.js';
import { useColorScheme } from './contexts/ColorScheme.js';
import { type AbstractEventHandler } from './AbstractEventHandler.js';
import styles from './AvatarGroup.css';

type Size = 'xs' | 'sm' | 'md';

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
  addCollaborators?: boolean,
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
  hovered: boolean,
  index: number,
  name: string,
  size: Size,
  src: string,
|}) => Node;

type AddCollaboratorsBtnType = ({| hovered: boolean |}) => Node;

type CollaboratorsCountType = ({|
  hasAddCollaboratorsBtn: boolean,
  hovered: boolean,
  count: number,
|}) => Node;

type HoverOverlayType = ({|
  children: Node,
  hovered: boolean,
  size: Size,
|}) => Node;

const BASE_ZINDEX = new FixedZIndex(1); // hover overlay needs z-index = 1

const COLLABORATOR_COUNT_ZINDEX = new FixedZIndex(2); // hover overlay needs z-index = 1

const ADD_COLLABORATOR_BUTTON_ZINDEX = new CompositeZIndex([COLLABORATOR_COUNT_ZINDEX]);

// eslint-disable-next-line react/prop-types
const HoverOverlay: HoverOverlayType = ({ children, hovered, size }) => {
  const sizes = { 'xs': 24, 'sm': 32, 'md': 48 };

  return (
    // This wrapping Box creates a stacking context so that pseudo-elements can be positioned in front of their parent element
    <Box position="relative" height={sizes[size]} width={sizes[size]} zIndex={BASE_ZINDEX}>
      <div className={hovered && classnames(styles.overlay)}>{children}</div>
    </Box>
  );
};

// eslint-disable-next-line react/prop-types
const CollaboratorAvatar: CollaboratorAvatarType = ({ hovered, index, name, size, src }) => {
  const margin = size === 'xs' ? -3 : -4;

  return (
    <Box marginStart={index === 0 ? 0 : margin}>
      <HoverOverlay hovered={hovered} size={size}>
        <Avatar name={name} outline size={size} src={src} />
      </HoverOverlay>
    </Box>
  );
};

// eslint-disable-next-line react/prop-types
const AddCollaboratorsBtn: AddCollaboratorsBtnType = ({ hovered }) => {
  const { colorGray0 } = useColorScheme();

  return (
    <Box marginStart={-4} rounding="circle" zIndex={ADD_COLLABORATOR_BUTTON_ZINDEX}>
      <HoverOverlay hovered={hovered} size="md">
        <Box
          alignItems="center"
          color="lightGray"
          dangerouslySetInlineStyle={{
            __style: {
              boxShadow: `0 0 0 1px ${colorGray0}`,
            },
          }}
          display="flex"
          justifyContent="center"
          rounding="circle"
          width={48}
          height={48}
        >
          <Icon accessibilityLabel="" color="darkGray" icon="add" size={20} />
        </Box>
      </HoverOverlay>
    </Box>
  );
};

// eslint-disable-next-line react/prop-types
const CollaboratorsCount: CollaboratorsCountType = ({ hasAddCollaboratorsBtn, hovered, count }) => {
  const { colorGray0 } = useColorScheme();
  const isOverNineCount = count > 9;
  const isAbove99Count = count > 99;

  return (
    <Box marginStart={-4} rounding="circle" zIndex={COLLABORATOR_COUNT_ZINDEX}>
      <HoverOverlay hovered={hovered} size="md">
        <Box
          alignItems="center"
          color="lightGray"
          dangerouslySetInlineStyle={{
            __style: {
              boxShadow: `0 0 0 1px ${colorGray0}`,
            },
          }}
          display="flex"
          height={48}
          justifyContent={hasAddCollaboratorsBtn && isOverNineCount ? 'start' : 'center'}
          paddingX={hasAddCollaboratorsBtn && isAbove99Count ? 1 : 2}
          rounding="circle"
          width={48}
        >
          <Text size={hasAddCollaboratorsBtn && isAbove99Count ? 'md' : 'lg'} weight="bold">
            {isAbove99Count ? '99+' : count}
          </Text>
        </Box>
      </HoverOverlay>
    </Box>
  );
};

export default function AvatarGroup({
  accessibilityLabel,
  accessibilityControls,
  accessibilityExpanded,
  accessibilityHaspopup,
  addCollaborators,
  collaborators,
  href,
  onClick,
  role = null,
  size = 'md',
}: Props): Node {
  const [hovered, setHovered] = useState(false);
  const MAX_COLLABORATOR_AVATARS = 3;

  const isAboveMaxCollaborators = collaborators.length > MAX_COLLABORATOR_AVATARS;

  const maxAvatarPileCount = isAboveMaxCollaborators ? 2 : 3;

  const isClickable = onClick && role !== null;

  const isMdSize = size === 'md';

  const addCollaboratorsCount = isMdSize && isAboveMaxCollaborators;

  const addCollaboratorsBtn = (isMdSize && isClickable && addCollaborators) ?? false;

  const collaboratorStack = collaborators
    .slice(0, maxAvatarPileCount)
    .map(({ src, name }, index) => {
      return (
        <CollaboratorAvatar
          key={`collaboratorStack-${name}-${index}`}
          hovered={hovered}
          index={index}
          name={name}
          size={size}
          src={src || ''}
        />
      );
    });

  if (addCollaboratorsCount) {
    collaboratorStack.push(
      <CollaboratorsCount
        count={collaborators.length - 2}
        hasAddCollaboratorsBtn={addCollaboratorsBtn}
        hovered={hovered}
        key={`collaboratorStack-count-${collaborators.length - 2}`}
      />,
    );
  }

  if (addCollaboratorsBtn) {
    collaboratorStack.push(
      <AddCollaboratorsBtn
        hovered={hovered}
        key={`collaboratorStack-addButton-${collaborators.length}`}
      />,
    );
  }

  const AvatarGroupStack = () => (
    <Box dangerouslySetInlineStyle={{ __style: { isolation: 'isolate' } }}>
      <Flex>{collaboratorStack}</Flex>
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
  addCollaborators: PropTypes.bool,
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
  size: (PropTypes.oneOf(['xs', 'sm', 'md']): React$PropType$Primitive<Size>),
};
