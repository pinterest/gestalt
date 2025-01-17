import { ComponentProps, ReactElement, useId, useRef, useState } from 'react';
import classnames from 'classnames';
import Box from './Box';
import { useColorScheme } from './contexts/ColorSchemeProvider';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider';
import Flex from './Flex';
import focusStyles from './Focus.css';
import styles from './HelpButton.css';
import Icon from './Icon';
import { ESCAPE, TAB } from './keyCodes';
import Layer from './Layer';
import Link from './Link';
import InternalPopover from './Popover/InternalPopover';
import MaybeTooltip from './sharedSubcomponents/MaybeTooltip';
import TapArea from './TapArea';
import Text from './Text';
import useFocusVisible from './useFocusVisible';
import useInExperiment from './useInExperiment';
import { CompositeZIndex, FixedZIndex, Indexable } from './zIndex';

type LinkType = {
  accessibilityLabel?: ComponentProps<typeof Link>['accessibilityLabel'];
  externalLinkIcon?:
    | 'none'
    | 'default'
    | {
        color: ComponentProps<typeof Icon>['color'];
        size: ComponentProps<typeof Text>['size'];
      };
  href: ComponentProps<typeof Link>['href'];
  onClick?: ComponentProps<typeof Link>['onClick'];
  ref?: ComponentProps<typeof Link>['ref'];
  text: string;
  target?: ComponentProps<typeof Link>['target'];
};

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
  onClick?: (arg1: {
    event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>;
  }) => void;
  /**
   * Informational content that's displayed when the user clicks on HelpButton.
   */
  text: string | ReactElement;
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
  const tapAreaRef = useRef<null | HTMLDivElement>(null);
  const textRef = useRef<null | HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const { isFocusVisible } = useFocusVisible();

  // Define where the focused content stays
  const [innerModalFocus, setInnerModalFocus] = useState(false);

  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });
  const { colorSchemeName } = useColorScheme();
  const popoverId = useId();
  const { tooltipMessage } = useDefaultLabelContext('HelpButton');

  const handlePopoverKeyDown: ComponentProps<typeof InternalPopover>['onKeyDown'] = ({ event }) => {
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

  const handleTapAreaKeyDown: ComponentProps<typeof TapArea>['onKeyDown'] = ({ event }) => {
    if (event.keyCode === TAB && open) {
      event.preventDefault();
      textRef.current?.focus();
      setInnerModalFocus(true);
    }
    // Avoid others KeyDown events to listen this call
    event.stopPropagation();
  };

  const toggleView = () => setOpen((currVal) => !currVal);

  let bgIconColor: ComponentProps<typeof Box>['color'] = isInVRExperiment ? 'default' : 'tertiary';
  let iconColor: ComponentProps<typeof Icon>['color'] = isInVRExperiment ? 'subtle' : 'inverse';

  if (!isInVRExperiment && (open || hovered || focused)) {
    bgIconColor = 'selected';
  }

  if (isInVRExperiment && (open || hovered || focused)) {
    iconColor = 'default';
  }

  // Overriding color of `Text` components
  const isDarkMode = colorSchemeName === 'darkMode';
  const textColorOverrideStyles = isDarkMode
    ? styles.textColorOverrideLight
    : styles.textColorOverrideDark;

  const tooltipZIndex = zIndex ?? new FixedZIndex(1);

  const zIndexWrapper = new CompositeZIndex([tooltipZIndex]);

  const popoverElement = (
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
        <div
          ref={textRef}
          className={classnames({
            [focusStyles.hideOutline]: !isFocusVisible,
            [focusStyles.accessibilityOutline]: !isInVRExperiment && isFocusVisible,
            [styles.focused]: isInVRExperiment && isFocusVisible,
          })}
          id={`helpButtonText-${popoverId}`}
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
        >
          {typeof text === 'string' ? (
            <Text align="start">{text}</Text>
          ) : (
            <span className={textColorOverrideStyles}>{text}</span>
          )}
        </div>
        {link && link?.href && (
          <Box display="block" marginTop={isInVRExperiment ? 5 : 3} width="100%">
            <Text>
              <Link
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
      <MaybeTooltip
        disabled={open}
        tooltip={{
          idealDirection,
          text: tooltipMessage,
          zIndex: tooltipZIndex,
          accessibilityLabel: '',
        }}
      >
        <TapArea
          ref={tapAreaRef}
          accessibilityControls={popoverId}
          accessibilityExpanded={open}
          accessibilityLabel={accessibilityLabel}
          fullWidth={false}
          innerFocusColor={isInVRExperiment ? 'default' : undefined}
          onBlur={() => setFocused(false)}
          onFocus={() => setFocused(true)}
          onKeyDown={handleTapAreaKeyDown}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onTap={({ event }) => {
            toggleView();
            onClick?.({ event });
          }}
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
            <Icon
              accessibilityLabel=""
              color={iconColor}
              icon="question-mark"
              size={isInVRExperiment ? 16 : 8}
            />
          </Box>
        </TapArea>
      </MaybeTooltip>
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
