// @flow strict
import { type Node } from 'react';
import Box from './Box.js';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider.js';
import Heading from './Heading.js';
import styles from './TableOfContents.css';
import TableOfContentsItemList from './TableOfContents/TableOfContentsItemList.js';
import TableOfContentsItem from './TableOfContentsItem.js';

type Props = {|
  /**
   * String that clients such as VoiceOver will read to describe the element. See [accessibility](https://gestalt.pinterest.systems/web/tableofcontents#Accessibility) section to learn more.
   */
  accessibilityLabel?: string,
  /**
   * Title for the TableOfContents. See the [title variant](https://gestalt.pinterest.systems/web/tableofcontents#With-title) to learn more.
   */
  title?: string,
  /**
   * Must be instances TableofContents.Item
   */
  children: Node,
|};

/**
 * [TableOfContents](https://gestalt.pinterest.systems/web/tableofcontents) component is used to navigate to anchors on a page. It also serves as an outline of a page’s content. TableOfContents is placed on the right side of the page, close to the main content block.

 * ![TableOfContents light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/TableOfContents.spec.mjs-snapshots/TableOfContents-chromium-darwin.png)
 * ![TableOfContents dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/TableOfContents-dark.spec.mjs-snapshots/TableOfContents-dark-chromium-darwin.png)
 */
export default function TableOfContents({ accessibilityLabel, title, children }: Props): Node {
  const { accessibilityLabel: accessibilityLabelDefault } =
    useDefaultLabelContext('TableOfContents');

  return (
    <div
      role="navigation"
      aria-label={accessibilityLabel ?? accessibilityLabelDefault}
      className={styles.container}
    >
      {title ? (
        <Box paddingX={3} marginBottom={3}>
          <Heading size="400">{title}</Heading>
        </Box>
      ) : null}

      <TableOfContentsItemList>{children}</TableOfContentsItemList>
    </div>
  );
}

TableOfContents.Item = TableOfContentsItem;
