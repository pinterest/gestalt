// @flow strict
import { type Node, useEffect, useState } from 'react';
import classnames from 'classnames';
import Checkbox from '../Checkbox.js';
import Flex from '../Flex.js';
import { ENTER } from '../keyCodes.js';
import Tooltip from '../Tooltip.js';
import useFocusVisible from '../useFocusVisible.js';
import useInteractiveStates from '../utils/useInteractiveStates.js';
import { FixedZIndex } from '../zIndex.js';
import styles from './Tile.css';

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
  onChange?: ({| selected: boolean, id?: string |}) => void,
  /**
   * Ties a visible checkbox to the tile's selected state
   */
  showCheckbox?: boolean,
  /**
   * Adds a Tooltip on hover/focus of the Tile. See the With Tooltip variant to learn more.
   */
  tooltip?: string,
|};

function DisabledOverlay() {
  return <div className={classnames(styles.tile, styles.disabledOverlay)} />;
}

function TooltipWrapper({
  tooltip,
  disabled,
  children,
}: {|
  tooltip?: string,
  children: Node,
  disabled?: boolean,
|}) {
  const tooltipZIndex = new FixedZIndex(1);
  if (!tooltip || disabled) return children;
  return (
    <Tooltip idealDirection="up" text={tooltip} zIndex={tooltipZIndex}>
      {children}
    </Tooltip>
  );
}

/**
 * [Tile] https://gestalt.pinterest.systems/web/tiledata component should be used for ... on the page.
 */
export default function Tile({
  bgColor,
  borderColor,
  id = '',
  disabled = false,
  children,
  selected = false,
  tooltip,
  showCheckbox,
  onChange,
}: Props): Node {
  const { handleOnBlur, handleOnMouseEnter, handleOnMouseLeave, isHovered } =
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
    if (onChange) {
      onChange({ id, selected: !isSelected });
    }
  };

  const generateSelectedColorStyles = () => {
    const colorStyles: React.CSSProperties = {};
    if (!isSelected) return styles;

    // the interal base component uses hex codes
    // but could be passed in pre-tokenized values
    if (borderColor.startsWith('#') && borderColor) {
      colorStyles.borderColor = `${borderColor}`;
    }
    if (bgColor.startsWith('#') && bgColor) {
      colorStyles.backgroundColor = `${bgColor}`;
    }
    return colorStyles;
  };

  const handleKeyDown = (event: SyntheticKeyboardEvent<HTMLDivElement>) => {
    if (event.keyCode === ENTER) {
      setIsSelected(!isSelected);
    }
  };

  return (
    <div style={{ position: 'relative' }} aria-disabled={disabled}>
      {disabled && <DisabledOverlay />}
      <TooltipWrapper tooltip={tooltip}>
        <div
          tabIndex={0}
          role="button"
          className={classes}
          onBlur={handleOnBlur}
          onClick={handleClick}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
          onKeyDown={handleKeyDown}
          style={generateSelectedColorStyles()}
        >
          <Flex direction="row" gap={2}>
            <Flex.Item>{children}</Flex.Item>
            {showCheckbox && (isSelected || isHovered) && (
              <Flex.Item>
                <Checkbox id={id} checked={isSelected} onChange={handleClick} size="sm" />
              </Flex.Item>
            )}
          </Flex>
        </div>
      </TooltipWrapper>
    </div>
  );
}
