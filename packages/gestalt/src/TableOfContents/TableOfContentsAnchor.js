// @flow strict
import { type Node } from 'react';
import classNames from 'classnames';
import styles from './TableOfContentsAnchor.css';
import Box from '../Box.js';
import Colors from '../Colors.css';
import { useNesting } from '../contexts/NestingProvider.js';
import Flex from '../Flex.js';
import Layout from '../Layout.css';
import TapArea, { type OnTapType } from '../TapArea.js';
import Text from '../Text.js';
import useInteractiveStates from '../utils/useInteractiveStates.js';

const NESTING_MARGIN_START_MAP = {
  '1': '12px',
  '2': '32px',
  '3': '52px',
  '4': '72px',
  '5': '92px',
};

type Props = {|
  label: string,
  href: string,
  active: boolean,
  onClick?: OnTapType,
|};

export default function TableOfContentsAnchor({ label, active, href, onClick }: Props): Node {
  const { nestedLevel } = useNesting();
  const { handleOnFocus, handleOnBlur, handleOnMouseEnter, handleOnMouseLeave, isHovered } =
    useInteractiveStates();
  const hasMarker = active || isHovered;
  const markerColor = active ? 'inverse' : 'tertiary';
  const nestingPadding = NESTING_MARGIN_START_MAP[nestedLevel];
  const nestingFontSize = nestedLevel === 1 ? '300' : '200';

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
      rounding={2}
    >
      <Flex>
        <Box minWidth={4} color={hasMarker ? markerColor : 'transparent'} rounding="pill" />
        <div
          className={classNames(styles.item, Layout.flexGrow, {
            [Colors.secondary]: isHovered,
          })}
          style={{
            paddingInlineStart: nestingPadding,
          }}
        >
          <Text weight={active ? 'bold' : 'normal'} size={nestingFontSize}>
            {label}
          </Text>
        </div>
      </Flex>
    </TapArea>
  );
}
