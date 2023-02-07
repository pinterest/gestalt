// @flow strict
import { type Node, Fragment, useRef, useState, useEffect, useId } from 'react';
import Box from './Box.js';
import TapArea from './TapArea.js';
import Popover from './Popover.js';
import Text from './Text.js';
import Link from './Link.js';
import Icon from './Icon.js';
import Tooltip from './Tooltip.js';
import Layer from './Layer.js';
import TrapFocusBehavior from './behaviors/TrapFocusBehavior.js';
import { type Indexable, CompositeZIndex, FixedZIndex } from './zIndex.js';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider.js';

type Props = {|
  /**
   * Supply a short, descriptive label for screen-readers to describe the popover content. Used for [accessibility](https://gestalt.pinterest.systems/web/popover#ARIA-attributes) purposes.
   */
  accessibilityPopoverLabel: string,
  /**
   * Specifies the preferred position of the tooltip and popover relative to HelpButton. See [Popover's ideal direction variant](https://gestalt.pinterest.systems/web/popover#Ideal-direction) to learn more.
   */
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  /**
   * If provided, displays a link at the bottom of the popover message.
   * - `href` is the URL the hyperlink points to.
   * - `text` is the displayed text for the link. See the [link variant](https://gestalt.pinterest.systems/web/helpbutton#With-a-link) for more details.
   * - Optionally use `accessibilityLabel` to supply a short, descriptive label for screen-readers to replace link texts that don't provide sufficient context about the link component behavior. Texts like "Click Here", or "Read More" can be confusing when a screen reader reads them out of context. In those cases, we must pass an alternative text to replace the link text. It populates `aria-label`. Screen readers read the `accessibilityLabel` prop, if present, instead of the link text. See [ Link's accessibility guidelines](https://gestalt.pinterest.systems/web/link#Accessibility) for more information.
   * - Optionally provide an `onClick` callback, which is fired when the link is clicked (pressed and released) with a mouse or keyboard. See [OnLinkNavigationProvider](https://gestalt.pinterest.systems/web/utilities/onlinknavigationprovider) to learn more about link navigation.
   */
  link?: {|
    accessibilityLabel?: string,
    href: string,
    onClick?: ({|
      event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
      dangerouslyDisableOnNavigation: () => void,
    |}) => void,
    text?: string,
  |},
  /**
   * Informational content that's displayed when the user clicks on HelpButton.
   */
  text: string,
  /**
   * Specifies the z-index for HelpButton's tooltip and popover to resolve any layering issues with other elements. See the [zIndex variant](https://gestalt.pinterest.systems/web/helpbutton#With-Z-index) for more details.
   */
  zIndex?: Indexable,
|};

const DEFAULT_ZINDEX = 2;

/**
 * [HelpButton](https://gestalt.pinterest.systems/web/helpbutton) is an affordance that accompanies an element on the screen. It helps describe or provide assistance on how to use the accompanying element.
 */
export default function HelpButton({
  accessibilityPopoverLabel,
  idealDirection = 'down',
  link,
  text,
  zIndex,
}: Props): Node {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const popoverId = useId();
  const {
    accessibilityTooltipMessage,
    accessibilityLinkLabel: accessibilityDefaultLinkLabel,
    accessibilityIcon,
  } = useDefaultLabelContext('HelpButton');

  useEffect(() => {
    if (isOpen && ref.current) {
      ref.current.focus();
    }
  }, [isOpen]);

  const toggleView = () => {
    setIsOpen((currVal) => !currVal);
  };

  const bgIconColor = isHover ? 'default' : 'subtle';

  const tooltipZIndex = zIndex ?? new FixedZIndex(DEFAULT_ZINDEX - 1);

  return (
    <Fragment>
      <Box
        dangerouslySetInlineStyle={{
          __style: {
            // The component main proposal is support or provide more infos to short texts on app
            // because that the display is inline-block, to better fit with text blocks.
            display: 'inline-block',
          },
        }}
        tabIndex={-1}
      >
        <TapArea
          accessibilityExpanded={isOpen}
          accessibilityControls={popoverId}
          accessibilityLabel={accessibilityTooltipMessage}
          fullWidth={false}
          onTap={toggleView}
          ref={ref}
          role="button"
          rounding="circle"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          onFocus={() => setIsHover(true)}
          onBlur={() => setIsHover(false)}
        >
          <Tooltip
            text={accessibilityTooltipMessage}
            idealDirection={idealDirection}
            zIndex={tooltipZIndex}
          >
            <Box
              width={16}
              height={16}
              rounding="circle"
              display="flex"
              alignItems="center"
              justifyContent="center"
              dangerouslySetInlineStyle={{
                __style: {
                  backgroundColor: `var(--color-text-${bgIconColor})`,
                },
              }}
            >
              <Icon
                accessibilityLabel={accessibilityIcon}
                color="inverse"
                icon="question-mark"
                size={8}
              />
            </Box>
          </Tooltip>
        </TapArea>
      </Box>
      {isOpen && (
        <Layer
          zIndex={
            zIndex
              ? new CompositeZIndex([new FixedZIndex(zIndex.index())])
              : new FixedZIndex(DEFAULT_ZINDEX)
          }
        >
          <Popover
            id={popoverId}
            accessibilityLabel={accessibilityPopoverLabel}
            anchor={ref.current}
            onDismiss={toggleView}
            idealDirection={idealDirection ?? 'down'}
            positionRelativeToAnchor={false}
          >
            <TrapFocusBehavior>
              <Box padding={4} rounding={4} minWidth={230} tabIndex={0}>
                <Text align="center">{text}</Text>
                {link?.href && (
                  <Box
                    padding={3}
                    with="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    marginTop={3}
                  >
                    <Text weight="bold" size="300">
                      <Link
                        accessibilityLabel={
                          link?.accessibilityLabel ?? accessibilityDefaultLinkLabel
                        }
                        display="inline"
                        href={link?.href}
                        externalLinkIcon="default"
                        onClick={link?.onClick}
                      >
                        {link?.text ?? accessibilityDefaultLinkLabel}
                      </Link>
                    </Text>
                  </Box>
                )}
              </Box>
            </TrapFocusBehavior>
          </Popover>
        </Layer>
      )}
    </Fragment>
  );
}
