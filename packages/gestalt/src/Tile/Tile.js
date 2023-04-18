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
   * The background color of the tile as a hex. Don't forget about tokenization
   */
  bgColor?: string,
  /**
   * The border color of the tile. Don't forget about tokenization
   */
  borderColor?: string,
  /**
   * Should the tile be disabled
   */
  disabled?: boolean,
  /**
   * Id to identify the tile
   */
  id?: string,
  /**
   * Indicate if tile is in a selected state
   */
  selected?: boolean,
  /**
   * Handler if the item is selected
   */
  onSelected?: (id: string, selected: boolean) => void,
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
  bgColor,
  borderColor,
  id = '',
  disabled = false,
  children,
  selected = false,
  tooltip,
  showCheckbox,
  onSelected,
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
    [styles.focused]: isFocusVisible,
    [styles.hovered]: isHovered && !isFocusVisible,
    [styles.disabled]: disabled,
  });

  const handleClick = () => {
    setIsSelected(!isSelected);
    if (onSelected) {
      onSelected(id, !isSelected);
    }
  };

  const generateSelectedColorStyles = () => {
    const styles: React.CSSProperties = {};
    if (!isSelected) return styles;

    // the interal base component uses hex codes
    // but could be passed in pre-tokenized values
    if (borderColor.startsWith('#') && borderColor) {
      styles.borderColor = `${borderColor}`;
    }
    if (bgColor.startsWith('#') && bgColor) {
      styles.backgroundColor = `${bgColor}`;
    }
    return styles;
  };

  const DisabledOverlay = () => {
    return <div className={classnames(styles.tile, styles.disabledOverlay)} />;
  };

  const TooltipWrapper = ({ tooltip, children }: { tooltip?: string, children: Node }) => {
    const tooltipZIndex = new FixedZIndex(1);
    if (!tooltip || disabled) return children;
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
    <div style={{ position: 'relative' }}>
      {disabled && <DisabledOverlay />}
      <TooltipWrapper tooltip={tooltip}>
        <div
          role="button"
          className={classes}
          onBlur={handleOnBlur}
          onClick={handleClick}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
          onKeyDown={handleKeyDown}
          style={generateSelectedColorStyles()}
        >
          <Flex direction="row">
            <Flex.Item>{children}</Flex.Item>
            <Flex.Item>
              {showCheckbox && (
                <Checkbox id={id} checked={isSelected} onChange={handleClick} size="sm" />
              )}
            </Flex.Item>
          </Flex>
        </div>
      </TooltipWrapper>
    </div>
  );
}
