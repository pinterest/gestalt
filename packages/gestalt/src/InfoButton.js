// @flow strict
import { type Node, Fragment, useRef, useState } from 'react';
import Box from './Box.js';
import TapArea from './TapArea.js';
import Popover from './Popover.js';
import Text from './Text.js';
import Link from './Link.js';
import Icon from './Icon.js';
import Tooltip from './Tooltip.js';
import Layer from './Layer.js';
import styles from './InfoButton.css';
import TrapFocusBehavior from './behaviors/TrapFocusBehavior.js';

import { useDefaultLabelContext } from './contexts/DefaultLabelProvider.js';

type Props = {|
  /**
   * Informational context that’s displayed when click on `Click to learn more` button
   */
  text: string,
  /**
   * Supply a short, descriptive label for screen-readers to describe the Popover content. Used for [accessibility](https://gestalt.pinterest.systems/web/popover#ARIA-attributes) purposes.
   */
  accessibilityLabel: string,
  /**
   * Supply a short, descriptive label for screen-readers to replace link texts that don't provide sufficient context about the link component behavior. Texts like "Click Here", or "Read More" can be confusing when a screen reader reads them out of context. In those cases, we must pass an alternative text to replace the link text. It populates `aria-label`. Screen readers read the `accessibilityLabel` prop, if present, instead of the link text. See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/link#Accessibility) for more information.
   */
  accessibilityLinkLabel?: string,
  /**
   * The URL that the hyperlink points to.
   */
  linkHref?: string,
  /**
   * Text showed on link trigger
   */
  linkText?: string,
  /**
   * Callback fired when Link is clicked (pressed and released) with a mouse or keyboard. See [OnLinkNavigationProvider](https://gestalt.pinterest.systems/web/utilities/onlinknavigationprovider) to learn more about link navigation.
   */
  onClickLink?: ({|
    event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
    dangerouslyDisableOnNavigation: () => void,
  |}) => void,
|};

/**
 * [InfoButton](https://gestalt.pinterest.systems/web/infobutton)
 */
function InfoButton({
  text,
  accessibilityLabel,
  linkHref,
  linkText,
  onClickLink,
  accessibilityLinkLabel,
}: Props): Node {
  const ref = useRef<?HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { accessibilityDefaultTooltipMessage, accessibilityDefaultLinkLabel, accessibilityIcon } =
    useDefaultLabelContext('InfoButton');

  const toggleView = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      ref.current?.focus();
    }
  };

  return (
    <Fragment>
      <TapArea
        accessibilityExpanded={isOpen}
        accessibilityControls="info-dialog"
        accessibilityLabel={accessibilityDefaultTooltipMessage}
        fullWidth={false}
        onTap={toggleView}
        ref={ref}
        rounding="circle"
      >
        <Tooltip text={accessibilityDefaultTooltipMessage}>
          <div className={styles.infoButton}>
            <Icon
              accessibilityLabel={accessibilityIcon}
              color="inverse"
              icon="question-mark"
              size={8}
            />
          </div>
        </Tooltip>
      </TapArea>
      {isOpen && (
        <Layer>
          <Popover
            id="info-dialog"
            accessibilityLabel={accessibilityLabel ?? accessibilityDefaultLinkLabel}
            anchor={ref.current}
            onDismiss={toggleView}
            idealDirection="down"
            positionRelativeToAnchor={false}
          >
            <TrapFocusBehavior>
              <Box padding={4} rounding={4} minWidth={230} tabIndex={0}>
                <Text align="center">{text}</Text>
                {linkHref && (
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
                        accessibilityLabel={accessibilityLinkLabel ?? accessibilityDefaultLinkLabel}
                        display="inline"
                        href={linkHref}
                        externalLinkIcon="default"
                        onClick={onClickLink}
                      >
                        {linkText ?? accessibilityDefaultLinkLabel}
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

export default InfoButton;
