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

const NESTING_TEXT_SIZE_MAP = {
  '1': '300',
  '2': '200',
  '3': '200',
  '4': '200',
  '5': '200',
};

type Props = {|
  label: string,
  href: string,
  active?: boolean,
  onClick?: OnTapType,
|};

export default function TableOfContentsAnchor({ label, active, href, onClick }: Props): Node {
  const { nestedLevel } = useNesting();
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
  const nestingPadding = NESTING_MARGIN_START_MAP[nestedLevel];
  const nestingFontSize = NESTING_TEXT_SIZE_MAP[nestedLevel];

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
