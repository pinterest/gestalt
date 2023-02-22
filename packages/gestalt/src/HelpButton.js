// @flow strict
import { type Node, type Element, type Ref, useRef, useState, useEffect, useId } from 'react';
import Box from './Box.js';
import Layer from './Layer.js';
import TapArea, { type OnTapType } from './TapArea.js';
import Popover from './Popover.js';
import Text from './Text.js';
import Link, { type ExternalLinkIcon } from './Link.js';
import Icon from './Icon.js';
import Flex from './Flex.js';
import Tooltip from './Tooltip.js';
import styles from './HelpButton.css';
import { type Indexable, CompositeZIndex, FixedZIndex } from './zIndex.js';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider.js';
import { useColorScheme } from './contexts/ColorSchemeProvider.js';
import { ESCAPE, SPACE, ENTER } from './keyCodes.js';

type Props = {|
  /**
   * Supply a short, descriptive label to complete icon description `Click to learn more about [accessibilityLabel]`. Used for [accessibility](https://gestalt.pinterest.systems/web/popover#ARIA-attributes) purposes.
   */
  accessibilityLabel: string,
  /**
   * Supply a short, descriptive label for screen-readers to describe the popover content. Used for [accessibility](https://gestalt.pinterest.systems/web/popover#ARIA-attributes) purposes.
   */
  accessibilityPopoverLabel: string,
  /**
   * Specifies the preferred position of the tooltip and popover relative to HelpButton. See [Popover's ideal direction variant](https://gestalt.pinterest.systems/web/popover#Ideal-direction) to learn more.
   */
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  /**
   * Enables correct behavior when HelpButton is used within a [ScrollBoundaryContainer](https://gestalt.pinterest.systems/web/utilities/scrollboundarycontainer). To achieve this it add the Layer component around Popover and enables positioning relative to its anchor element. Should only be used in cases where ScrollBoundaryContainer breaks the Popover positionings.
   */
  isWithinScrollContainer?: boolean,
  /**
   * If provided, displays a [link api](https://gestalt.pinterest.systems/web/link#Props) at the bottom of the popover message.
   * - `href` is the URL that the hyperlink points to.
   * - `text` is the displayed text for the link. See the [link variant](https://gestalt.pinterest.systems/web/helpbutton#With-a-link) for more details.
   * - `target` see the [target Link variant](https://gestalt.pinterest.systems/web/link#Target) to learn more. If not defined the link will open in a new window.
   * - Optionally use `accessibilityLabel` to supply a short, descriptive label for screen-readers to replace link texts that don't provide sufficient context about the link component behavior. Texts like "Click Here", or "Read More" can be confusing when a screen reader reads them out of context. In those cases, we must pass an alternative text to replace the link text. It populates `aria-label`. Screen readers read the `accessibilityLabel` prop, if present, instead of the link text. See [ Link's accessibility guidelines](https://gestalt.pinterest.systems/web/link#Accessibility) for more information.
   * - Optionally provide an `onClick` callback, which is fired when the link is clicked (pressed and released) with a mouse or keyboard. See [OnLinkNavigationProvider](https://gestalt.pinterest.systems/web/utilities/onlinknavigationprovider) to learn more about link navigation.
   */
  link?: {|
    accessibilityLabel?: string,
    externalLinkIcon?: ExternalLinkIcon,
    href: string,
    onClick?: ({|
      event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
      dangerouslyDisableOnNavigation: () => void,
    |}) => void,
    ref?: Ref<'a'>,
    text: string,
    target?: null | 'self' | 'blank',
  |},
  /**
   * Callback fired when HelpIcon is clicked (pressed and released) with a mouse or keyboard.
   */
  onClick?: OnTapType,
  /**
   * Informational content that's displayed when the user clicks on HelpButton.
   */
  text: string | Element<typeof Text>,
  /**
   * Specifies the z-index for HelpButton's tooltip and popover to resolve any layering issues with other elements. See the [zIndex variant](https://gestalt.pinterest.systems/web/helpbutton#With-Z-index) for more details.
   */
  zIndex?: Indexable,
|};

/**
 * [HelpButton](https://gestalt.pinterest.systems/web/helpbutton) is an affordance that accompanies an element on the screen. It helps describe or provide assistance on how to use the accompanying element.
 */
export default function HelpButton({
  accessibilityLabel,
  accessibilityPopoverLabel,
  idealDirection = 'down',
  isWithinScrollContainer = false,
  link,
  onClick,
  text,
  zIndex,
}: Props): Node {
  const tapAreaRef = useRef(null);
  const firstElementRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [keyNavigated, setKeyNavigated] = useState(false);
  const { name: colorSchemeName } = useColorScheme();
  const popoverId = useId();
  const { tooltipMessage } = useDefaultLabelContext('HelpButton');

  useEffect(() => {
    // If the navigation is based on keyboard the focus gonna to first element
    if (open && keyNavigated) {
      firstElementRef?.current?.focus();
    }
  }, [open, keyNavigated]);

  // If the popover was closed pressing `ESCAPE`, the focus back to TapArea element
  const handleKeyDownPopover = ({ event }) => {
    if (event.keyCode === ESCAPE && open) {
      tapAreaRef?.current?.focus();
      setKeyNavigated(false);
    }
  };

  // Identify if the navigation is handled by keyboard
  const handleKeyDownTapArea = ({ event }) => {
    const { keyCode } = event;
    if (keyCode === ENTER || keyCode === SPACE) {
      setKeyNavigated(true);
    }
  };

  const toggleView = () => {
    setOpen((currVal) => !currVal);
  };

  const onHandleTap = (props) => {
    toggleView();
    onClick?.(props);
  };

  const bgIconColor = open || hovered || focused ? 'selected' : 'tertiary';

  const tooltipZIndex = zIndex ?? new FixedZIndex(1);

  const zIndexWrapper = new CompositeZIndex([tooltipZIndex]);

  // Overriding color of `Text` components
  const isDarkMode = colorSchemeName === 'darkMode';
  const textColorOverrideStyles = isDarkMode
    ? styles.textColorOverrideLight
    : styles.textColorOverrideDark;

  const textElement =
    typeof text === 'string' ? (
      <Text align="start">{text}</Text>
    ) : (
      <span className={textColorOverrideStyles}>{text}</span>
    );

  const PopoverElement = (
    <Popover
      id={popoverId}
      accessibilityLabel={accessibilityPopoverLabel}
      anchor={tapAreaRef.current}
      onDismiss={toggleView}
      onKeyDown={handleKeyDownPopover}
      idealDirection={idealDirection ?? 'down'}
      positionRelativeToAnchor={!isWithinScrollContainer}
    >
      <Box padding={5} rounding={4} height="auto">
        <Box
          ref={firstElementRef}
          tabIndex={0}
          onBlur={() => {
            if (!link?.href) {
              setFocused(false);
            }
          }}
        >
          {textElement}
        </Box>
        {link?.href && (
          <Box width="100%" display="block" marginTop={3}>
            <Text>
              <Link
                accessibilityLabel={link?.accessibilityLabel}
                externalLinkIcon={link?.externalLinkIcon}
                href={link?.href}
                onClick={link?.onClick}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                ref={link?.ref}
                target={link?.target ?? 'blank'}
                underline="always"
              >
                {link?.text}
              </Link>
            </Text>
          </Box>
        )}
      </Box>
    </Popover>
  );

  return (
    // The only purpose of this Flex is to make zIndex work (Tooltip over Popover).
    <Flex alignItems="center" justifyContent="center" flex="none">
      <Tooltip
        accessibilityLabel=""
        text={tooltipMessage}
        idealDirection={idealDirection}
        zIndex={tooltipZIndex}
      >
        <TapArea
          accessibilityExpanded={open}
          accessibilityControls={popoverId}
          accessibilityLabel={accessibilityLabel}
          fullWidth={false}
          onTap={onHandleTap}
          ref={tapAreaRef}
          role="button"
          rounding="circle"
          onBlur={() => setFocused(false)}
          onFocus={() => setFocused(true)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onKeyDown={handleKeyDownTapArea}
        >
          <Box
            width={16}
            height={16}
            rounding="circle"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color={bgIconColor}
          >
            <Icon accessibilityLabel="" color="inverse" icon="question-mark" size={8} />
          </Box>
        </TapArea>
      </Tooltip>
      {open &&
        (isWithinScrollContainer ? (
          <Layer zIndex={zIndexWrapper}>{PopoverElement}</Layer>
        ) : (
          <Box data-test-id="zIndexLayer" zIndex={zIndexWrapper}>
            {PopoverElement}
          </Box>
        ))}
    </Flex>
  );
}

HelpButton.displayName = 'HelpButton';
