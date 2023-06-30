// @flow strict
import { type Node, useState } from 'react';
import classNames from 'classnames';
import styles from './TableOfContentsAnchor.css';
import Box from '../Box.js';
import Colors from '../Colors.css';
import Flex from '../Flex.js';
import Layout from '../Layout.css';
import TapArea from '../TapArea.js';
import Text from '../Text.js';

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
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const hasMarker = active || focused || hovered;
  const markerColor = active || focused ? 'inverse' : 'tertiary';

  return (
    <TapArea
      tapStyle="compress"
      role="link"
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onTap={onClick}
    >
      <Flex>
        <Box width={4} color={hasMarker ? markerColor : 'default'} rounding="pill" />
        <div
          className={classNames(styles.item, Layout.flexGrow, {
            [Colors.secondary]: hovered,
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
