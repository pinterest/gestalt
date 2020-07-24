// @flow strict
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from './Box.js';
import Heading from './Heading.js';
import Icon from './Icon.js';
import IconButton from './IconButton.js';
import Link from './Link.js';
import Text from './Text.js';
import { type AbstractEventHandler } from './AbstractEventHandler.js';

type Props = {|
  description: string,
  dismissButton?: {|
    accessibilityLabel: string,
    onDismiss: () => void,
  |},
  iconAccessibilityLabel: string,
  primaryLink?: {|
    href: string,
    label: string,
    onClick?: AbstractEventHandler<
      | SyntheticMouseEvent<HTMLAnchorElement>
      | SyntheticKeyboardEvent<HTMLAnchorElement>
    >,
  |},
  secondaryLink?: {|
    href: string,
    label: string,
    onClick?: AbstractEventHandler<
      | SyntheticMouseEvent<HTMLAnchorElement>
      | SyntheticKeyboardEvent<HTMLAnchorElement>
    >,
  |},
  style: 'error' | 'info' | 'warning',
  title?: string,
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
  dismissButton,
  iconAccessibilityLabel,
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
        __style: {
          backgroundColor: CALLOUT_TYPE_ATTRIBUTES[style].backgroundColor,
        },
      }}
      padding={8}
    >
      <Box>
        <Icon
          icon={CALLOUT_TYPE_ATTRIBUTES[style].icon}
          color={CALLOUT_TYPE_ATTRIBUTES[style].color}
          accessibilityLabel={iconAccessibilityLabel}
          size={32}
        />
      </Box>
      <Box flex="grow" paddingX={6} maxWidth={600}>
        {title && (
          <Box marginBottom={2}>
            <Heading size="sm">{title}</Heading>
          </Box>
        )}
        <Text>{description}</Text>
      </Box>
      {secondaryLink && (
        <Box paddingX={2}>
          <Box padding={4} flex="none">
            <Link href={secondaryLink.href}>
              <Text weight="bold">{secondaryLink.label}</Text>
            </Link>
          </Box>
        </Box>
      )}
      {primaryLink && (
        <Box paddingX={2}>
          <Box rounding="pill" color="white" padding={4} flex="none">
            <Link href={primaryLink.href}>
              <Text weight="bold">{primaryLink.label}</Text>
            </Link>
          </Box>
        </Box>
      )}
      {dismissButton && (
        <Box position="absolute" top right>
          <IconButton
            icon="cancel"
            iconColor="darkGray"
            size="sm"
            accessibilityLabel={dismissButton.accessibilityLabel}
            onClick={dismissButton.onDismiss}
            padding={4}
          />
        </Box>
      )}
    </Box>
  );
}

Callout.propTypes = {
  description: PropTypes.string.isRequired,
  dismissButton: PropTypes.exact({
    accessibilityLabel: PropTypes.string.isRequired,
    onDismiss: PropTypes.func.isRequired,
  }),
  iconAccessibilityLabel: PropTypes.string.isRequired,
  primaryLink: PropTypes.exact({
    href: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
  }),
  secondaryLink: PropTypes.exact({
    href: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
  }),
  style: PropTypes.oneOf(['error', 'info', 'warning']).isRequired,
  title: PropTypes.string,
};
