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
      display="flex"
      alignItems="center"
      justifyContent="center"
      paddingX={1}
      marginTop={type === 'primary' && stacked ? 2 : undefined}
      mdMarginTop="auto"
      mdMarginBottom="auto"
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
        mdDisplay="flex"
        wrap
        width="100%"
        mdMarginTop={-3}
        mdMarginBottom={-3}
      >
        <Box
          display="flex"
          marginBottom={primaryLink || secondaryLink ? 4 : undefined}
          mdMarginBottom={primaryLink || secondaryLink ? 0 : undefined}
          mdPaddingY={3}
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
        <Box mdDisplay="flex" marginStart="auto" mdMarginEnd={4} mdPaddingY={3}>
          {secondaryLink && (
            <CalloutLink type="secondary" data={secondaryLink} />
          )}
          {primaryLink && (
            <CalloutLink
              stacked={!!secondaryLink}
              type="primary"
              data={primaryLink}
            />
          )}
        </Box>
      </Box>

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
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  dismissButton: PropTypes.exact({
    accessibilityLabel: PropTypes.string.isRequired,
    onDismiss: PropTypes.func.isRequired,
  }),
  iconAccessibilityLabel: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  primaryLink: PropTypes.shape({
    href: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    accessibilityLabel: PropTypes.string,
  }),
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  secondaryLink: PropTypes.shape({
    href: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    accessibilityLabel: PropTypes.string,
  }),
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  type: PropTypes.oneOf(['error', 'info', 'warning']).isRequired,
  title: PropTypes.string,
};
