// @flow strict
import { type Node } from 'react';
import classNames from 'classnames';
import Box from './Box.js';
import boxWhitespace from './boxWhitespace.css';
import Heading from './Heading.js';
import Layout from './Layout.css';
import ListStyles from './List.css';
import styles from './TableOfContents.css';
import TableOfContentsAnchor from './TableOfContents/TableOfContentsAnchor.js';
import Whitespace from './Whitespace.css';

type Props = {|
  /**
   * String that clients such as VoiceOver will read to describe the element.
   */
  accessibilityLabel?: string,
  /**
   * Title for the TableOfContents.
   */
  title?: string,
  /**
   * Items of the TableOfContents.
   */
  items: $ReadOnlyArray<{|
    label: string,
    href: string,
    active?: boolean,
    onClick?: () => void,
    nestedItems?: $ReadOnlyArray<{|
      label: string,
      href: string,
      active?: boolean,
      onClick?: () => void,
    |}>,
  |}>,
|};

/**
 * [TableOfContents](https://gestalt.pinterest.systems/web/tableofcontents) component is used to navigate to anchors on a page. It also serves as an outline of a page’s content. TableOfContents is placed on the right side of the page, close to the main content block.

 * ![TableOfContents light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/TableOfContents.spec.mjs-snapshots/TableOfContents-chromium-darwin.png)
 * ![TableOfContents dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/TableOfContents-dark.spec.mjs-snapshots/TableOfContents-dark-chromium-darwin.png)
 */
export default function TableOfContents({ accessibilityLabel, title, items }: Props): Node {
  const ulClassNames = classNames(Layout.flex, Layout.flexColumn, Whitespace.m0, Whitespace.p0);
  const liClassNames = classNames(ListStyles.noStyle, boxWhitespace.marginTop1);

  return (
    <div role="navigation" aria-label={accessibilityLabel} className={styles.wrapper}>
      {title ? (
        <Box paddingX={3} marginBottom={3}>
          <Heading size="400">{title}</Heading>
        </Box>
      ) : null}

      <ul className={ulClassNames}>
        {items.map(({ nestedItems, ...itemProps }) => (
          <li key={itemProps.label} className={liClassNames}>
            <TableOfContentsAnchor {...itemProps} />

            {nestedItems ? (
              <ul className={ulClassNames}>
                {nestedItems.map((nestedItemProps) => (
                  <li key={nestedItemProps.label} className={liClassNames}>
                    <TableOfContentsAnchor {...nestedItemProps} nested />
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
