// @flow strict
import { forwardRef, type Node } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Box from './Box.js';
import Flex from './Flex.js';
import Text from './Text.js';
import styles from './Touchable.css';
import getRoundingClassName from './getRoundingClassName.js';
import Icon from './Icon.js';
import focusStyles from './Focus.css';
import useFocusVisible from './useFocusVisible.js';
import { type AbstractEventHandler } from './AbstractEventHandler.js';

export type ComboBoxOptions = {|
  value: string,
  subtext?: string,
|};

type Props = {|
  hoveredItemIndex: ?number,
  id: string,
  index: number,
  onClick?: AbstractEventHandler<
    SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
    {| disableOnNavigation: () => void |},
  >,
  onSelect?: ({|
    item: ComboBoxOptions,
    event: SyntheticInputEvent<HTMLInputElement>,
  |}) => void,
  option: ComboBoxOptions,
  selected?: ComboBoxOptions | null,
  setHoveredItemIndex: (number) => void,
|};

const ComboBoxOptionWithForwardRef: React$AbstractComponent<Props, ?HTMLElement> = forwardRef<
  Props,
  ?HTMLElement,
>(function ComboBoxOption(props, ref): Node {
  const { hoveredItemIndex, id, index, onSelect, option, selected, setHoveredItemIndex } = props;

  // Determine if the option is a current selected item
  const isSelectedItem = JSON.stringify(option) === JSON.stringify(selected);

  const { isFocusVisible } = useFocusVisible();

  const className = classnames(getRoundingClassName(2), focusStyles.hideOutline, {
    [focusStyles.accessibilityOutline]: isFocusVisible,
    [focusStyles.accessibilityOutlineFocusWithin]: isFocusVisible,
    [styles.fullWidth]: true,
    [styles.pointer]: true,
  });

  return (
    <div
      aria-selected={isSelectedItem}
      className={className}
      id={`${id}-item-${index}`}
      onClick={(event) => onSelect?.({ event, item: option })}
      onKeyPress={(event) => event.preventDefault()}
      onMouseDown={(event) => event.preventDefault()}
      onMouseEnter={() => setHoveredItemIndex(index)}
      ref={index === hoveredItemIndex ? ref : null}
      role="option"
      rounding={2}
      tabIndex={-1}
    >
      <Box
        padding={2}
        color={index === hoveredItemIndex ? 'lightGray' : 'transparent'}
        rounding={2}
        display="flex"
        direction="column"
      >
        <Flex>
          <Flex flex="grow" direction="column" gap={1}>
            <Text truncate weight="normal" inline>
              {option?.value}
            </Text>
            {option.subtext ? (
              <Text size="md" color="gray">
                {option.subtext}
              </Text>
            ) : null}
          </Flex>
          {isSelectedItem ? (
            <Box alignItems="center" display="flex" justifyContent="center">
              <Icon accessibilityLabel="Selected item" color="darkGray" icon="check" size={12} />
            </Box>
          ) : null}
        </Flex>
      </Box>
    </div>
  );
});

ComboBoxOptionWithForwardRef.displayName = 'ComboBoxOption';

export default ComboBoxOptionWithForwardRef;

ComboBoxOptionWithForwardRef.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  option: PropTypes.exact({
    value: PropTypes.string.isRequired,
    subtext: PropTypes.string,
  }).isRequired,
  selected: PropTypes.oneOfType([
    PropTypes.exact({
      value: PropTypes.string.isRequired,
      subtext: PropTypes.string,
    }),
    PropTypes.arrayOf(
      PropTypes.exact({
        value: PropTypes.string.isRequired,
        subtext: PropTypes.string,
      }),
    ),
  ]),
  onSelect: PropTypes.func,
  hoveredItemIndex: PropTypes.number,
  setHoveredItemIndex: PropTypes.func,
};
