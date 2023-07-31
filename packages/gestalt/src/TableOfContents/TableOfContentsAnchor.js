// @flow strict
import { type Node } from 'react';
import classNames from 'classnames';
import styles from './TableOfContentsAnchor.css';
import Box from '../Box.js';
import Colors from '../Colors.css';
import Flex from '../Flex.js';
import Layout from '../Layout.css';
import TapArea from '../TapArea.js';
import Text from '../Text.js';
import useInteractiveStates from '../utils/useInteractiveStates.js';

type Props = {|
  label: string,
  href: string,
  active?: boolean,
  nested?: boolean,
  onClick?: () => void,
|};

export default function TableOfContentsAnchor({
  label,
  active,
  href,
  nested,
  onClick,
}: Props): Node {
  const {
    handleOnFocus,
    handleOnBlur,
    handleOnMouseEnter,
    handleOnMouseLeave,
    isFocused,
    isHovered,
  } = useInteractiveStates();
  const hasMarker = active || isFocused || isHovered;
  const markerColor = active || isFocused ? 'inverse' : 'tertiary';

  return (
    <TapArea
      tapStyle="compress"
      role="link"
      href={href}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      onTap={onClick}
    >
      <Flex>
        <Box width={4} color={hasMarker ? markerColor : 'default'} rounding="pill" />
        <div
          className={classNames(styles.item, Layout.flexGrow, {
            [Colors.secondary]: isHovered,
            [styles.itemPadding]: !nested,
            [styles.itemNestedPadding]: nested,
          })}
        >
          <Text weight={active ? 'bold' : 'normal'}>{label}</Text>
        </div>
      </Flex>
    </TapArea>
  );
}
