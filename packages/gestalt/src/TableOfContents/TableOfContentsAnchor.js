// @flow strict
import { type Node as ReactNode } from 'react';
import classNames from 'classnames';
import styles from './TableOfContentsAnchor.css';
import Box from '../Box';
import { useNesting } from '../contexts/NestingProvider';
import Flex from '../Flex';
import TapAreaLink from '../TapAreaLink';
import Text from '../Text';
import useInteractiveStates from '../utils/useInteractiveStates';

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
          className={classNames(styles.item, styles[`nestingIndentation${nestedLevel}`], {
            [styles.itemHover]: isHovered,
          })}
        >
          <Text weight={active ? 'bold' : 'normal'} size={nestingFontSize}>
            {label}
          </Text>
        </div>
      </Flex>
    </TapAreaLink>
  );
}
