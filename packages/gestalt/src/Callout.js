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
import styles from './Callout.css';
import useResponsiveMinWidth from './useResponsiveMinWidth.js';
import { type ActionDataType, type DismissButtonType } from './commonTypes.js';

type Props = {|
  dismissButton?: DismissButtonType,
  iconAccessibilityLabel: string,
  message: string,
  primaryAction?: ActionDataType,
  secondaryAction?: ActionDataType,
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

const CalloutAction = ({
  data,
  stacked,
  type,
}: {|
  data: ActionDataType,
  stacked?: boolean,
  type: string,
|}): Node => {
  const { name: colorSchemeName } = useColorScheme();
  const isDarkMode = colorSchemeName === 'darkMode';
  let color = type === 'primary' ? 'white' : 'transparent';
  if (isDarkMode && type === 'secondary') {
    color = 'transparentWhiteText';
  }
  const { accessibilityLabel, label, onClick, onNavigationOptions, href } = data;

  return (
    <Box
      display="block"
      smDisplay="flex"
      alignItems="center"
      justifyContent="center"
      paddingX={1}
      marginTop={type === 'secondary' && stacked ? 2 : undefined}
      smMarginTop="auto"
      smMarginBottom="auto"
    >
      {href ? (
        <Button
          accessibilityLabel={accessibilityLabel}
          color={color}
          href={href}
          onClick={onClick}
          onNavigationOptions={onNavigationOptions}
          role="link"
          size="lg"
          text={label}
        />
      ) : (
        <Button
          accessibilityLabel={accessibilityLabel}
          color={color}
          onClick={onClick}
          role="button"
          size="lg"
          text={label}
        />
      )}
    </Box>
  );
};

export default function Callout({
  dismissButton,
  iconAccessibilityLabel,
  message,
  primaryAction,
  secondaryAction,
  type,
  title,
}: Props): Node {
  // Currently there is not a dark mode spec for this component. This is to ensure
  // that all text is readable.
  const { name } = useColorScheme();
  const isDarkMode = name === 'darkMode';
  const responsiveMinWidth = useResponsiveMinWidth();

  return (
    <Box
      dangerouslySetInlineStyle={{
        __style: {
          backgroundColor: CALLOUT_TYPE_ATTRIBUTES[type].backgroundColor,
        },
      }}
      display="flex"
      direction="column"
      smDirection="row"
      padding={6}
      smPadding={8}
      position="relative"
      rounding={4}
    >
      <Box smDisplay="flex" wrap width="100%" smMarginTop={-3} smMarginBottom={-3}>
        <Box
          display="flex"
          direction="column"
          smDirection="row"
          justifyContent="center"
          alignItems="center"
          marginBottom={primaryAction || secondaryAction ? 4 : undefined}
          smMarginBottom={primaryAction || secondaryAction ? 0 : undefined}
          smPaddingY={3}
        >
          <Box marginBottom={4} marginTop={0} smMarginBottom="auto" smMarginTop="auto">
            <Icon
              accessibilityLabel={iconAccessibilityLabel}
              color={CALLOUT_TYPE_ATTRIBUTES[type].color}
              icon={CALLOUT_TYPE_ATTRIBUTES[type].icon}
              size={32}
            />
          </Box>
          <Box marginBottom="auto" marginTop="auto" maxWidth={648} paddingX={6}>
            <Box
              display="flex"
              smDisplay="block"
              direction="column"
              alignItems="center"
              marginBottom="auto"
              marginTop="auto"
            >
              {title && (
                <Box marginBottom={2}>
                  <Heading align={responsiveMinWidth === 'xs' ? 'center' : undefined} size="sm">
                    {title}
                  </Heading>
                </Box>
              )}
              <Text align={responsiveMinWidth === 'xs' ? 'center' : undefined}>{message}</Text>
            </Box>
          </Box>
        </Box>
        {(primaryAction || secondaryAction) && (
          <Box smDisplay="flex" marginStart="auto" smMarginEnd={4} smPaddingY={3}>
            {secondaryAction && responsiveMinWidth !== 'xs' && (
              <CalloutAction type="secondary" data={secondaryAction} />
            )}
            {primaryAction && <CalloutAction type="primary" data={primaryAction} />}
            {secondaryAction && responsiveMinWidth === 'xs' && (
              <CalloutAction type="secondary" data={secondaryAction} stacked={!!secondaryAction} />
            )}
          </Box>
        )}
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
  primaryAction: PropTypes.shape({
    href: PropTypes.string,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    accessibilityLabel: PropTypes.string,
  }),
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  secondaryAction: PropTypes.shape({
    href: PropTypes.string,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    accessibilityLabel: PropTypes.string,
  }),
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  type: PropTypes.oneOf(['error', 'info', 'warning']).isRequired,
  title: PropTypes.string,
};
