// @flow strict
import { type Node, type Element } from 'react';
import Box from './Box.js';
import Button from './Button.js';
import IconButton from './IconButton.js';
import Link from './Link.js';
import Text from './Text.js';
import Tooltip from './Tooltip.js';
import Flex from './Flex.js';
import Image from './Image.js';
import { type Dimension } from './boxTypes.js';
import {
  PageHeaderTitle,
  PageHeaderBadge,
  PageHeaderHelperIconButton,
  PageHeaderSubtext,
  PageHeaderThubnail,
  PageHeaderActionBlock,
  PageHeaderItemsBlock,
} from './PageHeaderSubcomponents.js';
import styles from './PageHeader.css';
import { useColorScheme } from './contexts/ColorSchemeProvider.js';

export type ActionType = Element<
  typeof Button | typeof IconButton | typeof Link | typeof Text | typeof Tooltip,
>;

type Props = {|
  /**
   * Add a badge displayed after the title. Be sure to localize the text.
   */
  badge?: {| text: string, tooltipText?: string |},
  /**
   * Specify a bottom border style for PageHeader: "sm" is 1px.
   */
  borderStyle?: 'sm' | 'none',
  /**
   * Primary and secondary actions are replaced with a [Dropdown](https://gestalt.netlify.app/dropdown) under the [sm breakpoint](https://gestalt.netlify.app/screen_sizes#Web-(px)).
   */
  dropdownItems?: $ReadOnlyArray<Node>,
  /**
   * Label used for screen readers to provide information about the IconButton replacing actions the [sm breakpoint](https://gestalt.netlify.app/screen_sizes#Web-(px)).
   */
  dropdownAccessibilityLabel?: string,
  /**
   * Helper IconButton to be placed after the title for a supplemental Call To Action (CTA).
   */
  helperIconButton?: {|
    accessibilityLabel: string,
    accessibilityControls: string,
    accessibilityExpanded: boolean,
    onClick: ({|
      event:
        | SyntheticMouseEvent<HTMLButtonElement>
        | SyntheticKeyboardEvent<HTMLButtonElement>
        | SyntheticMouseEvent<HTMLAnchorElement>
        | SyntheticKeyboardEvent<HTMLAnchorElement>,
      dangerouslyDisableOnNavigation: () => void,
    |}) => void,
  |},
  /**
   * Helper Link to be placed after the subtext.
   */
  helperLink?: {|
    text: string,
    accessibilityLabel: string,
    href: string,
    onClick: ({|
      event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
      dangerouslyDisableOnNavigation: () => void,
    |}) => void,
  |},
  /**
   * Optional row of components.
   */
  items?: $ReadOnlyArray<Node>,
  /**
   * Use numbers for pixels: \`maxWidth={100}\` and strings for percentages: \`maxWidth="100%"\`. See the [max width](https://gestalt.pinterest.systems/pageheader#Max-width) variant for more info.
   */
  maxWidth?: Dimension,
  /**
   * The primary action of the page. Can be [Button](https://gestalt.pinterest.systems/button), [Link](https://gestalt.pinterest.systems/link), [Tooltip](https://gestalt.pinterest.systems/tooltip) surrounding IconButton or a combination of IconButton, Tooltip and [Dropdown](https://gestalt.pinterest.systems/dropdown).
   */
  primaryAction?: ActionType,
  /**
   * A secondary action for the page. Can be [Button](https://gestalt.pinterest.systems/button), [Link](https://gestalt.pinterest.systems/link), [Tooltip](https://gestalt.pinterest.systems/tooltip) surrounding IconButton or a combination of IconButton, Tooltip and [Dropdown](https://gestalt.pinterest.systems/dropdown).
   */
  secondaryAction?: ActionType,
  /**
   * Used for metadata related to the current page, not designed to describe the title or the current surface. Content should be [localized](https://gestalt.pinterest.systems/pageheader#Localization).
   */
  subtext?: string,
  /**
   * Page title. Will always be a level 1 heading. Content should be [localized](https://gestalt.pinterest.systems/pageheader#Localization).
   */
  title: string,
  /**
   * An optional thumbnail image to be displayed next to the title.
   */
  thumbnail?: Element<typeof Image>,
|};

/**
 * [PageHeader](https://gestalt.pinterest.systems/pageheader) is used to indicate the title of the current page, as well as optional actions.
 *
 * ![PageHeader light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/cypress/integration/visual-test/__image_snapshots__/PageHeader-items-secondaryAction-md%20%230.png)
 * ![PageHeader dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/cypress/integration/visual-test/__image_snapshots__/PageHeader-items-secondaryAction-dark-md%20%230.png)
 * ![PageHeader light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/cypress/integration/visual-test/__image_snapshots__/PageHeader-thumbnail-badge-iconButton-sm%20%230.png)
 * ![PageHeader dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/cypress/integration/visual-test/__image_snapshots__/PageHeader-thumbnail-badge-iconButton-dark-sm%20%230.png)
 *
 */
export default function PageHeader({
  badge,
  dropdownItems,
  dropdownAccessibilityLabel,
  helperIconButton,
  helperLink,
  items,
  maxWidth = '100%',
  primaryAction,
  secondaryAction,
  subtext,
  title,
  thumbnail,
  borderStyle = 'none',
}: Props): Node {
  const { text: badgeText, tooltipText: badgeTooltipText } = badge || {};
  const { name: colorSchemeName } = useColorScheme();
  const isDarkMode = colorSchemeName === 'darkMode';
  const pageHeaderBordertyle = isDarkMode ? styles.darkModePageHeader : styles.pageHeader;

  return (
    <div className={borderStyle === 'sm' ? pageHeaderBordertyle : null}>
      <Box color="white" paddingX={8} paddingY={4} width="100%">
        <Flex flex="grow" justifyContent="center" maxWidth="100%">
          <Flex flex="grow" maxWidth={maxWidth}>
            <Flex.Item minWidth={0} flex="grow" alignSelf="center">
              <Box marginEnd={6}>
                <Flex gap={2}>
                  {thumbnail ? <PageHeaderThubnail thumbnail={thumbnail} /> : null}
                  <Flex direction="column" gap={1}>
                    <Flex alignItems="center">
                      <PageHeaderTitle title={title} />
                      <Box display="none" smDisplay="block" marginStart={1}>
                        <Flex gap={3}>
                          {badge ? (
                            <PageHeaderBadge
                              badgeText={badgeText}
                              badgeTooltipText={badgeTooltipText}
                            />
                          ) : null}
                          {helperIconButton ? (
                            <PageHeaderHelperIconButton helperIconButton={helperIconButton} />
                          ) : null}
                        </Flex>
                      </Box>
                    </Flex>
                    {subtext ? (
                      <PageHeaderSubtext subtext={subtext} helperLink={helperLink} />
                    ) : null}
                  </Flex>
                </Flex>
              </Box>
            </Flex.Item>
            <Flex.Item minWidth={0} flex="none">
              <Flex gap={4} alignItems={subtext ? undefined : 'center'} height="100%">
                <PageHeaderItemsBlock items={items} />
                <PageHeaderActionBlock
                  primaryAction={primaryAction}
                  secondaryAction={secondaryAction}
                  dropdownItems={dropdownItems}
                  dropdownAccessibilityLabel={dropdownAccessibilityLabel}
                />
              </Flex>
            </Flex.Item>
          </Flex>
        </Flex>
      </Box>
    </div>
  );
}
