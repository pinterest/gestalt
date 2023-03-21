import type { Node } from 'react';
type LinkData = {
  accessibilityLabel: string;
  href: string;
  label: string;
  onClick?: (arg0: {
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLAnchorElement>
      | React.KeyboardEvent<HTMLAnchorElement>
      | React.KeyboardEvent<HTMLButtonElement>;
    dangerouslyDisableOnNavigation: () => void;
  }) => void;
  rel?: 'none' | 'nofollow';
  target?: null | 'self' | 'blank';
};
type Props = {
  /**
   * Callback fired when the dismiss button is clicked (pressed and released) with a mouse or keyboard.
   * Supply a short, descriptive label for screen-readers to provide sufficient context about the dismiss button action. IconButtons do not render text for screen readers to read requiring an accessibility label.
   * Accessibility: `accessibilityLabel` populates aria-label.
   */
  dismissButton?: {
    accessibilityLabel: string;
    onDismiss: () => void;
  };
  /**
   * Link-role button to render inside the activation card as a call-to-action to the user.
   * - `label`: Text to render inside the button to convey the function and purpose of the button. The button text has a fixed size.
   * - `accessibilityLabel`: Supply a short, descriptive label for screen-readers to replace button texts that do not provide sufficient context about the button component behavior. Texts like `Click Here,` `Follow,` or `Read More` can be confusing when a screen reader reads them out of context. In those cases, we must pass an alternative text to replace the button text.
   * - `onClick`: Callback fired when the button component is clicked (pressed and released) with a mouse or keyboard.
   *
   * ActivationCard can be paired with OnLinkNavigationProvider. See [OnLinkNavigationProvider](https://gestalt.pinterest.systems/web/utilities/onlinknavigationprovider) to learn more about link navigation.
   */
  link?: LinkData;
  /**
   * Text to render inside the activation card to convey detailed information to the user. The message text has a fixed size.
   */
  message: string;
  /**
   * Select the activation card status:
   * - `notStarted`: A task that has not be started
   * - `pending`: A task that is pending action
   * - `needsAttention`: A task that requires the user's attention
   * - `complete`: A task that has been completed
   */
  status: 'notStarted' | 'pending' | 'needsAttention' | 'complete';
  /**
   * A message to indicate the current status of the activation card.
   */
  statusMessage: string;
  /**
   * Heading to render inside the activation card above the message to convey the activation card topic to the user.
   */
  title: string;
};
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
}: Props): Node;
export {};
