// @flow strict
import {
  type Node,
  type Element,
  type ElementConfig,
  type Ref,
  useRef,
  useState,
  useId,
} from 'react';
import styles from './HelpButton.css';
import Box from './Box.js';
import Flex from './Flex.js';
import Icon from './Icon.js';
import { ESCAPE, TAB } from './keyCodes.js';
import Layer from './Layer.js';
import Link from './Link.js';
import Popover from './Popover.js';
import TapArea from './TapArea.js';
import Text from './Text.js';
import Tooltip from './Tooltip.js';
import { type Indexable, CompositeZIndex, FixedZIndex } from './zIndex.js';
import { useColorScheme } from './contexts/ColorSchemeProvider.js';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider.js';

type LinkType = {|
  accessibilityLabel?: string,
  externalLinkIcon?:
    | 'none'
    | 'default'
    | {|
        color: $ElementType<ElementConfig<typeof Icon>, 'color'>,
        size: $ElementType<ElementConfig<typeof Text>, 'size'>,
      |},
  href: string,
  onClick?: ({|
    event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
    dangerouslyDisableOnNavigation: () => void,
  |}) => void,
  ref?: Ref<'a'>,
  text: string,
  target?: null | 'self' | 'blank',
|};

type OnTapType = ({|
  event:
    | SyntheticMouseEvent<HTMLDivElement>
    | SyntheticKeyboardEvent<HTMLDivElement>
    | SyntheticMouseEvent<HTMLAnchorElement>
    | SyntheticKeyboardEvent<HTMLAnchorElement>,
  dangerouslyDisableOnNavigation: () => void,
|}) => void;

type Props = {|
  /**
   * Supply a short, descriptive label screen readers. Follow the pattern `Click to learn more about [description]`. See [Accessibility](https://gestalt.pinterest.systems/web/helpbutton#Accessibility) section for guidance.
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
   * Enables correct behavior when HelpButton is used within a fixed container. To achieve this it removes the Layer component around Popover and enables positioning relative to its anchor element. Should only be used in cases where Layer breaks the HelpButton positionings such as when the anchor element is within a sticky component.
   */
  isWithinFixedContainer?: boolean,
  /**
   * If provided, displays a [link api](https://gestalt.pinterest.systems/web/link#Props) at the bottom of the popover message.
   * - `href` is the URL that the hyperlink points to.
   * - `text` is the displayed text for the link. See the [link variant](https://gestalt.pinterest.systems/web/helpbutton#With-a-link) for more details.
   * - `target` see the [target Link variant](https://gestalt.pinterest.systems/web/link#Target) to learn more. If not defined the link will open in a new window.
   * - Optionally use `accessibilityLabel` to supply a short, descriptive label for screen-readers to replace link texts that don't provide sufficient context about the link component behavior. Texts like "Click Here", or "Read More" can be confusing when a screen reader reads them out of context. In those cases, we must pass an alternative text to replace the link text. It populates `aria-label`. Screen readers read the `accessibilityLabel` prop, if present, instead of the link text. See [ Link's accessibility guidelines](https://gestalt.pinterest.systems/web/link#Accessibility) for more information.
   * - Optionally provide an `onClick` callback, which is fired when the link is clicked (pressed and released) with a mouse or keyboard. See [OnLinkNavigationProvider](https://gestalt.pinterest.systems/web/utilities/onlinknavigationprovider) to learn more about link navigation.
   */
  link?: LinkType,
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
  isWithinFixedContainer = false,
  link,
  onClick,
  text,
  zIndex,
}: Props): Node {
  const tapAreaRef = useRef<null | HTMLAnchorElement | HTMLDivElement>(null);
  const textRef = useRef<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  // Define where the focused content stays
  const [innerModalFocus, setInnerModalFocus] = useState(false);
  const { name: colorSchemeName } = useColorScheme();
  const popoverId = useId();
  const { tooltipMessage } = useDefaultLabelContext('HelpButton');

  const handlePopoverKeyDown = ({ event }: {| event: SyntheticKeyboardEvent<HTMLElement> |}) => {
    // Avoid others KeyDown events to listen this call
    if (innerModalFocus) event.stopPropagation();

    // # Manual trap focus
    // If `TAB is clicked` when the focus is on `lastElement` of popover
    // the focus back to `textRef` element.
    const elementsInnerPopover = document.querySelectorAll(
      [
        `div[id="helpButtonText-${popoverId}"]`, // Text query
        `a[href="${link?.href ?? ''}"]`, // Link query
      ].join(' ,'),
    );
    const lastElement = elementsInnerPopover[elementsInnerPopover.length - 1];
    if (innerModalFocus && event.keyCode === TAB && lastElement === event.target) {
      event.preventDefault();
      textRef.current?.focus();
    }

    // If the popover was closed pressing `ESCAPE`, the focus back to TapArea element
    if (event.keyCode === ESCAPE && open) {
      setOpen(false);
      tapAreaRef.current?.focus();
    }
  };

  const handleTapAreaKeyDown = ({
    event,
  }: {|
    event: SyntheticKeyboardEvent<HTMLDivElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
  |}) => {
    if (event.keyCode === TAB && open) {
      event.preventDefault();
      textRef.current?.focus();
      setInnerModalFocus(true);
    }
    // Avoid others KeyDown events to listen this call
    event.stopPropagation();
  };

  const toggleView = () => {
    setOpen((currVal) => !currVal);
  };

  const onHandleTap = (
    ...args: $ReadOnlyArray<{|
      dangerouslyDisableOnNavigation: () => void,
      event:
        | SyntheticMouseEvent<HTMLDivElement>
        | SyntheticKeyboardEvent<HTMLDivElement>
        | SyntheticMouseEvent<HTMLAnchorElement>
        | SyntheticKeyboardEvent<HTMLAnchorElement>,
    |}>
  ) => {
    toggleView();
    onClick?.(...args);
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

  const popoverElement = (
    <Popover
      id={popoverId}
      accessibilityLabel={accessibilityPopoverLabel}
      anchor={tapAreaRef.current}
      onDismiss={toggleView}
      onKeyDown={handlePopoverKeyDown}
      idealDirection={idealDirection}
      positionRelativeToAnchor={isWithinFixedContainer}
    >
      <Box padding={5} rounding={4} height="auto">
        {/*
         * `id` - used to tracking children by line 130
         * `tabIndex={0}` - It's used to make the text element as a focusable element
         */}
        <Box id={`helpButtonText-${popoverId}`} tabIndex={0} ref={textRef}>
          {textElement}
        </Box>
        {link && link?.href && (
          <Box width="100%" display="block" marginTop={3}>
            <Text>
              <Link
                accessibilityLabel={link.accessibilityLabel}
                externalLinkIcon={link.externalLinkIcon}
                href={link.href}
                onClick={link.onClick}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                ref={link.ref}
                target={link.target ?? 'blank'}
                underline="always"
              >
                {link.text}
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
          onKeyDown={handleTapAreaKeyDown}
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
        (isWithinFixedContainer ? (
          // This Box is  handling the zIndex work (Tooltip over Popover)
          <Box data-test-id="zIndexLayer" zIndex={zIndexWrapper}>
            {popoverElement}
          </Box>
        ) : (
          <Layer zIndex={zIndexWrapper}>{popoverElement}</Layer>
        ))}
    </Flex>
  );
}

HelpButton.displayName = 'HelpButton';
