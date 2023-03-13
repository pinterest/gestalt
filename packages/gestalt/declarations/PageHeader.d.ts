import type { Node, Element } from 'react';
import 'react';
import Button from './Button';
import IconButton from './IconButton';
import Dropdown from './Dropdown';
import Link from './Link';
import Text from './Text';
import Tooltip from './Tooltip';
import Image from './Image';
import type { Dimension } from './boxTypes';
import './boxTypes';
export declare type ActionType = Element<
  typeof Button | typeof IconButton | typeof Link | typeof Text | typeof Tooltip
>;
declare type Props = {
  /**
   * Add [Badge](https://gestalt.pinterest.systems/web/badge) displayed after the title. Be sure to localize the text. See the [title variant](https://gestalt.pinterest.systems/web/pageheader#Title) to learn more.
   */
  badge?: {
    text: string;
    tooltipText?: string;
  };
  /**
   * Specify a bottom border style for PageHeader: "sm" is 1px. See the [max width & border variant](https://gestalt.pinterest.systems/web/pageheader#Max-width-and-border) to learn more.
   */
  borderStyle?: 'sm' | 'none';
  /**
   * Label used for screen readers to provide information about the action [IconButton](https://gestalt.pinterest.systems/web/iconbutton) displayed under the [sm breakpoint](https://gestalt.pinterest.systems/foundations/screen_sizes#Web-(px)). See the [primary action variant](https://gestalt.pinterest.systems/web/pageheader#Primary-action) or [secondary action variant](https://gestalt.pinterest.systems/web/pageheader#Secondary-action) to learn more.
   */
  dropdownAccessibilityLabel?: string;
  /**
   * Helper [IconButton](https://gestalt.pinterest.systems/web/iconbutton) to be placed after the title for a supplemental Call To Action (CTA). See the [title variant](https://gestalt.pinterest.systems/web/pageheader#Title) to learn more.
   */
  helperIconButton?: {
    accessibilityLabel: string;
    accessibilityControls: string;
    accessibilityExpanded: boolean;
    onClick: (arg0: {
      event:
        | React.MouseEvent<HTMLButtonElement>
        | React.KeyboardEvent<HTMLButtonElement>
        | React.MouseEvent<HTMLAnchorElement>
        | React.KeyboardEvent<HTMLAnchorElement>;
      dangerouslyDisableOnNavigation: () => void;
    }) => void;
  };
  /**
   * Helper [Link](https://gestalt.pinterest.systems/web/link) to be placed after the subtext. See the [subtext variant](https://gestalt.pinterest.systems/web/pageheader#Subtext) to learn more.
   */
  helperLink?: {
    text: string;
    accessibilityLabel: string;
    href: string;
    onClick?: (arg0: {
      event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>;
      dangerouslyDisableOnNavigation: () => void;
    }) => void;
  };
  /**
   * Optional row of components. We mostly recommend using [Datapoint](https://gestalt.pinterest.systems/web/datapoint). See the [complementary items variant](https://gestalt.pinterest.systems/web/pageheader#Complementary-items) to learn more.
   */
  items?: ReadonlyArray<Node>;
  /**
   * Use numbers for pixels: \`maxWidth={100}\` and strings for percentages: \`maxWidth="100%"\`. See the [max width & border variant](https://gestalt.pinterest.systems/web/pageheader#Max-width-and-border) for more info.
   */
  maxWidth?: Dimension;
  /**
   * The primary action of the page. Can be [Button](https://gestalt.pinterest.systems/web/button), [Link](https://gestalt.pinterest.systems/web/link), [Tooltip](https://gestalt.pinterest.systems/web/tooltip) surrounding IconButton or a combination of [IconButton](https://gestalt.pinterest.systems/web/iconbutton), Tooltip and [Dropdown](https://gestalt.pinterest.systems/web/dropdown).
   *
   * Primary and secondary actions are consolidated into [Dropdown](https://gestalt.pinterest.systems/web/dropdown) below the [sm breakpoint](https://gestalt.pinterest.systems/foundations/screen_sizes#Web-(px)). `primaryAction` takes both the main component and its equivalent using Dropdown subcomponents. See the [primary action variant](https://gestalt.pinterest.systems/web/pageheader#Primary-action) to learn more.
   */
  primaryAction?: {
    component: ActionType;
    dropdownItems: ReadonlyArray<Element<typeof Dropdown.Item> | Element<typeof Dropdown.Link>>;
  };
  /**
   * A secondary action for the page. Can be [Button](https://gestalt.pinterest.systems/web/button), [Link](https://gestalt.pinterest.systems/web/link), [Tooltip](https://gestalt.pinterest.systems/web/tooltip) surrounding IconButton or a combination of IconButton, Tooltip and [Dropdown](https://gestalt.pinterest.systems/web/dropdown).
   *
   * Primary and secondary actions are are consolidated into [Dropdown](https://gestalt.pinterest.systems/web/dropdown) below the [sm breakpoint](https://gestalt.pinterest.systems/foundations/screen_sizes#Web-(px)). `secondaryAction` takes both the main component and its equivalent using Dropdown subcomponents. See the [secondary action variant](https://gestalt.pinterest.systems/web/pageheader#Secondary-action) to learn more.
   */
  secondaryAction?: {
    component: ActionType;
    dropdownItems: ReadonlyArray<Element<typeof Dropdown.Item> | Element<typeof Dropdown.Link>>;
  };
  /**
   * Used primarily for metadata related to the current page, not designed to describe the title or the current surface. Content should be [localized](https://gestalt.pinterest.systems/web/pageheader#Localization). See the [subtext variant](https://gestalt.pinterest.systems/web/pageheader#Subtext) to learn more.
   */
  subtext?: string;
  /**
   * Page title. Will always be a level 1 heading. Content should be [localized](https://gestalt.pinterest.systems/web/pageheader#Localization). See the [title variant](https://gestalt.pinterest.systems/web/pageheader#Title) to learn more.
   */
  title: string;
  /**
   * An optional thumbnail [Image](https://gestalt.pinterest.systems/web/image) to be displayed next to the title. See the [title variant](https://gestalt.pinterest.systems/web/pageheader#Title) to learn more.
   */
  thumbnail?: Element<typeof Image>;
};
/**
 * [PageHeader](https://gestalt.pinterest.systems/web/pageheader) is used to indicate the title of the current screen and can also provide additional content and actions that relate to the current screen as a whole.
 *
 * ![PageHeader light mode secondary action](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/PageHeader-items-secondaryAction.spec.mjs-snapshots/PageHeader-items-secondaryAction-md-chromium-darwin.png)
 * ![PageHeader light mode badge](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/PageHeader-thumbnail-badge-iconButton.spec.mjs-snapshots/PageHeader-thumbnail-badge-iconButton-sm-chromium-darwin.png)
 * ![PageHeader dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/PageHeader-borderStyle-dark.spec.mjs-snapshots/PageHeader-borderStyle-dark-chromium-darwin.png)
 *
 */
export default function PageHeader({
  badge,
  dropdownAccessibilityLabel,
  helperIconButton,
  helperLink,
  items,
  maxWidth,
  primaryAction,
  secondaryAction,
  subtext,
  title,
  thumbnail,
  borderStyle,
}: Props): Node;
export {};
