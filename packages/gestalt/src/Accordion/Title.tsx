import { type ReactElement } from 'react';
import applyModuleDensityStyle from './applyModuleDensity';
import Badge from '../Badge';
import Box from '../Box';
import Flex from '../Flex';
import Icon from '../Icon';
import type icons from '../icons/index';
import Text from '../Text';

export type BadgeType = {
  text: string;
  type?:
    | 'info'
    | 'error'
    | 'warning'
    | 'success'
    | 'neutral'
    | 'recommendation'
    | 'darkWash'
    | 'lightWash';
};

export default function AccordionTitle(props: {
  badge?: BadgeType;
  icon?: keyof typeof icons;
  iconAccessibilityLabel?: string;
  iconButton?: ReactElement;
  title: string;
  type?: 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
}) {
  const { iconAccessibilityLabel = '', title, type = 'info', size = 'lg' } = props;

  // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ badge?: BadgeType | undefined; icon?: "replace" | "search" | "link" | "text" | "dash" | "3D" | "3D-move" | "360" | "accessibility" | "ad" | "ad-group" | "add" | "add-circle" | ... 321 more ... | undefined; ... 4 more ...; size?: "sm" | ... 2 more ... | undefined; }'.
  const decoration = ['icon', 'badge', 'iconButton'].find((prop) => !!props[prop]);
  const hasError = type === 'error';
  const hasIcon = hasError || decoration === 'icon';
  const textAndIconColor = hasError ? 'error' : 'default';

  const { titleGap } = applyModuleDensityStyle(size);

  return (
    <Flex alignItems="center" gap={{ row: titleGap, column: 0 }}>
      {hasIcon && (
        <Flex.Item minWidth={0}>
          <Icon
            accessibilityLabel={iconAccessibilityLabel}
            color={textAndIconColor}
            icon={hasError ? 'workflow-status-problem' : props.icon}
          />
        </Flex.Item>
      )}

      {title && (
        <Flex.Item minWidth={0}>
          <Text color={textAndIconColor} lineClamp={1} weight="bold">
            {title}
          </Text>
        </Flex.Item>
      )}

      {decoration === 'badge' && props.badge && (
        <Flex.Item minWidth={0}>
          <Box dangerouslySetInlineStyle={{ __style: { top: '1px' } }} position="relative">
            <Badge text={props.badge.text} type={props.badge.type || 'info'} />
          </Box>
        </Flex.Item>
      )}

      {decoration === 'iconButton' && <Flex.Item minWidth={0}>{props.iconButton}</Flex.Item>}
    </Flex>
  );
}
