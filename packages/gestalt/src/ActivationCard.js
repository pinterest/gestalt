// @flow strict
import { Fragment, type Node } from 'react';
import classnames from 'classnames';
import styles from './ActivationCard.css';
import Box from './Box.js';
import Button from './Button.js';
import { useColorScheme } from './contexts/ColorSchemeProvider.js';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider.js';
import Icon from './Icon.js';
import IconButton from './IconButton.js';
import Text from './Text.js';

const STATUS_ICONS = {
  notStarted: undefined,
  pending: { symbol: 'clock', color: 'subtle' },
  needsAttention: { symbol: 'workflow-status-problem', color: 'error' },
  complete: { symbol: 'check-circle', color: 'success' },
};

type LinkData = {|
  accessibilityLabel: string,
  href: string,
  label: string,
  onClick?: ({|
    event:
      | SyntheticMouseEvent<HTMLButtonElement>
      | SyntheticMouseEvent<HTMLAnchorElement>
      | SyntheticKeyboardEvent<HTMLAnchorElement>
      | SyntheticKeyboardEvent<HTMLButtonElement>,
    dangerouslyDisableOnNavigation: () => void,
  |}) => void,
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
   * Link-role button to render inside the activation card as a call-to-action to the user.
   * - `label`: Text to render inside the button to convey the function and purpose of the button. The button text has a fixed size.
   * - `accessibilityLabel`: Supply a short, descriptive label for screen-readers to replace button texts that do not provide sufficient context about the button component behavior. Texts like `Click Here,` `Follow,` or `Read More` can be confusing when a screen reader reads them out of context. In those cases, we must pass an alternative text to replace the button text.
   * - `onClick`: Callback fired when the button component is clicked (pressed and released) with a mouse or keyboard.
   *
   * ActivationCard can be paired with GlobalEventsHandlerProvider. See [GlobalEventsHandlerProvider](https://gestalt.pinterest.systems/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.
   */
  link?: LinkData,
  /**
   * Text to render inside the activation card to convey detailed information to the user. The message text has a fixed size.
   */
  message: string,
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

function ActivationCardLink({ data }: {| data: LinkData |}): Node {
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
}

function CompletedCard({ dismissButton, message, status, statusMessage, title }: Props): Node {
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
            <Text size="400" weight="bold">
              {title}
            </Text>
          </Box>
          {message && (
            <Box flex="grow" direction="column" alignContent="start" marginTop={2}>
              <Text color="subtle" size="200">
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
}

function UncompletedCard({
  dismissButton,
  message,
  link,
  status,
  statusMessage,
  title,
}: Props): Node {
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
          <Text color={isStarted ? 'default' : 'subtle'} weight="bold" size="200">
            {statusMessage}
          </Text>
        </Box>
      </Box>
      <Box marginTop={6}>
        <Text size="400" weight="bold">
          {title}
        </Text>
      </Box>
      {message && (
        <Box flex="grow" direction="column" alignContent="start" marginTop={2}>
          <Text color="subtle" size="200">
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
}

/**
 * [ActivationCards](https://gestalt.pinterest.systems/web/activationcard) are used in groups to communicate a user’s stage in a series of steps toward an overall action.
 *
 * ![ActivationCard light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/ActivationCard.spec.mjs-snapshots/ActivationCard-chromium-darwin.png)
 * ![ActivationCard dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/ActivationCard-dark.spec.mjs-snapshots/ActivationCard-dark-chromium-darwin.png)
 *
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
  const { accessibilityDismissButtonLabel } = useDefaultLabelContext('ActivationCard');

  const { name: colorSchemeName } = useColorScheme();
  const isDarkMode = colorSchemeName === 'darkMode';

  return (
    <Box
      display="flex"
      flex="grow"
      borderStyle="shadow"
      color={isDarkMode ? 'elevationFloating' : 'default'}
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
          dismissButton={
            dismissButton && {
              onDismiss: dismissButton.onDismiss,
              accessibilityLabel:
                dismissButton.accessibilityLabel ?? accessibilityDismissButtonLabel,
            }
          }
          message={message}
          status={status}
          statusMessage={statusMessage}
          title={title}
        />
      ) : (
        <UncompletedCard
          dismissButton={
            dismissButton && {
              onDismiss: dismissButton.onDismiss,
              accessibilityLabel:
                dismissButton.accessibilityLabel ?? accessibilityDismissButtonLabel,
            }
          }
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
