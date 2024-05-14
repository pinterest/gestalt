import { ComponentProps, Ref, useId, useRef, useState } from 'react';
import Box from './Box';
import { useColorScheme } from './contexts/ColorSchemeProvider';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider';
import Flex from './Flex';
import styles from './HelpButton.css';
import Icon from './Icon';
import { ESCAPE, TAB } from './keyCodes';
import Layer from './Layer';
import Link from './Link';
import InternalPopover from './Popover/InternalPopover';
import TapArea from './TapArea';
import Text from './Text';
import Tooltip from './Tooltip';
import { CompositeZIndex, FixedZIndex, Indexable } from './zIndex';

type LinkType = {
  accessibilityLabel?: string;
  externalLinkIcon?:
    | 'none'
    | 'default'
    | {
        color: ComponentProps<typeof Icon>['color'];
        size: ComponentProps<typeof Text>['size'];
      };
  href: string;
  onClick?: (arg1: {
    event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>;
    dangerouslyDisableOnNavigation: () => void;
  }) => void;
  ref?: Ref<'a'>;
  text: string;
  target?: null | 'self' | 'blank';
};

type OnTapType = (arg1: {
  event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>;
}) => void;

type Props = {
  /**
   * Supply a short, descriptive label screen readers. Follow the pattern `Click to learn more about [description]`. See [Accessibility](https://gestalt.pinterest.systems/web/helpbutton#Accessibility) section for guidance.
   */
  accessibilityLabel: string;
  /**
   * Supply a short, descriptive label for screen-readers to describe the popover content. Used for [accessibility](https://gestalt.pinterest.systems/web/popover#ARIA-attributes) purposes.
   */
  accessibilityPopoverLabel: string;
  /**
   * Specifies the preferred position of the tooltip and popover relative to HelpButton. See [Popover's ideal direction variant](https://gestalt.pinterest.systems/web/popover#Ideal-direction) to learn more.
   */
  idealDirection?: 'up' | 'right' | 'down' | 'left';
  /**
   * Enables correct behavior when HelpButton is used within a fixed container. To achieve this it removes the Layer component around Popover and enables positioning relative to its anchor element. Should only be used in cases where Layer breaks the HelpButton positionings such as when the anchor element is within a sticky component.
   */
  isWithinFixedContainer?: boolean;
  /**
   * If provided, displays a [link api](https://gestalt.pinterest.systems/web/link#Props) at the bottom of the popover message.
   * - `href` is the URL that the hyperlink points to.
   * - `text` is the displayed text for the link. See the [link variant](https://gestalt.pinterest.systems/web/helpbutton#With-a-link) for more details.
   * - `target` see the [target Link variant](https://gestalt.pinterest.systems/web/link#Target) to learn more. If not defined the link will open in a new window.
   * - Optionally use `accessibilityLabel` to supply a short, descriptive label for screen-readers to replace link texts that don't provide sufficient context about the link component behavior. Texts like "Click Here", or "Read More" can be confusing when a screen reader reads them out of context. In those cases, we must pass an alternative text to replace the link text. It populates `aria-label`. Screen readers read the `accessibilityLabel` prop, if present, instead of the link text. See [ Link's accessibility guidelines](https://gestalt.pinterest.systems/web/link#Accessibility) for more information.
   * - Optionally provide an `onClick` callback, which is fired when the link is clicked (pressed and released) with a mouse or keyboard. See [GlobalEventsHandlerProvider](https://gestalt.pinterest.systems/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.
   */
  link?: LinkType;
  /**
   * Callback fired when HelpIcon is clicked (pressed and released) with a mouse or keyboard.
   */
  onClick?: OnTapType;
  /**
   * Informational content that's displayed when the user clicks on HelpButton.
   */
  // @ts-expect-error - TS2315 - Type 'Element' is not generic.
  text: string | Element<typeof Text>;
  /**
   * Specifies the z-index for HelpButton's tooltip and popover to resolve any layering issues with other elements. See the [zIndex variant](https://gestalt.pinterest.systems/web/helpbutton#With-Z-index) for more details.
   */
  zIndex?: Indexable;
};

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
}: Props) {
  const tapAreaRef = useRef<null | HTMLAnchorElement | HTMLDivElement>(null);
  const textRef = useRef<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  // Define where the focused content stays
  const [innerModalFocus, setInnerModalFocus] = useState(false);
  const { colorSchemeName } = useColorScheme();
  const popoverId = useId();
  const { tooltipMessage } = useDefaultLabelContext('HelpButton');

  const handlePopoverKeyDown = ({ event }: { event: React.KeyboardEvent<HTMLElement> }) => {
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

  const handleTapAreaKeyDown = ({ event }: { event: React.KeyboardEvent<HTMLDivElement> }) => {
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
    ...args: ReadonlyArray<{
      event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>;
    }>
  ) => {
    toggleView();
    // @ts-expect-error - TS2556 - A spread argument must either have a tuple type or be passed to a rest parameter.
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
    // @ts-expect-error - TS2786 - 'InternalPopover' cannot be used as a JSX component.
    <InternalPopover
      accessibilityLabel={accessibilityPopoverLabel}
      anchor={tapAreaRef.current}
      color="white"
      disablePortal={isWithinFixedContainer}
      hideWhenReferenceHidden
      id={popoverId}
      idealDirection={idealDirection}
      onDismiss={toggleView}
      onKeyDown={handlePopoverKeyDown}
      role="dialog"
      shouldFocus
      showCaret={false}
      size="sm"
    >
      <Box height="auto" padding={5} rounding={4}>
        {/*
         * `id` - used to tracking children by line 130
         * `tabIndex={0}` - It's used to make the text element as a focusable element
         */}
        {/* @ts-expect-error - TS2322 - Type '{ children: Element; ref: MutableRefObject<HTMLElement | null>; id: string; tabIndex: number; }' is not assignable to type 'IntrinsicAttributes & Omit<Props, "ref"> & RefAttributes<HTMLElement>'. */}
        <Box ref={textRef} id={`helpButtonText-${popoverId}`} tabIndex={0}>
          {textElement}
        </Box>
        {link && link?.href && (
          <Box display="block" marginTop={3} width="100%">
            <Text>
              <Link
                // @ts-expect-error - TS2322 - Type 'Ref<"a"> | undefined' is not assignable to type 'LegacyRef<HTMLAnchorElement> | undefined'.
                ref={link.ref}
                accessibilityLabel={link.accessibilityLabel}
                externalLinkIcon={link.externalLinkIcon}
                href={link.href}
                onBlur={() => setFocused(false)}
                onClick={link.onClick}
                onFocus={() => setFocused(true)}
                target={link.target ?? 'blank'}
                underline="always"
              >
                {link.text}
              </Link>
            </Text>
          </Box>
        )}
      </Box>
    </InternalPopover>
  );

  return (
    // The only purpose of this Flex is to make zIndex work (Tooltip over Popover).
    <Flex alignItems="center" flex="none" justifyContent="center">
      <Tooltip
        accessibilityLabel=""
        idealDirection={idealDirection}
        text={tooltipMessage}
        zIndex={tooltipZIndex}
      >
        <TapArea
          // @ts-expect-error - TS2322 - Type 'MutableRefObject<HTMLDivElement | HTMLAnchorElement | null>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'.
          ref={tapAreaRef}
          accessibilityControls={popoverId}
          accessibilityExpanded={open}
          accessibilityLabel={accessibilityLabel}
          fullWidth={false}
          onBlur={() => setFocused(false)}
          onFocus={() => setFocused(true)}
          onKeyDown={handleTapAreaKeyDown}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onTap={onHandleTap}
          role="button"
          rounding="circle"
        >
          <Box
            alignItems="center"
            color={bgIconColor}
            display="flex"
            height={16}
            justifyContent="center"
            rounding="circle"
            width={16}
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
          // @ts-expect-error - TS2786 - 'Layer' cannot be used as a JSX component.
          <Layer zIndex={zIndexWrapper}>{popoverElement}</Layer>
        ))}
    </Flex>
  );
}

HelpButton.displayName = 'HelpButton';
