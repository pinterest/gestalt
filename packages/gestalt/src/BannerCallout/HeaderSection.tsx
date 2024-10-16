import { Children, ReactElement } from 'react';
import Box from '../Box';
import { useDefaultLabelContext } from '../contexts/DefaultLabelProvider';
import Flex from '../Flex';
import Heading from '../Heading';
import Icon from '../Icon';
import MESSAGING_TYPE_ATTRIBUTES from '../MESSAGING_TYPE_ATTRIBUTES';
import Text from '../Text';

type Props = {
  gap: 3 | 6;
  iconSize: 32 | 24;
  message: string | ReactElement;
  type: 'default' | 'error' | 'info' | 'recommendation' | 'success' | 'warning';
  title?: string;
  marginBottom?: 4;
  iconAccessibilityLabel?: string;
};

export default function HeaderSection({
  iconSize,
  gap,
  title,
  message,
  type,
  iconAccessibilityLabel,
  marginBottom,
}: Props) {
  const {
    iconAccessibilityLabelError,
    iconAccessibilityLabelInfo,
    iconAccessibilityLabelRecommendation,
    iconAccessibilityLabelSuccess,
    iconAccessibilityLabelWarning,
  } = useDefaultLabelContext('BannerCallout');

  const getDefaultIconAccessibilityLabel = () => {
    switch (type) {
      case 'success':
        return iconAccessibilityLabelSuccess;
      case 'info':
        return iconAccessibilityLabelInfo;
      case 'recommendation':
        return iconAccessibilityLabelRecommendation;
      case 'warning':
        return iconAccessibilityLabelWarning;
      case 'error':
        return iconAccessibilityLabelError;
      default:
        return '';
    }
  };

  return (
    <Box marginBottom={marginBottom}>
      <Flex gap={gap}>
        <Icon
          accessibilityLabel={iconAccessibilityLabel ?? getDefaultIconAccessibilityLabel()}
          color={MESSAGING_TYPE_ATTRIBUTES[type]?.iconColor}
          icon={MESSAGING_TYPE_ATTRIBUTES[type]?.icon}
          size={iconSize}
        />

        <Box maxWidth={648}>
          {(title || message) && (
            <Flex direction="column" gap={2} width="100%">
              {title && <Heading size="400">{title}</Heading>}
              {message && typeof message === 'string' && <Text>{message}</Text>}
              {message &&
              typeof message !== 'string' &&
              // @ts-expect-error - TS2339
              Children.only<ReactElement>(message).type.displayName === 'Text'
                ? message
                : null}
            </Flex>
          )}
        </Box>
      </Flex>{' '}
    </Box>
  );
}
