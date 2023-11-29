// @flow strict
import { type } from 'os';
import { Children, cloneElement, type Element, type Node as ReactNode } from 'react';
import classnames from 'classnames';
import Box from './Box';
import focusStyles from './Focus.css';
import Icon from './Icon';
import layout from './Layout.css';
import styles from './SegmentedControl.css';
import Text from './Text';
import useFocusVisible from './useFocusVisible';

type SizeType = 'sm' | 'md' | 'lg';

type OnChange = ({
  event: SyntheticMouseEvent<HTMLButtonElement>,
  activeIndex: number,
}) => void;

type Props = {
  /**
   * Items for selection. Though typically strings, React.Node is accepted to allow for Icons or other custom UI.
   */
  items: $ReadOnlyArray<ReactNode>,
  /**
   * Callback triggered when the user selects an item.
   */
  onChange: OnChange,
  /**
   * By default, items have equal widths. If this prop is true, the width of an item is based on its content. See the [responsive example](https://gestalt.pinterest.systems/web/segmentedcontrol#Example:-Responsive) for more details.
   */
  responsive?: boolean,
  /**
   * Index of element in `items` that is currently selected.
   */
  selectedItemIndex: number,
  /**
   * Size of the Segmented Control.
   */
  size?: SizeType,
};

const getDensityStyles = (s: SizeType) => {
  switch (s) {
    case 'sm':
      return { fontSize: '200', iconSize: 16 };
    case 'lg':
      return { fontSize: '300', iconSize: 24 };
    case 'md':
    default:
      return { fontSize: '300', iconSize: 20 };
  }
};
const applyDensityStyle = (s: SizeType) => styles[`${s}`];

// layout.css contains a mapping of size to min-height
const applyMinHeight = (s: SizeType) => {
  const lookup = { 'sm': 'small', 'md': 'medium', 'lg': 'large' };
  return layout[`${lookup[s]}`];
};

function SegmentedControlItem({
  index,
  item,
  isSelected,
  onChange,
  size = 'md',
  width,
}: {
  index: number,
  item: ReactNode,
  isSelected: boolean,
  onChange: OnChange,
  width: ?string,
  size: SizeType,
}) {
  const { isFocusVisible } = useFocusVisible();
  const cs = classnames(
    styles.item,
    focusStyles.hideOutline,
    {
      [styles.itemIsNotSelected]: !isSelected,
      [styles.itemIsSelected]: isSelected,
      [focusStyles.accessibilityOutline]: isFocusVisible,
    },
    applyDensityStyle(size),
  );

  const { fontSize, iconSize } = getDensityStyles(size);

  return (
    <button
      aria-selected={isSelected}
      className={cs}
      onClick={(event) => onChange({ event, activeIndex: index })}
      role="tab"
      type="button"
      style={{ width }}
    >
      {typeof item === 'string' ? (
        <Text color="default" align="center" size={fontSize} weight="bold">
          {item}
        </Text>
      ) : (
        <Box display="flex" justifyContent="center">
          {typeof item === 'object' && item && item.type && item.type.displayName === 'Icon'
            ? // $FlowExpectedError[incompatible-exact] the displayName check above ensures this is an Icon
              cloneElement(item, { size: iconSize })
            : item}
        </Box>
      )}
    </button>
  );
}

/**
 * [SegmentedControl](https://gestalt.pinterest.systems/web/segmentedcontrol)  may be used to group multiple selections. The controls display the current state and related state.
 *
 * Create layout to convey clear sense of information hierarchy. When a control is engaged, information below the control should also be updated.
 *
 * ![SegmentedControl light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/SegmentedControl.spec.mjs-snapshots/SegmentedControl-chromium-darwin.png)
 * ![SegmentedControl dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/SegmentedControl-dark.spec.mjs-snapshots/SegmentedControl-dark-chromium-darwin.png)
 *
 */
export default function SegmentedControl({
  items,
  onChange,
  responsive,
  selectedItemIndex,
  size = 'md',
}: Props): ReactNode {
  const buttonWidth = responsive ? undefined : `${Math.floor(100 / Math.max(1, items.length))}%`;
  return (
    <div
      className={classnames(styles.SegmentedControl, applyMinHeight(size), applyDensityStyle(size))}
      role="tablist"
    >
      {items.map((item, i) => (
        <SegmentedControlItem
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          index={i}
          item={item}
          isSelected={i === selectedItemIndex}
          onChange={onChange}
          size={size}
          width={buttonWidth}
        />
      ))}
    </div>
  );
}
