// @flow strict
import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import Box from './Box.js';
import Heading from './Heading.js';
import Icon from './Icon.js';
import IconButton from './IconButton.js';
import Link from './Link.js';
import Text from './Text.js';
import { useColorScheme } from './contexts/ColorScheme.js';
import { type AbstractEventHandler } from './AbstractEventHandler.js';

type LinkData = {|
  href: string,
  label: string,
  onClick?: AbstractEventHandler<
    | SyntheticMouseEvent<HTMLAnchorElement>
    | SyntheticKeyboardEvent<HTMLAnchorElement>
  >,
|};

type Props = {|
  description: string,
  dismissButton?: {|
    accessibilityLabel: string,
    onDismiss: () => void,
  |},
  iconAccessibilityLabel: string,
  primaryLink?: LinkData,
  secondaryLink?: LinkData,
  type: 'error' | 'info' | 'warning',
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

const CalloutLink = ({
  data,
  stacked,
  type,
}: {|
  data: LinkData,
  stacked?: boolean,
  type: string,
|}): Node => {
  const { name } = useColorScheme();
  const colorDarkMode = name === 'darkMode' ? 'white' : 'darkGray';
  const { href, label, onClick } = data;

  return (
    <Box
      alignItems="center"
      color={type === 'primary' ? 'white' : undefined}
      flex="none"
      padding={4}
      marginEnd="auto"
      marginStart="auto"
      mdMarginEnd={0}
      rounding={type === 'primary' ? 'pill' : undefined}
      marginBottom="auto"
      marginTop="auto"
    >
      <Link href={href} onClick={onClick}>
        <Text
          color={type === 'primary' ? colorDarkMode : undefined}
          weight="bold"
        >
          {label}
        </Text>
      </Link>
    </Box>
  );
};

export default function Callout({
  description,
  dismissButton,
  iconAccessibilityLabel,
  primaryLink,
  secondaryLink,
  type,
  title,
}: Props): Node {
  // Currently there is not a dark mode spec for this component. This is to ensure
  // that all text is readable.
  const { name } = useColorScheme();
  const isDarkMode = name === 'darkMode';

  return (
    <Box
      dangerouslySetInlineStyle={{
        __style: {
          backgroundColor: CALLOUT_TYPE_ATTRIBUTES[type].backgroundColor,
        },
      }}
      display="flex"
      direction="column"
      mdDirection="row"
      padding={8}
      position="relative"
      rounding={4}
    >
      <Box display="flex" flex="grow">
        <Box
          marginBottom={0}
          marginTop={0}
          mdMarginBottom="auto"
          mdMarginTop="auto"
        >
          <Icon
            accessibilityLabel={iconAccessibilityLabel}
            color={CALLOUT_TYPE_ATTRIBUTES[type].color}
            icon={CALLOUT_TYPE_ATTRIBUTES[type].icon}
            size={32}
          />
        </Box>
        <Box marginBottom="auto" marginTop="auto" maxWidth={648} paddingX={6}>
          {title && (
            <Box marginBottom={2}>
              <Heading color={isDarkMode ? 'white' : 'darkGray'} size="sm">
                {title}
              </Heading>
            </Box>
          )}
          <Text color={isDarkMode ? 'white' : 'darkGray'}>{description}</Text>
        </Box>
      </Box>
      {secondaryLink && <CalloutLink type="secondary" data={secondaryLink} />}
      {primaryLink && (
        <CalloutLink
          stacked={!!secondaryLink}
          type="primary"
          data={primaryLink}
        />
      )}
      {dismissButton && (
        <Box position="absolute" right top>
          <IconButton
            accessibilityLabel={dismissButton.accessibilityLabel}
            icon="cancel"
            iconColor={isDarkMode ? 'white' : 'darkGray'}
            onClick={dismissButton.onDismiss}
            padding={4}
            size="sm"
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
  type: PropTypes.oneOf(['error', 'info', 'warning']).isRequired,
  title: PropTypes.string,
};
