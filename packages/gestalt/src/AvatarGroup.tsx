import { forwardRef, Fragment } from 'react';
import AddCollaboratorsButton from './AvatarGroup/AddCollaboratorsButton';
import CollaboratorAvatar from './AvatarGroup/CollaboratorAvatar';
import CollaboratorsCount from './AvatarGroup/CollaboratorsCount';
import Box from './Box';
import Flex from './Flex';
import TapArea from './TapArea';
import TapAreaLink from './TapAreaLink';
import useInExperiment from './useInExperiment';
import useInteractiveStates from './utils/useInteractiveStates';

const MAX_COLLABORATOR_AVATARS = 3;

type UnionRefs = HTMLDivElement | HTMLAnchorElement;
type Props = {
  /**
   * Label for screen readers to announce AvatarGroup.
   *
   * See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/avatargroup#Accessibility) for details on proper usage.
   */
  accessibilityLabel: string;
  /**
   * Specify the `id` of an associated element (or elements) whose contents or visibility are controlled by a component so that screen reader users can identify the relationship between elements. Optional with button-role component.
   *
   * See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/avatargroup#Accessibility) for details on proper usage.
   */
  accessibilityControls?: string;
  /**
   * Indicate that a component hides or exposes collapsible components and expose whether they are currently expanded or collapsed. Optional with button-role component.
   *
   * See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/avatargroup#Accessibility) for details on proper usage.
   */
  accessibilityExpanded?: boolean;
  /**
   * Indicate that a component controls the appearance of interactive popup elements, such as menu or dialog. Optional with button-role component.
   *
   * See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/avatargroup#Accessibility) for details on proper usage.
   */
  accessibilityHaspopup?: boolean;
  /**
   * When supplied, it appends an `add` [icon](https://gestalt.pinterest.systems/web/icon) to the avatar pile as a call to action to the user. Not available for 'xs' size. See [Best Practices](https://gestalt.pinterest.systems/web/avatargroup#Best-practices) for more info.
   */
  addCollaborators?: boolean;
  /**
   * The user group data. See the [collaborators display](https://gestalt.pinterest.systems/web/avatargroup#Collaborators-display) variant to learn more.
   */
  collaborators: ReadonlyArray<{
    color?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    name: string;
    src?: string;
  }>;
  /**
   * When supplied, wraps the component in a link, and directs users to the url when item is selected. See the [role](https://gestalt.pinterest.systems/web/avatargroup#Role) variant to learn more.
   */
  href?: string;
  /**
   * Callback fired when the component is clicked (pressed and released) with a mouse or keyboard. See the [role](https://gestalt.pinterest.systems/web/avatargroup#Role) variant to learn more and see [TapArea's `onTap`](https://gestalt.pinterest.systems/web/taparea#Props-onTap) for more info about `OnTapType`.
   */
  onClick?: (arg1: {
    event:
      | React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>
      | React.MouseEvent<HTMLAnchorElement>
      | React.KeyboardEvent<HTMLAnchorElement>;
    dangerouslyDisableOnNavigation: () => void;
  }) => void;
  /**
   * Forward the ref to the underlying div or anchor element. See the [role](https://gestalt.pinterest.systems/web/avatargroup#Role) variant to learn more.
   */
  ref?: UnionRefs; // eslint-disable-line react/no-unused-prop-types,
  /**
   * Allows user interaction with the component. See the [role](https://gestalt.pinterest.systems/web/avatargroup#Role) variant to learn more.
   */
  role?: 'link' | 'button';
  /**
   * The maximum height of AvatarGroup. If size is `fit`, AvatarGroup will fill 100% of the parent container width. See the [fixed size](https://gestalt.pinterest.systems/web/avatargroup#Fixed-sizes) and [responsive size](https://gestalt.pinterest.systems/web/avatargroup#Responsive-sizing) variant to learn more.
   */
  size?: 'xs' | 'sm' | 'md' | 'fit';
};

/**
 * [AvatarGroup](https://gestalt.pinterest.systems/web/avatargroup) is used to both display a group of user avatars and, optionally, control actions related to the users group.
 *
 * ![AvatarGroup light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/AvatarGroup.spec.ts-snapshots/AvatarGroup-chromium-darwin.png)
 * ![AvatarGroup dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/AvatarGroup-dark.spec.ts-snapshots/AvatarGroup-dark-chromium-darwin.png)
 */
const AvatarGroupWithForwardRef = forwardRef<UnionRefs, Props>(function AvatarGroup(
  props: Props,
  ref,
) {
  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

  const {
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
  } = props;

  const isDisplayOnly = !role;

  const isXS = size === 'xs';

  const validCollaborators = collaborators.filter(
    (collaborator) => collaborator && collaborator.name,
  );

  const showCollaboratorsCount = validCollaborators.length > MAX_COLLABORATOR_AVATARS && !isXS;

  const showAddCollaboratorsButton = (!isDisplayOnly && addCollaborators && !isXS) ?? false;

  const displayedCollaborators = validCollaborators.slice(
    0,
    showCollaboratorsCount ? 2 : MAX_COLLABORATOR_AVATARS,
  );

  const pileCount =
    displayedCollaborators.length +
    (showCollaboratorsCount ? 1 : 0) +
    (showAddCollaboratorsButton ? 1 : 0);

  const {
    handleOnMouseEnter,
    handleOnMouseLeave,
    handleOnBlur,
    handleOnFocus,
    handleOnMouseDown,
    handleOnMouseUp,
    isHovered,
    isActive: isPressed,
  } = useInteractiveStates();

  const collaboratorStack = (
    <Fragment>
      {displayedCollaborators.map(({ src, name, color }, index) => (
        <CollaboratorAvatar
          // eslint-disable-next-line react/no-array-index-key
          key={`collaboratorStack-${name}-${index}`}
          color={color}
          index={index}
          isHovered={isHovered}
          isPressed={isPressed}
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
          hovered={isHovered}
          isHovered={isHovered}
          isPressed={isPressed}
          pileCount={pileCount}
          showAddCollaboratorsButton={showAddCollaboratorsButton}
          size={size}
        />
      )}
      {showAddCollaboratorsButton && (
        <AddCollaboratorsButton
          key={`collaboratorStack-addButton-${collaborators.length}`}
          hovered={isHovered}
          isHovered={isHovered}
          isPressed={isPressed}
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
      position={size === 'fit' ? 'relative' : 'static'}
    >
      {size === 'fit' ? collaboratorStack : <Flex>{collaboratorStack}</Flex>}
    </Box>
  );

  if (!isInVRExperiment && role === 'link' && href) {
    return (
      <TapAreaLink
        ref={ref as React.LegacyRef<HTMLAnchorElement> | undefined}
        accessibilityLabel={accessibilityLabel}
        fullWidth={false}
        href={href}
        onBlur={handleOnBlur}
        onFocus={handleOnFocus}
        onMouseDown={handleOnMouseDown}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        onMouseUp={handleOnMouseUp}
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

  if (!isInVRExperiment && role === 'button' && onClick) {
    return (
      <TapArea
        ref={ref as React.LegacyRef<HTMLDivElement> | undefined}
        accessibilityControls={accessibilityControls}
        accessibilityExpanded={accessibilityExpanded}
        accessibilityHaspopup={accessibilityHaspopup}
        accessibilityLabel={accessibilityLabel}
        fullWidth={false}
        onBlur={handleOnBlur}
        onFocus={handleOnFocus}
        onMouseDown={handleOnMouseDown}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        onMouseUp={handleOnMouseUp}
        // @ts-expect-error - TS2345 - Argument of type '{ event: KeyboardEvent<HTMLDivElement> | MouseEvent<HTMLDivElement, MouseEvent>; }' is not assignable to parameter of type '{ event: MouseEvent<HTMLAnchorElement, MouseEvent> | KeyboardEvent<HTMLAnchorElement> | KeyboardEvent<...> | MouseEvent<...>; dangerouslyDisableOnNavigation: () => void; }'.
        onTap={({ event }) => onClick({ event })}
        rounding="pill"
        tapStyle="compress"
      >
        {avatarGroupStack}
      </TapArea>
    );
  }

  if (isInVRExperiment && role === 'link' && href) {
    return (
      <TapAreaLink
        ref={ref as React.LegacyRef<HTMLAnchorElement> | undefined}
        accessibilityLabel={accessibilityLabel}
        fullWidth={false}
        href={href}
        onMouseDown={handleOnMouseDown}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        onMouseUp={handleOnMouseUp}
        onTap={({ event, dangerouslyDisableOnNavigation }) =>
          onClick?.({ event, dangerouslyDisableOnNavigation })
        }
        rounding="pill"
        tabIndex={0}
        tapStyle="compress"
      >
        {avatarGroupStack}
      </TapAreaLink>
    );
  }

  if (isInVRExperiment && role === 'button' && onClick) {
    return (
      <TapArea
        ref={ref as React.LegacyRef<HTMLDivElement> | undefined}
        accessibilityControls={accessibilityControls}
        accessibilityExpanded={accessibilityExpanded}
        accessibilityHaspopup={accessibilityHaspopup}
        accessibilityLabel={accessibilityLabel}
        fullWidth={false}
        innerFocusColor="default"
        onMouseDown={handleOnMouseDown}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        onMouseUp={handleOnMouseUp}
        // @ts-expect-error - TS2345 - Argument of type '{ event: KeyboardEvent<HTMLDivElement> | MouseEvent<HTMLDivElement, MouseEvent>; }' is not assignable to parameter of type '{ event: MouseEvent<HTMLAnchorElement, MouseEvent> | KeyboardEvent<HTMLAnchorElement> | KeyboardEvent<...> | MouseEvent<...>; dangerouslyDisableOnNavigation: () => void; }'.
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
});

AvatarGroupWithForwardRef.displayName = 'AvatarGroup';

export default AvatarGroupWithForwardRef;
