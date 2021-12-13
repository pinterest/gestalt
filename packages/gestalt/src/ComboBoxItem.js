// @flow strict
import { forwardRef, type Node } from 'react';
import Text from './Text.js';
import Icon from './Icon.js';
import focusStyles from './Focus.css';

export type OptionItemType = {|
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
    item: OptionItemType,
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
      className={focusStyles.hideOutline}
      id={`${id}-item-${index}`}
      onClick={handleOnTap}
      onKeyPress={handleEventPreventDefault}
      onMouseDown={handleEventPreventDefault}
      onMouseEnter={handleOnMouseEnter}
      ref={isHovered ? ref : null}
      role="option"
      style={{ cursor: 'pointer', width: '100%' }}
      tabIndex={-1}
    >
      <div
        style={{
          display: 'flex',
          padding: '8px',
          borderRadius: '8px',
          backgroundColor: isHovered ? '#efefef' : 'transparent',
        }}
      >
        <div style={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column' }}>
          <Text color="darkGray" inline lineClamp={1}>
            {label}
          </Text>
          {subtext && (
            <Text size="md" inline color="gray" lineClamp={2}>
              {subtext}
            </Text>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isSelected ? (
            <Icon accessibilityLabel="Selected item" color="darkGray" icon="check" size={12} />
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
