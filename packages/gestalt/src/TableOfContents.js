// @flow strict
import { type Node } from 'react';
import Box from './Box.js';
import Heading from './Heading.js';
import styles from './TableOfContents.css';
import TableOfContentsItem from './TableOfContentsItem.js';

type Props = {|
  /**
   * Prop description.
   */
  accessibilityLabel?: string,
  title: string,
  children: Node,
|};

/**
 * [TableOfContents](https://gestalt.pinterest.systems/web/tableofcontents) component should be used for ... on the page.
 * ![TableOfContents light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/TableOfContents.spec.mjs-snapshots/TableOfContents-chromium-darwin.png)
 * ![TableOfContents dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/TableOfContents-dark.spec.mjs-snapshots/TableOfContents-dark-chromium-darwin.png)
 */
export default function TableOfContents({ accessibilityLabel, title, children }: Props): Node {
  return (
    <Box
      aria-label={accessibilityLabel}
      dangerouslySetInlineStyle={{
        __style: { borderLeft: '1px solid var(--color-border-container)' },
      }}
    >
      <Box paddingX={3}>
        <Heading size="400">{title}</Heading>
      </Box>

      {!!children && (
        <Box paddingY={4}>
          <ul style={{ margin: 0, padding: 0, display: 'flex', gap: 4, flexDirection: 'column' }}>
            {children}
          </ul>
        </Box>
      )}
    </Box>
  );
}

TableOfContents.Item = TableOfContentsItem;
