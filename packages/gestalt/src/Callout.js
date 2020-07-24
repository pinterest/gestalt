// @flow strict
import * as React from 'react';
import PropTypes, { string } from 'prop-types';
import Box from './Box.js';
import Icon from './Icon.js';
import IconButton from './IconButton.js';
import Link from './Link.js';
import Text from './Text.js';
import typography from './Typography.css';

type Props = {|
  description: string,
    iconAccessibilityLabel: string,
      primaryLink ?: {|
        href: string,
          label: string,
  |},
onDismiss: () => void,
  secondaryLink ?: {|
    href: string,
      label: string,
  |},
style: 'error' | 'info' | 'warning',
  title ?: string,
|};

const CALLOUT_TYPE_ATTRIBUTES = {
  info: {
    icon: 'check-circle',
    color: 'blue',
    backgroundColor: '#EBF4FE',
  },
  warning: {
    icon: 'workflow-status-warning',
    color: 'orange',
    backgroundColor: '#FDF5EC',
  },
  error: {
    icon: 'workflow-status-problem',
    color: 'red',
    backgroundColor: '#FDEBEE',
  },
};

export default function Callout({
  description,
  iconAccessibilityLabel,
  onDismiss,
  primaryLink,
  secondaryLink,
  style,
  title,
}: Props): React.Node {
  return (
    <Box
      alignItems="center"
      display="flex"
      position="relative"
      rounding={4}
      dangerouslySetInlineStyle={{
        __style: { backgroundColor: CALLOUT_TYPE_ATTRIBUTES[style].backgroundColor }
      }}
      padding={8}
    >
      <Box>
        <Icon icon={CALLOUT_TYPE_ATTRIBUTES[style].icon} color={CALLOUT_TYPE_ATTRIBUTES[style].color} accessibilityLabel="" size={24} />
      </Box>
      <Box flex="grow" paddingX={3}>
        {title && (
          <Box marginBottom={2}>
            <Text weight="bold">{title}</Text>
          </Box>
        )}
        <Text>{description}</Text>
      </Box>
      {secondaryLink && (
        <Box padding={4} flex="none">
          <Link href={secondaryLink.href}>
            <Text weight="bold">{secondaryLink.label}</Text>
          </Link>
        </Box>
      )}
      {primaryLink && (
        <Box rounding="pill" color="white" padding={4} flex="none">
          <Link href={primaryLink.href}>
            <Text weight="bold">{primaryLink.label}</Text>
          </Link>
        </Box>
      )}
      <Box position="absolute" top right padding={1}>
        <IconButton icon="cancel" iconColor="darkGray" size="sm" accessibilityLabel="" onClick={onDismiss} />
      </Box>
    </Box>
  )
}

Callout.propTypes = {
  description: PropTypes.string.isRequired,
  iconAccessibilityLabel: PropTypes.string.isRequired,
  primaryLink: PropTypes.exact({
    href: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  onDismiss: PropTypes.func,
  secondaryLink: PropTypes.exact({
    href: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  style: PropTypes.oneOf(['error', 'info', 'warning']).isRequired,
  title: PropTypes.string,
}