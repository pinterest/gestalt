import {ReactNode} from 'react';
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
  onClick?: ComponentProps<typeof TapAreaLink>["onTap"]
};

export default function TableOfContentsAnchor(
  {
    label,
    active,
    href,
    onClick,
  }: Props,
) {
  const { nestedLevel } = useNesting();
  const { handleOnFocus, handleOnBlur, handleOnMouseEnter, handleOnMouseLeave, isHovered } =
    useInteractiveStates();
  const hasMarker = active || isHovered;
  const markerColor = active ? 'inverse' : 'tertiary';
  const nestingFontSize = nestedLevel === 1 ? '300' : '200';

  return (
    <TapAreaLink
      href={href}
      onBlur={handleOnBlur}
      onFocus={handleOnFocus}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      onTap={onClick}
      rounding={2}
      tapStyle="compress"
    >
      <Flex>
        <Box color={hasMarker ? markerColor : 'transparent'} minWidth={4} rounding="pill" />
        <div
          className={classNames(styles.item, styles[`nestingIndentation${nestedLevel}`], {
            [styles.itemHover]: isHovered,
          })}
        >
          <Text size={nestingFontSize} weight={active ? 'bold' : 'normal'}>
            {label}
          </Text>
        </div>
      </Flex>
    </TapAreaLink>
  );
}
