// @flow strict
import { forwardRef, useState, type Node } from 'react';
import PropTypes from 'prop-types';
import Box from './Box.js';
import TapArea, { type OnTapType } from './TapArea.js';

import {
  AddCollaboratorsButton,
  CollaboratorAvatar,
  CollaboratorsCount,
  SizeProptype,
  type Size,
} from './AvatarGroupSubcomponents.js';
import Flex from './Flex.js';
import { type CollaboratorDataType } from './Avatar.js';

type Role = 'link' | 'button';

type Props = {|
  accessibilityLabel: string,
  accessibilityControls?: string,
  accessibilityExpanded?: boolean,
  accessibilityHaspopup?: boolean,
  addCollaborators?: boolean,
  collaborators: $ReadOnlyArray<CollaboratorDataType>,
  href?: string,
  onClick?: OnTapType,
  role?: Role,
  size?: Size,
|};

type UnionRefs = HTMLDivElement | HTMLAnchorElement;

const AvatarGroupWithForwardRef: React$AbstractComponent<Props, UnionRefs> = forwardRef<
  Props,
  UnionRefs,
>(function AvatarGroup(
  {
    accessibilityLabel,
    accessibilityControls,
    accessibilityExpanded,
    accessibilityHaspopup,
    addCollaborators,
    collaborators,
    href,
    onClick,
    role,
    size = 'fit',
  },
  ref,
): Node {
  const [hovered, setHovered] = useState(false);

  const MAX_COLLABORATOR_AVATARS = 3;

  const isMdSize = size === 'md';

  const isFitSize = size === 'fit';

  const isMdOrFitSize = isMdSize || isFitSize;

  const isDisplayOnly = !role;

  const isAboveMaxCollaborators = collaborators.length > MAX_COLLABORATOR_AVATARS;

  const addCollaboratorsCount = isMdOrFitSize && isAboveMaxCollaborators;

  const addCollaboratorsButton = (isMdOrFitSize && !isDisplayOnly && addCollaborators) ?? false;

  const slicedCollaborators = collaborators.slice(
    0,
    isAboveMaxCollaborators && isMdOrFitSize ? 2 : MAX_COLLABORATOR_AVATARS,
  );

  const pileCount = slicedCollaborators.length + addCollaboratorsCount + addCollaboratorsButton;

  const collaboratorStack = slicedCollaborators.map(({ src, name }, index) => {
    return (
      <CollaboratorAvatar
        hovered={hovered}
        index={index}
        key={`collaboratorStack-${name}-${index}`}
        name={name}
        pileCount={pileCount}
        size={size}
        src={src || ''}
      />
    );
  });

  if (addCollaboratorsCount) {
    collaboratorStack.push(
      <CollaboratorsCount
        count={collaborators.length - 2}
        hasAddCollaboratorsButton={addCollaboratorsButton}
        hovered={hovered}
        key={`collaboratorStack-count-${collaborators.length}`}
        pileCount={pileCount}
        size={size}
      />,
    );
  }

  if (addCollaboratorsButton) {
    collaboratorStack.push(
      <AddCollaboratorsButton
        hovered={hovered}
        key={`collaboratorStack-addButton-${collaborators.length}`}
        pileCount={pileCount}
        size={size}
      />,
    );
  }

  const AvatarGroupStack = () => (
    <Box
      aria-label={isDisplayOnly ? accessibilityLabel : undefined}
      dangerouslySetInlineStyle={{ __style: { isolation: 'isolate' } }}
      position={isFitSize ? 'relative' : 'static'}
    >
      {isFitSize ? collaboratorStack : <Flex>{collaboratorStack}</Flex>}
    </Box>
  );

  if (role === 'link' && href) {
    return (
      <TapArea
        accessibilityLabel={accessibilityLabel}
        href={href}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTap={onClick}
        ref={ref}
        role="link"
        rounding="pill"
        tapStyle="compress"
      >
        <AvatarGroupStack />
      </TapArea>
    );
  }

  if (role === 'button' && onClick) {
    return (
      <TapArea
        accessibilityLabel={accessibilityLabel}
        accessibilityControls={accessibilityControls}
        accessibilityExpanded={accessibilityExpanded}
        accessibilityHaspopup={accessibilityHaspopup}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTap={onClick}
        ref={ref}
        rounding="pill"
        tapStyle="compress"
      >
        <AvatarGroupStack accessibilityLabel={accessibilityLabel} />
      </TapArea>
    );
  }

  // Display-only role
  return <AvatarGroupStack />;
});

AvatarGroupWithForwardRef.propTypes = {
  accessibilityLabel: PropTypes.string.isRequired,
  accessibilityControls: PropTypes.string,
  accessibilityExpanded: PropTypes.bool,
  accessibilityHaspopup: PropTypes.bool,
  addCollaborators: PropTypes.bool,
  collaborators: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      src: PropTypes.string,
    }),
  ).isRequired,
  href: PropTypes.string,
  onClick: PropTypes.func,
  role: (PropTypes.oneOf(['link', 'button']): React$PropType$Primitive<Role>),
  size: SizeProptype,
};

AvatarGroupWithForwardRef.displayName = 'AvatarGroup';

export default AvatarGroupWithForwardRef;
