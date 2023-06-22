// @flow strict
import { type AbstractComponent, forwardRef, type Node, useCallback, useState } from 'react';
import AddCollaboratorsButton from './AvatarGroup/AddCollaboratorsButton.js';
import CollaboratorAvatar from './AvatarGroup/CollaboratorAvatar.js';
import CollaboratorsCount from './AvatarGroup/CollaboratorsCount.js';
import Box from './Box.js';
import Flex from './Flex.js';
import TapArea, { type OnTapType } from './TapArea.js';

const MAX_COLLABORATOR_AVATARS = 3;

type UnionRefs = HTMLDivElement | HTMLAnchorElement;
type Props = {|
  /**
   * Label for screen readers to announce AvatarGroup.
   *
   * See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/avatargroup#Accessibility) for details on proper usage.
   */
  accessibilityLabel: string,
  /**
   * Specify the `id` of an associated element (or elements) whose contents or visibility are controlled by a component so that screen reader users can identify the relationship between elements. Optional with button-role component.
   *
   * See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/avatargroup#Accessibility) for details on proper usage.
   */
  accessibilityControls?: string,
  /**
   * Indicate that a component hides or exposes collapsible components and expose whether they are currently expanded or collapsed. Optional with button-role component.
   *
   * See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/avatargroup#Accessibility) for details on proper usage.
   */
  accessibilityExpanded?: boolean,
  /**
   * Indicate that a component controls the appearance of interactive popup elements, such as menu or dialog. Optional with button-role component.
   *
   * See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/avatargroup#Accessibility) for details on proper usage.
   */
  accessibilityHaspopup?: boolean,
  /**
   * When supplied, it appends an `add` [icon](https://gestalt.pinterest.systems/web/icon) to the avatar pile as a call to action to the user. See [Best Practices](https://gestalt.pinterest.systems/web/avatargroup#Best-practices) for more info.
   */
  addCollaborators?: boolean,
  /**
   * The user group data. See the [collaborators display](https://gestalt.pinterest.systems/web/avatargroup#Collaborators-display) variant to learn more.
   */
  collaborators: $ReadOnlyArray<{|
    name: string,
    src?: string,
  |}>,
  /**
   * When supplied, wraps the component in a link, and directs users to the url when item is selected. See the [role](https://gestalt.pinterest.systems/web/avatargroup#Role) variant to learn more.
   */
  href?: string,
  /**
   * Callback fired when the component is clicked (pressed and released) with a mouse or keyboard. See the [role](https://gestalt.pinterest.systems/web/avatargroup#Role) variant to learn more and see [TapArea's `onTap`](https://gestalt.pinterest.systems/web/taparea#Props-onTap) for more info about `OnTapType`.
   */
  onClick?: OnTapType,
  /**
   * Forward the ref to the underlying div or anchor element. See the [role](https://gestalt.pinterest.systems/web/avatargroup#Role) variant to learn more.
   */
  ref?: UnionRefs, // eslint-disable-line react/no-unused-prop-types
  /**
   * Allows user interaction with the component. See the [role](https://gestalt.pinterest.systems/web/avatargroup#Role) variant to learn more.
   */
  role?: 'link' | 'button',
  /**
   * The maximum height of AvatarGroup. If size is `fit`, AvatarGroup will fill 100% of the parent container width. See the [fixed size](https://gestalt.pinterest.systems/web/avatargroup#Fixed-sizes) and [responsive size](https://gestalt.pinterest.systems/web/avatargroup#Responsive-sizing) variant to learn more.
   */
  size?: 'xs' | 'sm' | 'md' | 'fit',
|};

/**
 * [AvatarGroup](https://gestalt.pinterest.systems/web/avatargroup) is used to both display a group of user avatars and, optionally, control actions related to the users group.
 *
 * ![AvatarGroup light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/AvatarGroup.spec.mjs-snapshots/AvatarGroup-chromium-darwin.png)
 * ![AvatarGroup dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/AvatarGroup-dark.spec.mjs-snapshots/AvatarGroup-dark-chromium-darwin.png)
 */
const AvatarGroupWithForwardRef: AbstractComponent<Props, UnionRefs> = forwardRef<Props, UnionRefs>(
  function AvatarGroup(
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
    }: Props,
    ref,
  ): Node {
    const [hovered, setHovered] = useState(false);

    const isMdSize = size === 'md';

    const isFitSize = size === 'fit';

    const isMdOrFitSize = isMdSize || isFitSize;

    const isDisplayOnly = !role;

    const isAboveMaxCollaborators = collaborators.length > MAX_COLLABORATOR_AVATARS;

    const showCollaboratorsCount = isMdOrFitSize && isAboveMaxCollaborators;

    const showAddCollaboratorsButton =
      (isMdOrFitSize && !isDisplayOnly && addCollaborators) ?? false;

    const displayedCollaborators = collaborators.slice(
      0,
      isAboveMaxCollaborators && isMdOrFitSize ? 2 : MAX_COLLABORATOR_AVATARS,
    );

    const pileCount =
      displayedCollaborators.length +
      (showCollaboratorsCount ? 1 : 0) +
      (showAddCollaboratorsButton ? 1 : 0);

    let collaboratorStack: $ReadOnlyArray<Node> = displayedCollaborators.map(
      ({ src, name }, index) => (
        <CollaboratorAvatar
          hovered={hovered}
          index={index}
          // eslint-disable-next-line react/no-array-index-key
          key={`collaboratorStack-${name}-${index}`}
          name={name}
          pileCount={pileCount}
          size={size}
          src={src || ''}
        />
      ),
    );

    if (showCollaboratorsCount) {
      collaboratorStack = [
        ...collaboratorStack,
        <CollaboratorsCount
          count={collaborators.length - 2}
          showAddCollaboratorsButton={showAddCollaboratorsButton}
          hovered={hovered}
          key={`collaboratorStack-count-${collaborators.length}`}
          pileCount={pileCount}
          size={size}
        />,
      ];
    }

    if (showAddCollaboratorsButton) {
      collaboratorStack = [
        ...collaboratorStack,
        <AddCollaboratorsButton
          hovered={hovered}
          key={`collaboratorStack-addButton-${collaborators.length}`}
          pileCount={pileCount}
          size={size}
        />,
      ];
    }

    const AvatarGroupStack = useCallback(
      () => (
        <Box
          aria-label={isDisplayOnly ? accessibilityLabel : undefined}
          dangerouslySetInlineStyle={{ __style: { isolation: 'isolate' } }}
          position={isFitSize ? 'relative' : 'static'}
        >
          {isFitSize ? collaboratorStack : <Flex>{collaboratorStack}</Flex>}
        </Box>
      ),
      [accessibilityLabel, collaboratorStack, isDisplayOnly, isFitSize],
    );

    if (role === 'link' && href) {
      return (
        <TapArea
          accessibilityLabel={accessibilityLabel}
          href={href}
          fullWidth={false}
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
          fullWidth={false}
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
  },
);

AvatarGroupWithForwardRef.displayName = 'AvatarGroup';

export default AvatarGroupWithForwardRef;
