// @flow strict
import React, { Fragment, type Node } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Box from './Box.js';
import Heading from './Heading.js';
import Icon from './Icon.js';
import IconButton from './IconButton.js';
import Button from './Button.js';
import Text from './Text.js';
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
    | SyntheticKeyboardEvent<HTMLButtonElement>,
    {| disableOnNavigation?: () => void |},
  >,
  rel?: 'none' | 'nofollow',
  target?: null | 'self' | 'blank',
|};

type Props = {|
  dismissButton?: {|
    accessibilityLabel: string,
    onDismiss: () => void,
  |},
  message: string,
  link?: LinkData,
  status: 'notStarted' | 'pending' | 'needsAttention' | 'complete',
  statusMessage: string,
  title: string,
|};

const STATUS_ICONS = {
  notStarted: undefined,
  pending: { symbol: 'clock', color: 'gray' },
  needsAttention: { symbol: 'workflow-status-problem', color: 'red' },
  complete: { symbol: 'check-circle', color: 'green' },
};

const ActivationCardLink = ({ data }: {| data: LinkData |}): Node => {
  const { accessibilityLabel, href, label, onClick, rel, target } = data;

  return (
    <Box
      alignItems="center"
      paddingX={1}
      marginTop={8}
      marginEnd="auto"
      marginStart="auto"
      rounding="pill"
    >
      <Button
        accessibilityLabel={accessibilityLabel}
        color="gray"
        href={href}
        onClick={onClick}
        rel={rel}
        role="link"
        size="lg"
        text={label}
        target={target}
      />
    </Box>
  );
};

const CompletedCard = ({ dismissButton, message, status, statusMessage, title }: Props): Node => {
  const icon = STATUS_ICONS[status];

  return (
    <Fragment>
      <Box display="flex">
        {icon && (
          <Box display="flex" alignContent="center">
            <Box marginEnd={4}>
              <Icon
                accessibilityLabel={statusMessage}
                icon={icon.symbol}
                color={icon.color}
                size={40}
              />
            </Box>
          </Box>
        )}
        <Box>
          <Box>
            <Heading size="sm">{title}</Heading>
          </Box>
          {message && (
            <Box flex="grow" direction="column" alignContent="start" marginTop={2}>
              <Text color="gray" size="md">
                {message}
              </Text>
            </Box>
          )}
        </Box>
      </Box>
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
    </Fragment>
  );
};

const UncompletedCard = ({
  dismissButton,
  message,
  link,
  status,
  statusMessage,
  title,
}: Props): Node => {
  const isStarted = status !== 'notStarted';
  const icon = STATUS_ICONS[status];

  return (
    <Fragment>
      <Box display="flex" alignContent="center" height={24}>
        {icon && (
          <Box marginEnd={2}>
            <Icon
              accessibilityLabel={statusMessage}
              icon={icon.symbol}
              color={icon.color}
              size={24}
            />
          </Box>
        )}
        <Box alignSelf="center" marginTop={isStarted ? 0 : 1}>
          <Text color={isStarted ? 'darkGray' : 'gray'} weight="bold" size="md">
            {statusMessage}
          </Text>
        </Box>
      </Box>
      <Box marginTop={6}>
        <Heading size="sm">{title}</Heading>
      </Box>
      {message && (
        <Box flex="grow" direction="column" alignContent="start" marginTop={2}>
          <Text color="gray" size="md">
            {message}
          </Text>
        </Box>
      )}
      {link && (
        <Box>
          <ActivationCardLink data={link} />
        </Box>
      )}
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
    </Fragment>
  );
};

export default function ActivationCard({
  dismissButton,
  message,
  link,
  status,
  statusMessage,
  title,
}: Props): Node {
  const isCompleted = status === 'complete';

  return (
    <Box
      display="flex"
      flex="grow"
      borderStyle="shadow"
      rounding={4}
      padding={6}
      maxWidth={400}
      position="relative"
      direction="column"
      justifyContent="center"
      height="100%"
      width="100%"
    >
      {isCompleted ? (
        <CompletedCard
          dismissButton={dismissButton}
          message={message}
          status={status}
          statusMessage={statusMessage}
          title={title}
        />
      ) : (
        <UncompletedCard
          dismissButton={dismissButton}
          link={link}
          message={message}
          status={status}
          statusMessage={statusMessage}
          title={title}
        />
      )}
    </Box>
  );
}

ActivationCard.propTypes = {
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  dismissButton: PropTypes.shape({
    accessibilityLabel: PropTypes.string.isRequired,
    onDismiss: PropTypes.func.isRequired,
  }),
  message: PropTypes.string.isRequired,
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  link: PropTypes.shape({
    href: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,

    accessibilityLabel: PropTypes.string,
    rel: PropTypes.oneOf(['none', 'nofollow']),
    target: PropTypes.oneOf([null, 'self', 'blank']),
  }),
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  status: PropTypes.oneOf(['notStarted', 'pending', 'needsAttention', 'complete']).isRequired,
  statusMessage: PropTypes.string,
  title: PropTypes.string.isRequired,
};
