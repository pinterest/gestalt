// @flow strict
import { type Node } from 'react';
import Box from './Box.js';
import Button from './Button.js';
import Flex from './Flex.js';
import Heading from './Heading.js';
import Icon from './Icon.js';
import IconButton from './IconButton.js';
import Modal from './Modal.js';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider.js';

type ActionDataType = {|
  accessibilityLabel: string,
  disabled?: boolean,
  href?: string,
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
   * Label to describe the dismiss button's purpose.
   */
  accessibilityDismissButtonLabel?: string,
  /**
   * String that clients such as VoiceOver will read to describe the modal. Always localize the label. See [Accessibility section](https://gestalt.pinterest.systems/web/modalalert#Accessibility) for more info.
   */
  accessibilityModalLabel: string,
  /**
   * Supply the element(s) that will be used as ModalAlert's main content. See the [Best Practices](https://gestalt.pinterest.systems/web/modalalert#Best-practices) for more info.
   */
  children: Node,
  /**
   * The text used for ModalAlert's heading.
   */
  heading: string,
  /**
   * Callback fired when ModalAlert is dismissed by clicking on the backdrop outside of the ModalAlert or when the dismiss icon button is clicked (for default ModalAlerts).
   */
  onDismiss: () => void,
  /**
   * Determines the icon and dismiss pattern of the ModalAlert. See the [warning](https://gestalt.pinterest.systems/web/modalalert#Warning) and [error](https://gestalt.pinterest.systems/web/modalalert#Error)  variants for more info.
   */
  type?: 'default' | 'warning' | 'error',
  /**
   * Main action for users to take on ModalAlert. If `href` is supplied, the action will serve as a link. See [OnLinkNavigationProvider](https://gestalt.pinterest.systems/web/utilities/onlinknavigationprovider) to learn more about link navigation.
   * If no `href` is supplied, the action will be a button.
   * The `accessibilityLabel` should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/web/modalalert#Accessibility).
   */
  primaryAction: ActionDataType,
  /**
   * Secondary action for users to take on ModalAlert. If `href` is supplied, the action will serve as a link. See [OnLinkNavigationProvider](https://gestalt.pinterest.systems/web/utilities/onlinknavigationprovider) to learn more about link navigation.
   * If no `href` is supplied, the action will be a button.
   * The `accessibilityLabel` should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/web/modalalert#Accessibility).
   */
  secondaryAction?: ActionDataType,
|};

const ICON_COLOR_MAP = {
  error: {
    icon: 'workflow-status-problem',
    color: 'error',
  },
  warning: {
    icon: 'workflow-status-warning',
    color: 'warning',
  },
};

function Header({
  accessibilityDismissButtonLabel,
  type,
  heading,
  onDismiss,
}: {|
  accessibilityDismissButtonLabel: string,
  type: 'default' | 'warning' | 'error',
  heading: string,
  onDismiss: () => void,
|}) {
  return (
    <Box padding={6}>
      <Flex flex="grow" alignItems="center" gap={4}>
        {type !== 'default' && (
          <Box>
            <Icon
              size="20"
              accessibilityLabel={type}
              icon={ICON_COLOR_MAP[type].icon}
              color={ICON_COLOR_MAP[type].color}
            />
          </Box>
        )}
        <Flex.Item flex="grow">
          <Heading size="400" accessibilityLevel={1}>
            {heading}
          </Heading>
        </Flex.Item>
        {type === 'default' && (
          <Box marginStart={2}>
            <IconButton
              accessibilityLabel={accessibilityDismissButtonLabel}
              bgColor="white"
              icon="cancel"
              iconColor="darkGray"
              onClick={onDismiss}
              size="sm"
            />
          </Box>
        )}
      </Flex>
    </Box>
  );
}

function ModalAlertAction({ data, type }: {| data: ActionDataType, type: string |}): Node {
  const color = type === 'primary' ? 'red' : 'gray';
  const { accessibilityLabel, disabled, label, onClick, href, rel, target } = data;
  return href ? (
    <Button
      accessibilityLabel={accessibilityLabel}
      color={color}
      disabled={disabled}
      href={href}
      fullWidth
      onClick={onClick}
      iconEnd="visit"
      rel={rel}
      role="link"
      size="lg"
      target={target}
      text={label}
    />
  ) : (
    <Button
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      color={color}
      onClick={onClick}
      fullWidth
      role="button"
      size="lg"
      text={label}
    />
  );
}

/**
 * A [ModalAlert](https://gestalt.pinterest.systems/web/modalalert) is a simple modal dialog used to alert a user of an issue, or to request confirmation after a user-triggered action. ModalAlert overlays and blocks page content until it is dismissed by the user.
 */
export default function ModalAlert({
  accessibilityDismissButtonLabel,
  accessibilityModalLabel,
  type = 'default',
  children,
  onDismiss,
  heading,
  primaryAction,
  secondaryAction,
}: Props): Node {
  const { accessibilityDismissButtonLabel: accessibilityDismissButtonLabelDefault } =
    useDefaultLabelContext('ModalAlert');

  Object.entries({ primaryAction, secondaryAction }).forEach(([key, value]) => {
    // $FlowFixMe[incompatible-use]
    if (value && [value?.href, value?.onClick].every((item) => item === undefined)) {
      throw new Error(
        `Either an \`href\` or an \`onClick\` handler must be provided to \`${key}\`.`,
      );
    }
  });

  return (
    <Modal
      accessibilityModalLabel={accessibilityModalLabel}
      align="start"
      closeOnOutsideClick={type === 'default'}
      footer={
        <Flex justifyContent="end" gap={4}>
          {secondaryAction && <ModalAlertAction type="secondary" data={secondaryAction} />}
          {primaryAction && <ModalAlertAction type="primary" data={primaryAction} />}
        </Flex>
      }
      heading={
        <Header
          type={type}
          heading={heading}
          onDismiss={onDismiss}
          accessibilityDismissButtonLabel={
            accessibilityDismissButtonLabel ?? accessibilityDismissButtonLabelDefault
          }
        />
      }
      onDismiss={onDismiss}
      role="alertdialog"
      size="sm"
    >
      <Box paddingX={6}>{children}</Box>
    </Modal>
  );
}
