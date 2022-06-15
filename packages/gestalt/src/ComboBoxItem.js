// @flow strict
import { forwardRef, type Node } from 'react';
import classnames from 'classnames';
import Text from './Text.js';
import Icon from './Icon.js';
import focusStyles from './Focus.css';
import touchableStyles from './Touchable.css';
import layoutStyles from './Layout.css';
import flexStyles from './Flex.css';
import bordersStyles from './Borders.css';
import boxWhitespaceStyles from './boxWhitespace.css';
import colorStyles from './Colors.css';

export type ComboBoxItemType = {|
  label: string,
  subtext?: string,
  value: string,
|};

type Props = {|
  id: string,
  index: number,
  isHovered: boolean,
  isSelected: boolean,
  label: string,
  onSelect?: ({|
    item: ComboBoxItemType,
    event: SyntheticInputEvent<HTMLInputElement>,
  |}) => void,
  setHoveredItemIndex: (number) => void,
  subtext?: string,
  value: string,
|};

const ComboBoxItemWithForwardRef: React$AbstractComponent<Props, ?HTMLElement> = forwardRef<
  Props,
  ?HTMLElement,
>(function OptionItem(
  { isHovered, id, index, isSelected, label, onSelect, setHoveredItemIndex, subtext, value }: Props,
  ref,
): Node {
  const handleEventPreventDefault = (event) => event.preventDefault();

  const handleOnTap = (event) => onSelect?.({ event, item: { label, value, subtext } });

  const handleOnMouseEnter = () => setHoveredItemIndex(index);

  return (
    <div
      aria-selected={isSelected}
      className={classnames(
        focusStyles.hideOutline,
        touchableStyles.fullWidth,
        touchableStyles.pointer,
      )}
      id={`${id}-item-${index}`}
      onClick={handleOnTap}
      onKeyPress={handleEventPreventDefault}
      onMouseDown={handleEventPreventDefault}
      onMouseEnter={handleOnMouseEnter}
      ref={isHovered ? ref : null}
      role="option"
      tabIndex={-1}
    >
      <div
        className={classnames(
          flexStyles.Flex,
          bordersStyles.rounding2,
          boxWhitespaceStyles.paddingX2,
          boxWhitespaceStyles.paddingY2,
          { [colorStyles.lightGrayBg]: isHovered, [colorStyles.transparentBg]: !isHovered },
        )}
      >
        <div
          className={classnames(layoutStyles.flexGrow, flexStyles.Flex, layoutStyles.flexColumn)}
        >
          <Text color="default" inline lineClamp={1}>
            {label}
          </Text>
          {subtext && (
            <Text size="200" inline color="subtle" lineClamp={2}>
              {subtext}
            </Text>
          )}
        </div>
        <div
          className={classnames(
            flexStyles.Flex,
            layoutStyles.itemsCenter,
            layoutStyles.justifyCenter,
          )}
        >
          {isSelected ? (
            <Icon accessibilityLabel="Selected item" color="default" icon="check" size={12} />
          ) : (
            <div style={{ width: '12px' }} />
          )}
        </div>
      </div>
    </div>
  );
});

ComboBoxItemWithForwardRef.displayName = 'ComboBoxItem';

export default ComboBoxItemWithForwardRef;
