import { forwardRef, ReactNode } from 'react';
import classnames from 'classnames';
import bordersStyles from '../Borders.css';
import boxWhitespaceStyles from '../boxWhitespace.css';
import styles from '../ComboBox.css';
import flexStyles from '../Flex.css';
import focusStyles from '../Focus.css';
import Icon from '../Icon';
import layoutStyles from '../Layout.css';
import touchableStyles from '../TapArea.css';
import Text from '../Text';

export type ComboBoxItemType = {
  label: string;
  subtext?: string;
  value: string;
};

type Props = {
  id: string;
  index: number;
  isHovered: boolean;
  isSelected: boolean;
  label: string;
  onSelect?: (arg1: { item: ComboBoxItemType; event: React.ChangeEvent<HTMLInputElement> }) => void;
  setHoveredItemIndex: (arg1: number) => void;
  subtext?: string;
  value: string;
};

const ComboBoxItemWithForwardRef = forwardRef<HTMLElement | null | undefined, Props>(
  function OptionItem(
    {
      isHovered,
      id,
      index,
      isSelected,
      label,
      onSelect,
      setHoveredItemIndex,
      subtext,
      value,
    }: Props,
    ref,
  ): ReactNode {
    const handleEventPreventDefault = (event: React.ChangeEvent<HTMLDivElement>) =>
      event.preventDefault();

    const handleOnTap = (event: React.ChangeEvent<HTMLInputElement>) =>
      onSelect?.({ event, item: { label, value, subtext } });

    const handleOnMouseEnter = () => setHoveredItemIndex(index);

    return (
      <div
        ref={isHovered ? ref : null}
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
        role="option"
        tabIndex={-1}
      >
        <div
          className={classnames(
            flexStyles.Flex,
            bordersStyles.rounding2,
            boxWhitespaceStyles.paddingX2,
            boxWhitespaceStyles.paddingY2,
            {
              [styles.hoveredItem]: isHovered,
              [styles.item]: !isHovered,
            },
          )}
        >
          <div
            className={classnames(layoutStyles.flexGrow, flexStyles.Flex, layoutStyles.flexColumn)}
          >
            <Text color="default" inline lineClamp={1}>
              {label}
            </Text>
            {subtext && (
              <Text color="subtle" inline lineClamp={2} size="200">
                {subtext}
              </Text>
            )}
          </div>
          <div
            className={classnames(
              flexStyles.Flex,
              layoutStyles.xsItemsCenter,
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
  },
);

ComboBoxItemWithForwardRef.displayName = 'ComboBoxItem';

export default ComboBoxItemWithForwardRef;
