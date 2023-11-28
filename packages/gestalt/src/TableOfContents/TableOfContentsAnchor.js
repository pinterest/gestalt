// @flow strict
import { type Node as ReactNode } from 'react';
import classNames from 'classnames';
import styles from './TableOfContentsAnchor.css';
import Box from '../Box';
import Colors from '../Colors.css';
import { useNesting } from '../contexts/NestingProvider';
import Flex from '../Flex';
import Layout from '../Layout.css';
import TapAreaLink from '../TapAreaLink';
import Text from '../Text';
import useInteractiveStates from '../utils/useInteractiveStates';

const NESTING_MARGIN_START_MAP = {
  '1': '12px',
  '2': '32px',
  '3': '52px',
  '4': '72px',
  '5': '92px',
};

type Props = {
  label: string,
  href: string,
  active: boolean,
  onClick?: $ElementType<React$ElementConfig<typeof TapAreaLink>, 'onTap'>,
};

export default function TableOfContentsAnchor({ label, active, href, onClick }: Props): ReactNode {
  const { nestedLevel } = useNesting();
  const { handleOnFocus, handleOnBlur, handleOnMouseEnter, handleOnMouseLeave, isHovered } =
    useInteractiveStates();
  const hasMarker = active || isHovered;
  const markerColor = active ? 'inverse' : 'tertiary';
  const nestingPadding = NESTING_MARGIN_START_MAP[nestedLevel];
  const nestingFontSize = nestedLevel === 1 ? '300' : '200';

  return (
    <TapAreaLink
      tapStyle="compress"
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
    </TapAreaLink>
  );
}
