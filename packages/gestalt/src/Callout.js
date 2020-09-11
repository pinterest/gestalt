// @flow strict
import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Box from './Box.js';
import Heading from './Heading.js';
import Icon from './Icon.js';
import IconButton from './IconButton.js';
import Button from './Button.js';
import Text from './Text.js';
import { useColorScheme } from './contexts/ColorScheme.js';
import { type AbstractEventHandler } from './AbstractEventHandler.js';
import styles from './Callout.css';

type LinkData = {|
  accessibilityLabel?: string,
  href: string,
  label: string,
  onClick?: AbstractEventHandler<
    | SyntheticMouseEvent<HTMLButtonElement>
    | SyntheticMouseEvent<HTMLAnchorElement>
    | SyntheticKeyboardEvent<HTMLAnchorElement>
    | SyntheticKeyboardEvent<HTMLButtonElement>
  >,
|};

type Props = {|
  dismissButton?: {|
    accessibilityLabel: string,
    onDismiss: () => void,
  |},
  iconAccessibilityLabel: string,
  message: string,
  primaryLink?: LinkData,
  secondaryLink?: LinkData,
  type: 'error' | 'info' | 'warning',
  title?: string,
|};

const CALLOUT_TYPE_ATTRIBUTES = {
  info: {
    icon: 'info-circle',
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
  const { name: colorSchemeName } = useColorScheme();
  const isDarkMode = colorSchemeName === 'darkMode';
  let color = type === 'primary' ? 'white' : 'transparent';
  if (isDarkMode && type === 'secondary') {
    color = 'transparentWhiteText';
  }
  const { accessibilityLabel, href, label, onClick } = data;

  return (
    <Box
      alignItems="center"
      paddingX={1}
      marginEnd="auto"
      marginStart="auto"
      marginTop={type === 'primary' && stacked ? 2 : undefined}
      mdMarginEnd={0}
      mdMarginTop="auto"
      mdMarginBottom="auto"
      rounding={type === 'primary' ? 'pill' : undefined}
    >
      <Button
        accessibilityLabel={accessibilityLabel}
        color={color}
        href={href}
        onClick={onClick}
        role="link"
        size="lg"
        text={label}
      />
    </Box>
  );
};

export default function Callout({
  dismissButton,
  iconAccessibilityLabel,
  message,
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
      padding={6}
      mdPadding={8}
      position="relative"
      rounding={4}
    >
      <Box
        display="flex"
        flex="grow"
        marginBottom={primaryLink || secondaryLink ? 4 : undefined}
        mdMarginBottom={primaryLink || secondaryLink ? 0 : undefined}
      >
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
          <Text color={isDarkMode ? 'white' : 'darkGray'}>{message}</Text>
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
        <div className={classnames(styles.rtlPos)}>
          <IconButton
            accessibilityLabel={dismissButton.accessibilityLabel}
            icon="cancel"
            iconColor={isDarkMode ? 'white' : 'darkGray'}
            onClick={dismissButton.onDismiss}
            padding={4}
            size="sm"
          />
        </div>
      )}
    </Box>
  );
}

Callout.propTypes = {
  dismissButton: PropTypes.exact({
    accessibilityLabel: PropTypes.string.isRequired,
    onDismiss: PropTypes.func.isRequired,
  }),
  iconAccessibilityLabel: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
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
