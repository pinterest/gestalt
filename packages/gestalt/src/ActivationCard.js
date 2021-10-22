// @flow strict
import { Fragment, type Node } from 'react';
import classnames from 'classnames';
import Box from './Box.js';
import Heading from './Heading.js';
import Icon from './Icon.js';
import IconButton from './IconButton.js';
import Button from './Button.js';
import Text from './Text.js';
import { type AbstractEventHandler } from './AbstractEventHandler.js';
import styles from './ActivationCard.css';

const STATUS_ICONS = {
  notStarted: undefined,
  pending: { symbol: 'clock', color: 'gray' },
  needsAttention: { symbol: 'workflow-status-problem', color: 'red' },
  complete: { symbol: 'check-circle', color: 'green' },
};

type LinkData = {|
  accessibilityLabel: string,
  href: string,
  label: string,
  onClick?: AbstractEventHandler<
    | SyntheticMouseEvent<HTMLButtonElement>
    | SyntheticMouseEvent<HTMLAnchorElement>
    | SyntheticKeyboardEvent<HTMLAnchorElement>
    | SyntheticKeyboardEvent<HTMLButtonElement>,
    {| dangerouslyDisableOnNavigation: () => void |},
  >,
  rel?: 'none' | 'nofollow',
  target?: null | 'self' | 'blank',
|};

type Props = {|
  /**
   * Callback fired when the dismiss button is clicked (pressed and released) with a mouse or keyboard.
   * Supply a short, descriptive label for screen-readers to provide sufficient context about the dismiss button action. IconButtons do not render text for screen readers to read requiring an accessibility label.
   * Accessibility: `accessibilityLabel` populates aria-label.
   */
  dismissButton?: {|
    accessibilityLabel: string,
    onDismiss: () => void,
  |},
  /**
   * Text to render inside the activation card to convey detailed information to the user. The message text has a fixed size.
   */
  message: string,
  /**
   * Link-role button to render inside the activation card as a call-to-action to the user.',
   * - label: Text to render inside the button to convey the function and purpose of the button. The button text has a fixed size.
   * - accessibilityLabel: Supply a short, descriptive label for screen-readers to replace button texts that do not provide sufficient context about the button component behavior. Texts like `Click Here,` `Follow,` or `Read More` can be confusing when a screen reader reads them out of context. In those cases, we must pass an alternative text to replace the button text.
   * - onClick: Callback fired when the button component is clicked (pressed and released) with a mouse or keyboard.
   * ActivationCard can be paired with OnLinkNavigationProvider. See [OnLinkNavigationProvider](/OnLinkNavigationProvider) to learn more about link navigation.
   */
  link?: LinkData,
  /**
   * Select the activation card status:
   * - `notStarted`: A task that has not be started
   * - `pending`: A task that is pending action
   * - `needsAttention`: A task that requires the user's attention
   * - `complete`: A task that has been completed
   */
  status: 'notStarted' | 'pending' | 'needsAttention' | 'complete',
  /**
   * A message to indicate the current status of the activation card.
   */
  statusMessage: string,
  /**
   * Heading to render inside the activation card above the message to convey the activation card topic to the user.
   */
  title: string,
|};

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
        fullWidth
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

/**
 * [ActivationCards](https://gestalt.pinterest.systems/ActivationCard) are used in groups to communicate a user’s stage in a series of steps toward an overall action.
 */
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
