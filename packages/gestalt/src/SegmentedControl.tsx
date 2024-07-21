import { cloneElement, ReactNode } from 'react';
import classnames from 'classnames';
import Box from './Box';
import focusStyles from './Focus.css';
import layout from './Layout.css';
import styles from './SegmentedControl.css';
import Text from './Text';
import useFocusVisible from './useFocusVisible';

type SizeType = 'sm' | 'md' | 'lg';

type OnChange = (arg1: { event: React.MouseEvent<HTMLButtonElement>; activeIndex: number }) => void;

type Props = {
  /**
   * Items for selection. Though typically strings, React.Node is accepted to allow for Icons or other custom UI.
   */
  items: ReadonlyArray<ReactNode>;
  /**
   * Callback triggered when the user selects an item.
   */
  onChange: OnChange;
  /**
   * Available for testing purposes, if needed. Consider [better queries](https://testing-library.com/docs/queries/about/#priority) before using this prop.
   */
  dataTestId?: string;
  /**
   * By default, items have equal widths. If this prop is true, the width of an item is based on its content. See the [responsive example](https://gestalt.pinterest.systems/web/segmentedcontrol#Example:-Responsive) for more details.
   */
  responsive?: boolean;
  /**
   * Index of element in `items` that is currently selected.
   */
  selectedItemIndex: number;
  /**
   * Size of the Segmented Control.
   */
  size?: SizeType;
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
  const lookup = { 'sm': 'small', 'md': 'medium', 'lg': 'large' } as const;
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
  index: number;
  item: ReactNode;
  isSelected: boolean;
  onChange: OnChange;
  width: string | null | undefined;
  size: SizeType;
}) {
  const { isFocusVisible } = useFocusVisible();
  const cs = classnames(
    styles.item,
    {
      [styles.itemIsNotSelected]: !isSelected,
      [styles.itemIsSelected]: isSelected,
      [focusStyles.hideOutline]: !isFocusVisible,
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
      // @ts-expect-error - TS2322 - Type 'string | null | undefined' is not assignable to type 'Width<string | number> | undefined'.
      style={{ width }}
      type="button"
    >
      {typeof item === 'string' ? (
        // @ts-expect-error - TS2322 - Type 'string' is not assignable to type 'Size | undefined'.
        <Text align="center" color="default" size={fontSize} weight="bold">
          {item}
        </Text>
      ) : (
        <Box display="flex" justifyContent="center">
          {/* @ts-expect-error - TS2339 - Property 'type' does not exist on type 'ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal'. | TS2339 - Property 'type' does not exist on type 'ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal'. */}
          {typeof item === 'object' && item && item.type && item.type.displayName === 'Icon'
            ? // @ts-expect-error - TS2769 - No overload matches this call.
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
 * ![SegmentedControl light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/SegmentedControl.spec.ts-snapshots/SegmentedControl-chromium-darwin.png)
 * ![SegmentedControl dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/SegmentedControl-dark.spec.ts-snapshots/SegmentedControl-dark-chromium-darwin.png)
 *
 */
export default function SegmentedControl({
  dataTestId,
  items,
  onChange,
  responsive,
  selectedItemIndex,
  size = 'md',
}: Props) {
  const buttonWidth = responsive ? undefined : `${Math.floor(100 / Math.max(1, items.length))}%`;
  return (
    <div
      className={classnames(styles.SegmentedControl, applyMinHeight(size), applyDensityStyle(size))}
      data-test-id={dataTestId}
      role="tablist"
    >
      {items.map((item, i) => (
        <SegmentedControlItem
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          index={i}
          isSelected={i === selectedItemIndex}
          item={item}
          onChange={onChange}
          size={size}
          width={buttonWidth}
        />
      ))}
    </div>
  );
}

SegmentedControl.displayName = 'SegmentedControl';
