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
import styles from './ActivationCard.css';

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
  message: string,
  linkData?: LinkData,
  status: 'notStarted' | 'pending' | 'needsAttention' | 'complete',
  statusMessage: string,
  title?: string,
|};

const STATUS_ICONS = {
  notStarted: undefined,
  pending: { symbol: 'clock', color: 'gray' },
  needsAttention: { symbol: 'workflow-status-problem', color: 'red' },
  complete: { symbol: 'check-circle', color: 'green' },
};

const ActivationCardLink = ({ data }: {| data: LinkData |}): Node => {
  const { accessibilityLabel, href, label, onClick } = data;

  return (
    <Box
      alignItems="center"
      paddingX={1}
      marginEnd="auto"
      marginStart="auto"
      mdMarginEnd={0}
      mdMarginTop={8}
      mdMarginBottom="auto"
      rounding="pill"
      flex="grow"
    >
      <Button
        accessibilityLabel={accessibilityLabel}
        color="gray"
        href={href}
        onClick={onClick}
        role="link"
        size="lg"
        text={label}
      />
    </Box>
  );
};

export default function ActivationCard({
  dismissButton,
  message,
  linkData,
  status,
  statusMessage,
  title,
}: Props): Node {
  const isStarted = status !== 'notStarted';
  const icon = STATUS_ICONS[status];

  return (
    <Box flex="grow" borderSize="sm" rounding={4} padding={6} maxWidth={400}>
      <Box display="flex" alignContent="center">
        {icon && (
          <Box marginEnd={2}>
            <Icon
              accessibilityLabel={statusMessage}
              icon={icon.symbol}
              color={icon.color}
            />
          </Box>
        )}
        <Text color={isStarted ? 'darkGray' : 'gray'} weight="bold" size="md">
          {statusMessage}
        </Text>
      </Box>
      {title && (
        <Box marginTop={6} marginBottom={2}>
          <Heading size="sm">{title}</Heading>
        </Box>
      )}
      {message && (
        <Text color="gray" size="md">
          {message}
        </Text>
      )}
      {linkData && <ActivationCardLink data={linkData} />}
      {dismissButton && (
        <div className={classnames(styles.rtlPos)}>
          <IconButton
            accessibilityLabel={dismissButton.accessibilityLabel}
            icon="cancel"
            iconColor="gray"
            onClick={dismissButton.onDismiss}
            padding={4}
            size="sm"
          />
        </div>
      )}
    </Box>
  );
}

ActivationCard.propTypes = {
  dismissButton: PropTypes.exact({
    accessibilityLabel: PropTypes.string.isRequired,
    onDismiss: PropTypes.func.isRequired,
  }),
  message: PropTypes.string.isRequired,
  linkData: PropTypes.exact({
    href: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
  }),
  status: PropTypes.oneOf([
    'notStarted',
    'pending',
    'needsAttention',
    'complete',
  ]).isRequired,
  statusMessage: PropTypes.string,
  title: PropTypes.string,
};
