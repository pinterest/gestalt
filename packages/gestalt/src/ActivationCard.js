// @flow strict
import { Fragment, type Node as ReactNode } from 'react';
import classnames from 'classnames';
import styles from './ActivationCard.css';
import Box from './Box';
import ButtonLink from './ButtonLink';
import { useColorScheme } from './contexts/ColorSchemeProvider';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider';
import Icon from './Icon';
import IconButton from './IconButton';
import Text from './Text';
import InternalDismissButton from './shared/InternalDismissButton';

const STATUS_ICONS = {
  notStarted: undefined,
  pending: { symbol: 'clock', color: 'subtle' },
  needsAttention: { symbol: 'workflow-status-problem', color: 'error' },
  complete: { symbol: 'check-circle', color: 'success' },
};

type LinkData = {
  accessibilityLabel: string,
  href: string,
  label: string,
  onClick?: ({
    event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
    dangerouslyDisableOnNavigation: () => void,
  }) => void,
  rel?: 'none' | 'nofollow',
  target?: null | 'self' | 'blank',
};

type ActivationCardProps = {
  /**
   * Adds a dismiss button to BannerOverlay. See the [Dismissible variant](https://gestalt.pinterest.systems/web/activationcard#Dismissible) for more info.
   */
  onDismiss?: () => void,
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
};

function ActivationCardLink({ data }: { data: LinkData }): ReactNode {
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
      <ButtonLink
        accessibilityLabel={accessibilityLabel}
        color="gray"
        href={href}
        fullWidth
        onClick={onClick}
        rel={rel}
        size="lg"
        text={label}
        target={target}
      />
    </Box>
  );
}

function DismissButton({ onDismiss }: { onDismiss: () => void }): ReactNode {
  const { accessibilityDismissButtonLabel: accessibilityDismissButtonLabelDefault } = useDefaultLabelContext('ActivationCard');
  return (
    <div className={classnames(styles.rtlPos)}>
      <InternalDismissButton
        accessibilityLabel={accessibilityDismissButtonLabelDefault}
        iconColor="gray"
        onClick={onDismiss}
        padding={12}
        icon="cancel"
        size="sm"
      />
    </div>
  )
}

function CompletedCard({
  onDismiss,
  message,
  status,
  statusMessage,
  title,
}: ActivationCardProps): ReactNode {
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
      {onDismiss && <DismissButton onDismiss={onDismiss} />}
    </Fragment>
  );
}

function UncompletedCard({
  onDismiss,
  message,
  link,
  status,
  statusMessage,
  title,
}: ActivationCardProps): ReactNode {
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
      {onDismiss && <DismissButton onDismiss={onDismiss} />}
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
export default function ActivationCard(props: ActivationCardProps): ReactNode {
  const isCompleted = props.status === 'complete';
  const { colorSchemeName } = useColorScheme();
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
      {isCompleted ? <CompletedCard {...props} /> : <UncompletedCard {...props} />}
    </Box>
  );
}

ActivationCard.displayName = 'ActivationCard';
