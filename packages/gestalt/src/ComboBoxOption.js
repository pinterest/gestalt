// @flow strict
import { useCallback, useMemo, forwardRef, type Node } from 'react';
import Box from './Box.js';
import Text from './Text.js';
import Icon from './Icon.js';
import focusStyles from './Focus.css';

export type OptionItemType = {|
  label: string,
  subtext?: string,
  value: string,
|};

type Props = {|
  isHovered: boolean,
  id: string,
  index: number,
  onSelect?: ({|
    item: OptionItemType,
    event: SyntheticInputEvent<HTMLInputElement>,
  |}) => void,
  label: string,
  subtext?: string,
  value: string,
  selectedValue?: string | null,
  setHoveredItemIndex: (number) => void,
|};

const OptionItemWithForwardRef: React$AbstractComponent<Props, ?HTMLElement> = forwardRef<
  Props,
  ?HTMLElement,
>(function OptionItem(
  {
    onSelect,
    isHovered,
    id,
    index,
    label,
    subtext,
    value,
    selectedValue,
    setHoveredItemIndex,
  }: Props,
  ref,
): Node {
  // Determine if the option is a current selected item
  const isSelectedItem = value === selectedValue;

  return (
    <div
      aria-selected={isSelectedItem}
      className={focusStyles.hideOutline}
      id={`${id}-item-${index}`}
      onClick={useCallback((event) => onSelect?.({ event, item: { label, subtext, value } }), [
        onSelect,
        label,
        subtext,
        value,
      ])}
      onKeyPress={useCallback((event) => event.preventDefault(), [])}
      onMouseDown={useCallback((event) => event.preventDefault(), [])}
      onMouseEnter={useCallback(() => setHoveredItemIndex(index), [index, setHoveredItemIndex])}
      ref={isHovered ? ref : null}
      role="option"
      tabIndex={-1}
      style={{
        cursor: 'pointer',
        width: '100%',
        borderRadius: '8px',
      }}
    >
      <div
        style={{
          backgroundColor: isHovered ? '#efefef' : 'transparent',
          display: 'flex',
          padding: '8px',
          borderRadius: '8px',
        }}
      >
        <div style={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Text color="darkGray" inline lineClamp={1}>
              {label}
            </Text>
          </div>
          {subtext && (
            <Text size="md" color="gray" lineClamp={1}>
              {subtext}
            </Text>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
          }}
        >
          {isSelectedItem ? (
            <Icon accessibilityLabel="Selected item" color="darkGray" icon="check" size={12} />
          ) : (
            <div style={{ width: '12px' }} />
          )}
        </div>
      </div>
    </div>
  );
});

OptionItemWithForwardRef.displayName = 'OptionItem';

export default OptionItemWithForwardRef;
