// @flow strict
import { type Node, useEffect, useState } from 'react';
import styles from './Tile.css';
import Box from '../Box.js';

import classnames from 'classnames';
import useInteractiveStates from '../utils/useInteractiveStates';
import Tooltip from '../Tooltip.js';
import Flex from '../Flex.js';
import Checkbox from '../Checkbox.js';
import { FixedZIndex } from '../zIndex';
import useFocusVisible from '../useFocusVisible';
import { ENTER } from '../keyCodes';

type Props = {|
  /**
   * Prop description.
   */
  children?: Node,
  /**
   * Omit if and only if an ancestor element already has the aria-label set.
   * This is similar to having [empty alt attributes](https://davidwalsh.name/accessibility-tip-empty-alt-attributes).
   */
  accessibilityLabel?: string,
  /**
   * Indicate if Pog is in an active state. See [state combinations](https://gestalt.pinterest.systems/web/pog#stateCombinations) for more details.
   */
  active?: boolean,
  /**
   * The background color of the tile
   */
  bgColor?: string,
  /**
   * The border color of the tile
   */
  borderColor?: string,
  /**
   * Indicate if Pog is in a focused state. See [state combinations](https://gestalt.pinterest.systems/web/pog#stateCombinations) for more details.
   */
  focused?: boolean,
  /**
   * Indicate if Pog is in a hovered state. See [state combinations](https://gestalt.pinterest.systems/web/pog#stateCombinations) for more details.
   */
  hovered?: boolean,
  /**
   * Padding in boints. If omitted, padding is derived from the \`size\` prop. See [padding combinations](https://gestalt.pinterest.systems/web/pog#paddingCombinations) for more details.
   */
  padding?: 1 | 2 | 3 | 4 | 5,
  /**
   * Indicate if tile is in a selected state
   */
  selected?: boolean,
  /**
   * This controls the icon size and the default padding size. Available sizes are "xs" (12px), "sm" (16px), "md" (18px), "lg" (20px), and "xl" (24px). If padding is omitted, button sizes are "xs" (24px), "sm" (32px), "md" (40px), "lg" (48px), and "xl" (56px). See [size combinations](https://gestalt.pinterest.systems/web/pog#sizeCombinations) for more details.
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  /**
   * Ties a visible checkbox to the tile's selected state
   */
  showCheckbox?: boolean,
  /**
   * Adds a Tooltip on hover/focus of the Tile. See the With Tooltip variant to learn more.
   */
  tooltip?: string,
|};

/**
 * [Tile] https://gestalt.pinterest.systems/web/tiledata component should be used for ... on the page.
 */
export default function Tile({
  accessibilityLabel = '',
  active = false,
  bgColor = 'secondary',
  children,
  focused = false,
  hovered = false,
  padding,
  selected = false,
  size = 'md',
  tooltip,
  showCheckbox,
}: Props): Node {
  const { handleOnBlur, handleOnFocus, handleOnMouseEnter, handleOnMouseLeave, isHovered } =
    useInteractiveStates();

  const [isSelected, setIsSelected] = useState(selected);
  const { isFocusVisible } = useFocusVisible();

  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  const classes = classnames(styles.tile, {
    [styles.selected]: isSelected,
    [styles.transparent]: !isSelected,
    [styles.focused]: isFocusVisible,
    [styles.hovered]: isHovered && !isFocusVisible,
  });

  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  const TooltipWrapper = ({ tooltip, children }: { tooltip?: string, children: Node }) => {
    const tooltipZIndex = new FixedZIndex(1);
    if (!tooltip) return children;
    return (
      <Tooltip idealDirection="up" text={tooltip} zIndex={tooltipZIndex}>
        {children}
      </Tooltip>
    );
  };

  const handleKeyDown = (event: SyntheticKeyboardEvent<HTMLDivElement>) => {
    if (event.keyCode === ENTER) {
      setIsSelected(!isSelected);
    }
  };

  return (
    <TooltipWrapper tooltip={''}>
      <div
        role="button"
        className={classes}
        onBlur={handleOnBlur}
        onClick={handleClick}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        onKeyDown={handleKeyDown}
      >
        <Flex direction="row">
          <Flex.Item>{children}</Flex.Item>
          <Flex.Item>
            {isSelected && showCheckbox && (
              <Checkbox id={`tile-id`} checked={isSelected} onChange={() => {}} size="sm" />
            )}
          </Flex.Item>
        </Flex>
      </div>
    </TooltipWrapper>
  );
}
