// @flow strict
import {
  type AbstractComponent,
  forwardRef,
  Fragment,
  type Node as ReactNode,
  useState,
} from 'react';
import AddCollaboratorsButton from './AvatarGroup/AddCollaboratorsButton';
import CollaboratorAvatar from './AvatarGroup/CollaboratorAvatar';
import CollaboratorsCount from './AvatarGroup/CollaboratorsCount';
import Box from './Box';
import Flex from './Flex';
import TapArea from './TapArea';
import TapAreaLink from './TapAreaLink';

const MAX_COLLABORATOR_AVATARS = 3;

type UnionRefs = HTMLDivElement | HTMLAnchorElement;
type Props = {
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
  collaborators: $ReadOnlyArray<{
    name: string,
    src?: string,
  }>,
  /**
   * When supplied, wraps the component in a link, and directs users to the url when item is selected. See the [role](https://gestalt.pinterest.systems/web/avatargroup#Role) variant to learn more.
   */
  href?: string,
  /**
   * Callback fired when the component is clicked (pressed and released) with a mouse or keyboard. See the [role](https://gestalt.pinterest.systems/web/avatargroup#Role) variant to learn more and see [TapArea's `onTap`](https://gestalt.pinterest.systems/web/taparea#Props-onTap) for more info about `OnTapType`.
   */
  onClick?: ({
    event:
      | SyntheticMouseEvent<HTMLDivElement>
      | SyntheticKeyboardEvent<HTMLDivElement>
      | SyntheticMouseEvent<HTMLAnchorElement>
      | SyntheticKeyboardEvent<HTMLAnchorElement>,
    dangerouslyDisableOnNavigation: () => void,
  }) => void,
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
};

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
  ): ReactNode {
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

    const collaboratorStack = (
      <Fragment>
        {displayedCollaborators.map(({ src, name }, index) => (
          <CollaboratorAvatar
            // eslint-disable-next-line react/no-array-index-key
            key={`collaboratorStack-${name}-${index}`}
            hovered={hovered}
            index={index}
            name={name}
            pileCount={pileCount}
            size={size}
            src={src || ''}
          />
        ))}
        {showCollaboratorsCount && (
          <CollaboratorsCount
            key={`collaboratorStack-count-${collaborators.length}`}
            count={collaborators.length - 2}
            hovered={hovered}
            pileCount={pileCount}
            showAddCollaboratorsButton={showAddCollaboratorsButton}
            size={size}
          />
        )}
        {showAddCollaboratorsButton && (
          <AddCollaboratorsButton
            key={`collaboratorStack-addButton-${collaborators.length}`}
            hovered={hovered}
            pileCount={pileCount}
            size={size}
          />
        )}
      </Fragment>
    );

    const avatarGroupStack = (
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
        <TapAreaLink
          ref={ref}
          accessibilityLabel={accessibilityLabel}
          fullWidth={false}
          href={href}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onTap={({ event, dangerouslyDisableOnNavigation }) =>
            onClick?.({ event, dangerouslyDisableOnNavigation })
          }
          rounding="pill"
          tapStyle="compress"
        >
          {avatarGroupStack}
        </TapAreaLink>
      );
    }

    if (role === 'button' && onClick) {
      return (
        <TapArea
          ref={ref}
          accessibilityControls={accessibilityControls}
          accessibilityExpanded={accessibilityExpanded}
          accessibilityHaspopup={accessibilityHaspopup}
          accessibilityLabel={accessibilityLabel}
          fullWidth={false}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          // $FlowExpectedError[prop-missing]
          onTap={({ event }) => onClick({ event })}
          rounding="pill"
          tapStyle="compress"
        >
          {avatarGroupStack}
        </TapArea>
      );
    }

    // Display-only role
    return avatarGroupStack;
  },
);

AvatarGroupWithForwardRef.displayName = 'AvatarGroup';

export default AvatarGroupWithForwardRef;
